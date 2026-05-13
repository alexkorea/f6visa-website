import { NextResponse } from 'next/server';
import { z } from 'zod';
import { saveToCRM } from '@/lib/notion-crm';

const schema = z.object({
  name: z.string().min(1),
  phone: z.string().min(5),
  email: z.string().email().optional().or(z.literal('')),
  spouseCountry: z.string().min(1),
  currentVisa: z.string().optional(),
  situation: z.string().min(1),
  subject: z.string().optional(),
  message: z.string().min(5),
  consent: z.literal(true),
  locale: z.string().min(2),
});

async function notifySlack(payload: any) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  const text = `🔔 새 상담 신청\n• 이름: ${payload.name}\n• 연락처: ${payload.phone}\n• 이메일: ${payload.email || '-'}\n• 배우자 국적: ${payload.spouseCountry}\n• 현재 비자: ${payload.currentVisa || '-'}\n• 상황: ${payload.situation}\n• 제목: ${payload.subject || '-'}\n• 언어: ${payload.locale}\n• 메시지:\n${payload.message}`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  }).catch(() => {});
}

async function notifyResend(payload: any) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !to || !from) return;
  const html = `
    <h2>새 상담 신청</h2>
    <ul>
      <li>이름: ${escape(payload.name)}</li>
      <li>연락처: ${escape(payload.phone)}</li>
      <li>이메일: ${escape(payload.email || '-')}</li>
      <li>배우자 국적: ${escape(payload.spouseCountry)}</li>
      <li>상황: ${escape(payload.situation)}</li>
      <li>희망 일시: ${escape(payload.preferredTime || '-')}</li>
      <li>언어: ${escape(payload.locale)}</li>
    </ul>
    <p>${escape(payload.message).replace(/\n/g, '<br>')}</p>
  `;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ from, to, subject: `[f6visa] 새 상담 신청 - ${payload.name}`, html }),
  }).catch(() => {});
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]!));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    console.log('[contact]', JSON.stringify(data, null, 2));

    await Promise.allSettled([
      notifySlack(data),
      notifyResend(data),
      saveToCRM({
        brand: 'f6visa',
        formType: 'contact',
        siteUrl: 'https://f6visa.com',
        language: data.locale,
        name: data.name,
        email: data.email || undefined,
        phone: data.phone,
        serviceRaw: `F-6 결혼비자 - ${data.spouseCountry}`,
        currentVisa: data.currentVisa || undefined,
        message: `[제목] ${data.subject || '-'}\n[현재비자] ${data.currentVisa || '-'}\n[상황] ${data.situation}\n\n${data.message}`,
        nationality: data.spouseCountry,
        rawPayload: data,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }
}

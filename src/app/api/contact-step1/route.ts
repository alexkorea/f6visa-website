import { NextResponse } from "next/server"
import { saveToCRM } from "@/lib/notion-crm"


function buildRelatedLinks(services: string | string[]): {url:string,label:string}[] {
  const svc = (Array.isArray(services) ? services.join(' ') : String(services || '')).toLowerCase();
  const links: {url:string,label:string}[] = [];
  const has = (kw: string) => svc.includes(kw);
  if (has('d-8') || has('d8') || has('투자') || has('법인설립')) {
    links.push({url:'https://www.visaskorea.com/외국인투자법인설립/', label:'D-8 기업투자비자 — 1억 투자 외국인 투자법인'});
    links.push({url:'https://www.visaskorea.com/d-8-비자-구비서류/', label:'D-8 비자 구비서류 상세'});
    links.push({url:'https://www.visaskorea.com/공익사업투자이민/', label:'공익사업 투자이민 — 정부지정 영주 경로'});
  }
  if (has('d-7') || has('d7') || has('주재원') || has('파견')) {
    links.push({url:'https://www.visaskorea.com/d-7-visa-korea_/', label:'D-7 주재원비자 — 본사·해외지사 파견'});
    links.push({url:'https://www.visaskorea.com/d-7-visa-extension-required-documents/', label:'D-7 연장 필요서류'});
    links.push({url:'https://www.visaskorea.com/외국기업-국내연락사무소-설치/', label:'외국기업 연락사무소 설치'});
  }
  if (has('e-7') || has('e7') || has('취업') || has('특정활동')) {
    links.push({url:'https://www.visaskorea.com/e7-비자-자격-요건-체류-기간-및-구비-서류/', label:'E-7 특정활동비자 — 자격·서류'});
    links.push({url:'https://www.visaskorea.com/e-7-4-숙련기능인력-점수제비자/', label:'E-7-4 숙련기능 점수제'});
    links.push({url:'https://www.visaskorea.com/f-2-7-점수제-거주비자-2/', label:'F-2-7 점수제 거주비자'});
  }
  if (has('f-5') || has('f5') || has('영주')) {
    links.push({url:'https://www.visaskorea.com/f-5-영주권의-종류/', label:'F-5 영주권 종류'});
    links.push({url:'https://www.visaskorea.com/f-2-7-점수제-거주비자-2/', label:'F-2-7 점수제 거주'});
  }
  if (has('f-6') || has('f6') || has('결혼')) {
    links.push({url:'https://www.visaskorea.com/f-6-결혼비자/', label:'F-6 결혼비자 — 한국인 배우자'});
    links.push({url:'https://www.visaskorea.com/f-5-영주권의-종류/', label:'F-5 영주권 (결혼 후 경로)'});
  }
  if (has('f-4') || has('f4') || has('재외동포')) {
    links.push({url:'https://www.visaskorea.com/거소증-신청서류와-발급기간-f-4-재외동포/', label:'F-4 재외동포 거소증 신청'});
    links.push({url:'https://www.visaskorea.com/f-4-비자-거소증등록방법-및-구비서류/', label:'F-4 거소증 등록방법'});
  }
  if (has('사범') || has('입국규제') || has('강제')) {
    links.push({url:'https://www.visaskorea.com/사범심사-전문행정사/', label:'사범심사 전문행정사 안내'});
    links.push({url:'https://www.visaskorea.com/입국규제기간-확인하기/', label:'입국규제 기간 확인'});
  }
  // Always-include defaults if no match
  if (links.length === 0) {
    links.push({url:'https://www.visaskorea.com/외국인투자법인설립/', label:'D-8 기업투자비자'});
    links.push({url:'https://www.visaskorea.com/d-7-visa-korea_/', label:'D-7 주재원비자'});
    links.push({url:'https://www.visaskorea.com/e7-비자-자격-요건-체류-기간-및-구비-서류/', label:'E-7 특정활동비자'});
    links.push({url:'https://www.visaskorea.com/f-2-7-점수제-거주비자-2/', label:'F-2-7 점수제 거주'});
    links.push({url:'https://www.visaskorea.com/f-5-영주권의-종류/', label:'F-5 영주권'});
    links.push({url:'https://www.visaskorea.com/f-6-결혼비자/', label:'F-6 결혼비자'});
  }
  // dedup by url, max 6
  const seen = new Set();
  const out = [];
  for (const l of links) {
    if (seen.has(l.url)) continue;
    seen.add(l.url);
    out.push(l);
    if (out.length >= 6) break;
  }
  return out;
}

const RESEND_API_KEY = "re_HjCDn9tA_QJvND2F4eFjagyEZ3fXP4kZS"
const TELEGRAM_BOT_TOKEN = "8748564690:AAEGsXxcfqrHmGue8lkqUaa2E0Q8CDCY-Eo"
const TELEGRAM_CHAT_ID = "5533847195"

function buildEmailHtml(name: string, services: string[], inquiryId: string): string {
  const serviceParam = encodeURIComponent(services.join(","))
  const step2Url = `https://f6visa.com/ko/contact/step2?service=${serviceParam}&inquiryId=${inquiryId}`

  return `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr>
          <td style="background-color:#1e3a5f;padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:1px;">VISION</h1>
            <p style="margin:6px 0 0;color:#94b8d6;font-size:13px;">행정사사무소</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0 0 8px;color:#1e3a5f;font-size:22px;font-weight:700;">${name}님, 비전행정사사무소에 상담요청해 주셔서 감사합니다.</h2>
            <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.6;">
              상담 신청이 접수되었습니다.<br/>맞춤 상담을 위해 아래 추가 정보를 입력해주세요.
            </p>
            <div style="margin-bottom:24px;">
              <p style="margin:0 0 8px;color:#888;font-size:13px;">신청 서비스:</p>
              <p style="margin:0;color:#1e3a5f;font-size:14px;font-weight:600;">${services.join(" / ")}</p>
            </div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td align="center" style="padding:8px 0 24px;">
                <a href="${step2Url}" style="display:inline-block;background-color:#1e3a5f;color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:8px;font-size:16px;font-weight:700;">상세 정보 입력하기 &rarr;</a>
              </td></tr>
            </table>
            
${(() => {
    const links = buildRelatedLinks(services);
    const rows = links.map(l => `<tr><td style="padding:8px 0;border-bottom:1px solid #E5E7EB"><a href="${l.url}" style="color:#235099;text-decoration:none;font-size:14px">▶ ${l.label}</a></td></tr>`).join('');
    return `<div style="margin:28px 0 16px;padding:18px;background:#F0F7FF;border-radius:10px;border-left:4px solid #235099"><h3 style="font-size:16px;color:#235099;font-weight:700;margin:0 0 12px">📚 관련 비자 정보 (참고)</h3><table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">${rows}</table><p style="font-size:12px;color:#6B7280;margin:12px 0 0">상담 전 참고하시면 더 정확한 안내가 가능합니다.</p></div>`;
  })()}
<p style="margin:0;text-align:center;color:#999;font-size:13px;">약 1분 소요</p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#f8f9fb;padding:24px 40px;border-top:1px solid #eee;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="color:#888;font-size:13px;line-height:1.8;">
                <strong style="color:#1e3a5f;">VISION 행정사사무소</strong><br/>전화: 02-363-2251<br/>카카오톡: alexkorea<br/>서울특별시 중구 퇴계로 324, 3층
              </td></tr>
            </table>
          </td>
        </tr>
      </table>
      <p style="margin:24px 0 0;color:#bbb;font-size:11px;text-align:center;">본 메일은 f6visa.com 상담 신청에 의해 자동 발송되었습니다.</p>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, contact, snsType, snsId, nationality, services } = body

    if (!name || !email || !services || services.length === 0) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 })
    }

    const serviceRaw = Array.isArray(services) ? services.join(", ") : services
    const messageParts: string[] = []
    if (snsType && snsId) messageParts.push(`SNS: ${snsType} - ${snsId}`)
    if (nationality) messageParts.push(`국적: ${nationality}`)
    const message = messageParts.length > 0 ? messageParts.join(" | ") : undefined

    const crmResult = await saveToCRM({
      brand: "f6visa",
      formType: "consultation_step1",
      siteUrl: "https://f6visa.com/contact",
      name, email, phone: contact || undefined,
      nationality: nationality || undefined,
      serviceRaw, message,
      rawPayload: { name, email, contact, snsType, snsId, nationality, services },
    })

    const inquiryId = crmResult.inboxId || `f6v-${Date.now()}`

    const emailPromise = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "비전행정사사무소 <noreply@ko-visas.com>",
        to: [email],
        subject: "[비전행정사사무소] 비전행정사사무소에 상담요청해 주셔서 감사합니다.",
        html: buildEmailHtml(name, Array.isArray(services) ? services : [services], inquiryId),
      }),
    }).catch((err) => console.error("Resend email error:", err))

    const svcList = Array.isArray(services) ? services.join(", ") : services
    let telegramText = `[F6Visa] 새 상담 신청\n\n이름: ${name}\n이메일: ${email}\n`
    if (contact) telegramText += `연락처: ${contact}\n`
    if (snsType && snsId) telegramText += `SNS: ${snsType} - ${snsId}\n`
    if (nationality) telegramText += `국적: ${nationality}\n`
    telegramText += `희망 업무: ${svcList}\n`

    const telegramPromise = fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: telegramText }) }
    ).catch((err) => console.error("Telegram error:", err))

    
    // 보스 알림 이메일 (msg 11772 — 6개 사이트 통일)
    const adminEmailHtml = `<h2 style="color:#1e3a5f">[F6Visa] 새 상담 신청</h2><table cellpadding="6" style="border-collapse:collapse;border:1px solid #ddd;font-family:Apple SD Gothic Neo,sans-serif"><tr><td><b>이름</b></td><td>${name}</td></tr><tr><td><b>이메일</b></td><td>${email}</td></tr>${contact ? `<tr><td><b>연락처</b></td><td>${contact}</td></tr>` : ''}${snsType && snsId ? `<tr><td><b>SNS</b></td><td>${snsType} - ${snsId}</td></tr>` : ''}${nationality ? `<tr><td><b>국적</b></td><td>${nationality}</td></tr>` : ''}<tr><td><b>희망 업무</b></td><td>${svcList}</td></tr><tr><td><b>접수 ID</b></td><td>${inquiryId}</td></tr></table><p style="color:#666;font-size:13px;margin-top:18px">자동 발송 — Notion CRM 자동 등록 완료</p>`;
    const adminEmailPromise = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "비전행정사사무소 <noreply@ko-visas.com>",
        to: ["5000meter@gmail.com"],
        reply_to: email,
        subject: `[F6Visa] 새 상담 신청 - ${name}`,
        html: adminEmailHtml,
      }),
    }).catch((err) => console.error("Admin email error:", err))

    await Promise.all([emailPromise, telegramPromise, adminEmailPromise])
    return NextResponse.json({ ok: true, inquiryId })
  } catch (error) {
    console.error("Contact step1 error:", error)
    return NextResponse.json({ ok: false, error: "Failed to save inquiry" }, { status: 500 })
  }
}

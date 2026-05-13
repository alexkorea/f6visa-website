'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const services = [
  { value: "F-6 결혼비자 신청", label: "F-6 결혼비자 신청", sub: "Marriage Visa", icon: "💍" },
  { value: "F-6 비자 갱신", label: "F-6 비자 갱신", sub: "Renewal", icon: "🔄" },
  { value: "F-6 거절 후 재신청", label: "F-6 거절 후 재신청", sub: "Re-application", icon: "📋" },
  { value: "F-5 전환", label: "F-5 전환", sub: "Permanent Residency", icon: "🏅" },
  { value: "F-6-2 이혼/사별", label: "F-6-2 이혼/사별", sub: "Divorce/Bereavement", icon: "📄" },
  { value: "기타", label: "기타", sub: "Other", icon: "💬" },
];

const priorityCountries = [
  { value: "미국", label: "🇺🇸 미국" },
  { value: "중국", label: "🇨🇳 중국" },
  { value: "일본", label: "🇯🇵 일본" },
  { value: "베트남", label: "🇻🇳 베트남" },
  { value: "캐나다", label: "🇨🇦 캐나다" },
  { value: "영국", label: "🇬🇧 영국" },
];

const otherCountries = [
  { value: "뉴질랜드", label: "🇳🇿 뉴질랜드" },
  { value: "대만", label: "🇹🇼 대만" },
  { value: "독일", label: "🇩🇪 독일" },
  { value: "러시아", label: "🇷🇺 러시아" },
  { value: "말레이시아", label: "🇲🇾 말레이시아" },
  { value: "몽골", label: "🇲🇳 몽골" },
  { value: "미얀마", label: "🇲🇲 미얀마" },
  { value: "싱가포르", label: "🇸🇬 싱가포르" },
  { value: "인도네시아", label: "🇮🇩 인도네시아" },
  { value: "우즈베키스탄", label: "🇺🇿 우즈베키스탄" },
  { value: "캄보디아", label: "🇰🇭 캄보디아" },
  { value: "태국", label: "🇹🇭 태국" },
  { value: "필리핀", label: "🇵🇭 필리핀" },
  { value: "호주", label: "🇦🇺 호주" },
  { value: "기타", label: "기타" },
];

const input = 'h-11 w-full rounded-md border border-border bg-white px-3 focus:border-brand focus:ring-2 focus:ring-brand-200 outline-none text-sm';

export function ContactForm({ locale, countryOptions }: { locale: string; countryOptions?: any[] }) {
  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [inquiryId, setInquiryId] = React.useState('');

  function toggleService(value: string) {
    setSelectedServices((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedServices.length === 0) return;
    setStatus('sending');
    const form = e.currentTarget;
    const snsType = (form.elements.namedItem('snsType') as HTMLSelectElement).value;
    const snsId = (form.elements.namedItem('snsId') as HTMLInputElement).value;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      contact: (form.elements.namedItem('contact') as HTMLInputElement).value,
      snsType: snsType || undefined,
      snsId: snsId || undefined,
      nationality: (form.elements.namedItem('nationality') as HTMLSelectElement).value,
      services: selectedServices,
    };
    try {
      const res = await fetch('/api/contact-step1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const result = await res.json();
        setInquiryId(result.inquiryId || '');
        setStatus('sent');
      } else setStatus('error');
    } catch { setStatus('error'); }
  }

  if (status === 'sent') {
    return (
      <div className="max-w-xl mx-auto">
        <div className="rounded-lg border border-border bg-white p-10 shadow-sm text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-ink mb-3">상담신청이 접수되었습니다.</h2>
          <p className="text-ink-muted mb-4">
            {selectedServices.join(', ')} 신청을 해주셨습니다.
            <br />좀 더 자세한 정보를 입력해 주시면 정확한 상담이 가능합니다.
          </p>

          <Link
            href={`/${locale}/contact/step2?service=${encodeURIComponent(selectedServices.join(','))}&inquiryId=${inquiryId}`}
            className="inline-flex items-center justify-center bg-brand hover:bg-brand/90 text-white px-8 h-12 rounded-lg font-semibold transition-colors text-lg mb-2"
          >
            상세정보 입력하기 →
          </Link>
          <p className="text-sm text-ink-muted mb-6">약 1분 소요</p>

          <div className="bg-brand-50 border border-brand-100 rounded-xl p-6 mb-6 text-left">
            <h3 className="font-bold text-brand text-lg mb-3">비전행정사사무소</h3>
            <ul className="space-y-2 text-sm text-brand/80">
              <li className="flex items-start gap-2"><span className="text-brand mt-0.5">✓</span> 8년+ 결혼비자 전문 실무 경험</li>
              <li className="flex items-start gap-2"><span className="text-brand mt-0.5">✓</span> 한국어·영어·중국어·일본어·베트남어 다국어 상담</li>
              <li className="flex items-start gap-2"><span className="text-brand mt-0.5">✓</span> 거절 사례 재신청 전문 대응</li>
              <li className="flex items-start gap-2"><span className="text-brand mt-0.5">✓</span> 서류 준비부터 접수·수령까지 원스톱 대행</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-5 space-y-2">
            <div className="flex items-center justify-center gap-2"><span className="text-sm text-ink-muted">전화:</span><span className="font-medium text-ink">02-363-2251</span></div>
            <div className="flex items-center justify-center gap-2"><span className="text-sm text-ink-muted">카카오톡:</span><span className="font-medium text-ink">alexkorea</span></div>
            <div className="flex items-center justify-center gap-2"><span className="text-sm text-ink-muted">이메일:</span><span className="font-medium text-ink">5000meter@gmail.com</span></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="rounded-lg border border-border bg-white p-8 shadow-sm">
        <h2 className="text-xl font-extrabold text-ink mb-2">⚡ 30초 빠른 신청</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="block text-sm font-semibold mb-1.5 text-ink">이름 <span className="text-red-500">*</span></span>
            <input name="name" type="text" required className={input} placeholder="홍길동" />
          </label>

          <label className="block">
            <span className="block text-sm font-semibold mb-1.5 text-ink">이메일 <span className="text-red-500">*</span></span>
            <input name="email" type="email" required className={input} placeholder="example@email.com" />
            <span className="block text-xs text-ink-muted mt-1">맞춤 상담 양식 링크를 발송해드립니다</span>
          </label>

          <label className="block">
            <span className="block text-sm font-semibold mb-1.5 text-ink">연락처 (전화번호)</span>
            <input name="contact" type="text" className={input} placeholder="010-1234-5678" />
          </label>

          <div>
            <span className="block text-sm font-semibold mb-1.5 text-ink">SNS ID</span>
            <div className="flex gap-2">
              <select name="snsType" className={input + ' !w-auto'}>
                <option value="">선택</option>
                <option value="kakaotalk">카카오톡</option>
                <option value="wechat">WeChat</option>
                <option value="line">LINE</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
              <input name="snsId" type="text" className={input} placeholder="SNS ID 입력" />
            </div>
          </div>

          <label className="block">
            <span className="block text-sm font-semibold mb-1.5 text-ink">국적</span>
            <select name="nationality" className={input}>
              <option value="">선택해주세요</option>
              {priorityCountries.map((c) => (<option key={c.value} value={c.value}>{c.label}</option>))}
              <option disabled>──────────</option>
              {otherCountries.map((c) => (<option key={c.value} value={c.value}>{c.label}</option>))}
            </select>
          </label>

          <div>
            <span className="block text-sm font-semibold mb-3 text-ink">희망 업무 <span className="text-red-500">*</span> <span className="text-ink-muted font-normal text-xs">(복수 선택 가능)</span></span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((svc) => (
                <button
                  key={svc.value}
                  type="button"
                  onClick={() => toggleService(svc.value)}
                  className={`relative flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    selectedServices.includes(svc.value)
                      ? 'border-brand bg-brand-50 shadow-sm'
                      : 'border-border hover:border-ink-muted/30 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-2xl">{svc.icon}</span>
                  <div>
                    <div className="font-semibold text-ink text-sm">{svc.label}</div>
                    <div className="text-xs text-ink-muted">{svc.sub}</div>
                  </div>
                  {selectedServices.includes(svc.value) && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-brand rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" size="lg" disabled={status === 'sending' || selectedServices.length === 0} className="w-full">
            {status === 'sending' ? '처리 중...' : '신청하기'}
          </Button>

          {status === 'error' && (
            <p className="text-red-600 text-sm text-center">전송에 실패했습니다. 잠시 후 다시 시도해주세요.</p>
          )}
        </form>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-5 border border-border text-center">
          <h3 className="font-semibold text-ink mb-1">전화 상담</h3>
          <p className="text-brand text-lg font-medium">02-363-2251</p>
          <p className="text-sm text-ink-muted mt-1">평일 09:00 ~ 18:00</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-5 border border-border text-center">
          <h3 className="font-semibold text-ink mb-1">카카오톡 상담</h3>
          <p className="text-brand text-lg font-medium">alexkorea</p>
          <p className="text-sm text-ink-muted mt-1">24시간 접수 가능</p>
        </div>
      </div>
    </div>
  );
}

'use client';

import * as React from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

type FieldDef = {
  name: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'radio';
  options?: string[];
  placeholder?: string;
  required?: boolean;
};

const serviceFields: Record<string, FieldDef[]> = {
  "F-6 결혼비자 신청": [
    { name: "spouseNationality", label: "배우자 국적", type: "text", placeholder: "예: 한국, 미국", required: true },
    { name: "marriageRegistered", label: "혼인신고 완료 여부", type: "radio", options: ["예", "아니오", "진행 중"], required: true },
    { name: "incomeRequirement", label: "소득요건 충족 여부", type: "radio", options: ["예", "아니오", "모름"], required: true },
    { name: "spouseCurrentVisa", label: "배우자 현재 비자", type: "select", options: ["비자 없음 (해외 거주)", "C-3 (단기방문)", "F-6 (결혼이민)", "E-9 (비전문취업)", "H-2 (방문취업)", "D-2 (유학)", "기타"], required: true },
    { name: "koreanLevel", label: "한국어 의사소통 수준", type: "select", options: ["없음", "기초 (인사/간단한 대화)", "중급 (일상 대화 가능)", "고급 (업무 가능)", "원어민"], required: false },
  ],
  "F-6 비자 갱신": [
    { name: "stayPeriod", label: "현재 체류기간", type: "select", options: ["1년 미만", "1~2년", "2~3년", "3년 이상"], required: true },
    { name: "expiryDate", label: "만료 예정일", type: "text", placeholder: "예: 2026년 8월", required: true },
    { name: "marriageStatus", label: "혼인 유지 상태", type: "radio", options: ["유지 중", "별거 중", "이혼 절차 중"], required: true },
  ],
  "F-6 거절 후 재신청": [
    { name: "rejectionReason", label: "거절 사유 (알면)", type: "text", placeholder: "예: 소득 부족, 서류 미비", required: false },
    { name: "previousApplyDate", label: "이전 신청일", type: "text", placeholder: "예: 2025년 12월", required: false },
    { name: "documentStatus", label: "보완 서류 준비 상태", type: "radio", options: ["준비 완료", "준비 중", "아직 시작 안 함"], required: true },
  ],
  "F-5 전환": [
    { name: "stayDuration", label: "한국 체류 기간", type: "select", options: ["1년 미만", "1~2년", "2~3년", "3~5년", "5년 이상"], required: true },
    { name: "income", label: "소득", type: "select", options: ["3,000만 원 미만", "3,000만 ~ 5,000만 원", "5,000만 원 이상"], required: true },
    { name: "koreanAbility", label: "한국어 능력", type: "select", options: ["없음", "TOPIK 1~2급", "TOPIK 3~4급", "TOPIK 5~6급", "사회통합프로그램 이수"], required: false },
    { name: "socialIntegration", label: "사회통합프로그램 이수 여부", type: "radio", options: ["예", "아니오", "진행 중"], required: true },
  ],
  "F-6-2 이혼/사별": [
    { name: "divorceBereavementType", label: "이혼/사별 구분", type: "radio", options: ["이혼", "사별"], required: true },
    { name: "hasChildren", label: "자녀 유무", type: "radio", options: ["예", "아니오"], required: true },
    { name: "stayDuration", label: "한국 체류 기간", type: "select", options: ["1년 미만", "1~3년", "3~5년", "5년 이상"], required: true },
  ],
  "기타": [
    { name: "inquiry", label: "문의 내용", type: "textarea", placeholder: "궁금하신 내용을 자유롭게 작성해주세요.", required: true },
  ],
};

function getFieldsForServices(serviceList: string[]): { service: string; fields: FieldDef[] }[] {
  const sections: { service: string; fields: FieldDef[] }[] = [];
  const usedFieldNames = new Set<string>();
  for (const svc of serviceList) {
    const allFields = serviceFields[svc] || serviceFields["기타"];
    const uniqueFields = allFields.filter((f) => {
      if (usedFieldNames.has(f.name)) return false;
      usedFieldNames.add(f.name);
      return true;
    });
    if (uniqueFields.length > 0) sections.push({ service: svc, fields: uniqueFields });
  }
  return sections;
}

const input = 'h-11 w-full rounded-md border border-border bg-white px-3 focus:border-brand focus:ring-2 focus:ring-brand-200 outline-none text-sm';

function Step2Form() {
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = (params?.locale as string) || 'ko';
  const serviceParam = searchParams.get('service') || '';
  const inquiryId = searchParams.get('inquiryId') || '';
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = React.useState<Record<string, string>>({});

  const serviceList = serviceParam.split(',').map((s) => decodeURIComponent(s).trim()).filter(Boolean);
  const sections = getFieldsForServices(serviceList.length > 0 ? serviceList : ['기타']);
  const serviceLabel = serviceList.length > 0 ? serviceList.join(' / ') : '기타';

  function updateField(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const additionalMessage = (form.elements.namedItem('additionalMessage') as HTMLTextAreaElement)?.value || '';
    try {
      const res = await fetch('/api/contact-step2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inquiryId, service: serviceLabel, details: { ...formData }, additionalMessage }),
      });
      if (res.ok) setStatus('sent');
      else setStatus('error');
    } catch { setStatus('error'); }
  }

  if (status === 'sent') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-24">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="rounded-lg border border-border bg-white p-10 shadow-sm">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-2xl font-extrabold text-ink mb-3">상담 신청이 완료되었습니다</h2>
            <p className="text-ink-muted mb-6">영업일 기준 1일 이내 연락드리겠습니다.</p>
            <div className="bg-gray-50 rounded-lg p-5 mb-6 space-y-2">
              <div className="flex items-center justify-center gap-2"><span className="text-sm text-ink-muted">전화:</span><span className="font-medium text-ink">02-363-2251</span></div>
              <div className="flex items-center justify-center gap-2"><span className="text-sm text-ink-muted">카카오톡:</span><span className="font-medium text-ink">alexkorea</span></div>
            </div>
            <Link href={`/${locale}`} className="inline-flex items-center justify-center bg-brand hover:bg-brand/90 text-white px-8 h-11 rounded-lg font-semibold transition-colors">홈으로 돌아가기</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-bold">1</div><span className="text-sm font-medium text-ink">기본 정보</span></div>
          <div className="w-8 h-px bg-border" />
          <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-bold">2</div><span className="text-sm font-medium text-ink">상세 정보</span></div>
        </div>

        <div className="rounded-lg border border-border bg-white p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {serviceList.map((svc) => (
              <span key={svc} className="inline-flex items-center px-3 py-1 rounded-full bg-brand-50 text-brand text-xs font-medium">{svc}</span>
            ))}
          </div>
          <h2 className="text-xl font-extrabold text-ink mb-1">상세 정보 입력</h2>
          <p className="text-sm text-ink-muted mb-6">선택하신 서비스에 맞는 상세 정보를 입력해주세요.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {sections.map((section, sectionIdx) => (
              <div key={section.service}>
                {sections.length > 1 && (
                  <div className={sectionIdx > 0 ? 'mt-6 pt-6 border-t border-border' : ''}>
                    <h3 className="text-sm font-semibold text-brand mb-4">{section.service}</h3>
                  </div>
                )}
                {section.fields.map((field) => (
                  <div key={field.name} className="mb-4">
                    <label className="block text-sm font-semibold text-ink mb-1.5">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === 'text' && (
                      <input type="text" required={field.required} placeholder={field.placeholder} value={formData[field.name] || ''} onChange={(e) => updateField(field.name, e.target.value)} className={input} />
                    )}
                    {field.type === 'select' && (
                      <select required={field.required} value={formData[field.name] || ''} onChange={(e) => updateField(field.name, e.target.value)} className={input}>
                        <option value="">선택해주세요</option>
                        {field.options?.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                      </select>
                    )}
                    {field.type === 'radio' && (
                      <div className="flex flex-wrap gap-3 mt-1">
                        {field.options?.map((opt) => (
                          <label key={opt} className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all text-sm ${formData[field.name] === opt ? 'border-brand bg-brand-50 text-brand' : 'border-border hover:border-ink-muted/30 text-ink'}`}>
                            <input type="radio" name={field.name} value={opt} checked={formData[field.name] === opt} onChange={(e) => updateField(field.name, e.target.value)} className="sr-only" required={field.required} />
                            {opt}
                          </label>
                        ))}
                      </div>
                    )}
                    {field.type === 'textarea' && (
                      <textarea required={field.required} placeholder={field.placeholder} rows={5} value={formData[field.name] || ''} onChange={(e) => updateField(field.name, e.target.value)} className={input + ' min-h-32 py-2'} />
                    )}
                  </div>
                ))}
              </div>
            ))}

            <label className="block">
              <span className="block text-sm font-semibold text-ink mb-1.5">추가 메시지 <span className="text-ink-muted font-normal">(선택사항)</span></span>
              <textarea name="additionalMessage" rows={3} placeholder="추가적으로 전달하고 싶은 내용이 있으시면 작성해주세요." className={input + ' min-h-20 py-2'} />
            </label>

            <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full">
              {status === 'sending' ? '전송 중...' : '상담 신청 완료'}
            </Button>

            {status === 'error' && (
              <p className="text-red-600 text-sm text-center">전송에 실패했습니다. 잠시 후 다시 시도하거나 전화로 문의해주세요.</p>
            )}
            <p className="text-xs text-ink-muted text-center">제출하신 정보는 상담 목적으로만 사용됩니다.</p>
          </form>
        </div>

        <div className="mt-4 text-center">
          <Link href={`/${locale}/contact`} className="text-sm text-ink-muted hover:text-brand transition-colors">← 이전 단계로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
}

export default function Step2Page() {
  return (
    <React.Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse"><div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4" /><div className="h-4 bg-gray-200 rounded w-64 mx-auto" /></div>
      </div>
    }>
      <Step2Form />
    </React.Suspense>
  );
}

import { NextResponse } from "next/server"

const NOTION_KEY = process.env.NOTION_CRM_KEY || ""
const TELEGRAM_BOT_TOKEN = "8748564690:AAEGsXxcfqrHmGue8lkqUaa2E0Q8CDCY-Eo"
const TELEGRAM_CHAT_ID = "5533847195"

async function notionReq(endpoint: string, method: string, body?: any) {
  const res = await fetch(`https://api.notion.com/v1/${endpoint}`, {
    method,
    headers: { "Authorization": `Bearer ${NOTION_KEY}`, "Notion-Version": "2022-06-28", "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  })
  return res.json()
}

function formatDetailsForDisplay(service: string, details: Record<string, string>, additionalMessage?: string): string {
  const fieldLabels: Record<string, string> = {
    spouseNationality: "배우자 국적", marriageRegistered: "혼인신고 완료",
    incomeRequirement: "소득요건 충족", spouseCurrentVisa: "배우자 현재 비자",
    koreanLevel: "한국어 의사소통 수준", stayPeriod: "현재 체류기간",
    expiryDate: "만료 예정일", marriageStatus: "혼인 유지 상태",
    rejectionReason: "거절 사유", previousApplyDate: "이전 신청일",
    documentStatus: "보완 서류 준비 상태", stayDuration: "한국 체류 기간",
    income: "소득", koreanAbility: "한국어 능력",
    socialIntegration: "사회통합프로그램 이수", divorceBereavementType: "이혼/사별 구분",
    hasChildren: "자녀 유무", inquiry: "문의 내용",
  }

  let text = `[F6Visa] 상세 상담 정보\n\n서비스: ${service}\n────────────\n`
  for (const [key, value] of Object.entries(details)) {
    if (value) { text += `${fieldLabels[key] || key}: ${value}\n` }
  }
  if (additionalMessage) text += `\n추가 메시지:\n${additionalMessage}`
  return text
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { inquiryId, service, details, additionalMessage } = body

    if (!service || !details) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 })
    }

    const detailsSummary = Object.entries(details as Record<string, string>)
      .filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join(" | ")
    const fullSummary = additionalMessage ? `${detailsSummary} | 추가메시지: ${additionalMessage}` : detailsSummary

    const updatePromise = (async () => {
      if (inquiryId && NOTION_KEY) {
        try {
          await notionReq(`pages/${inquiryId}`, "PATCH", {
            properties: {
              "Form Type": { select: { name: "consultation_complete" } },
              "Quote Answers Summary": { rich_text: [{ text: { content: fullSummary.substring(0, 2000) } }] },
              "Message": { rich_text: [{ text: { content: (additionalMessage || "").substring(0, 2000) } }] },
            },
          })
        } catch (err) { console.error("Notion update error:", err) }
      }
    })()

    const telegramText = formatDetailsForDisplay(service, details, additionalMessage)
    const telegramPromise = fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: telegramText }) }
    ).catch((err) => console.error("Telegram error:", err))

    await Promise.all([updatePromise, telegramPromise])
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Contact step2 error:", error)
    return NextResponse.json({ ok: false, error: "Failed to process inquiry" }, { status: 500 })
  }
}

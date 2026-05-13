// Notion CRM Helper - drop into each site's lib/ directory
const NOTION_KEY = process.env.NOTION_CRM_KEY || "";
const INBOX_DB = "34c5bd7c-ac5a-8184-b0ad-f1451ca545fe";
const CONTACTS_DB = "34c5bd7c-ac5a-811a-bddd-ee05d1c49e37";
const TASKS_DB = "34c5bd7c-ac5a-81b8-b1fc-f7c8f9ce4a6a";

const SERVICE_MAP: Record<string, string> = {
  'd-8': 'D8_INVEST', 'd8': 'D8_INVEST', '투자비자': 'D8_INVEST', 'investment': 'D8_INVEST',
  'd-7': 'D7_TRANSFER', 'd7': 'D7_TRANSFER', '파견비자': 'D7_TRANSFER', 'transfer': 'D7_TRANSFER',
  'e-7': 'E7_WORK', 'e7': 'E7_WORK', '취업비자': 'E7_WORK', 'work': 'E7_WORK',
  'f-4': 'F4_OVERSEAS_KOREAN', 'f4': 'F4_OVERSEAS_KOREAN', '재외동포': 'F4_OVERSEAS_KOREAN',
  'f-5': 'F5_PERMANENT', 'f5': 'F5_PERMANENT', '영주권': 'F5_PERMANENT',
  'f-6': 'F6_MARRIAGE', 'f6': 'F6_MARRIAGE', '결혼비자': 'F6_MARRIAGE',
  '법인설립': 'COMPANY_SETUP', '회사설립': 'COMPANY_SETUP', 'company': 'COMPANY_SETUP',
  '견적': 'INHEGA_QUOTE', 'quote': 'INHEGA_QUOTE',
};

function classifyService(raw: string): string {
  if (!raw) return 'UNKNOWN';
  const lower = raw.toLowerCase().trim();
  for (const [key, code] of Object.entries(SERVICE_MAP)) {
    if (lower.includes(key)) return code;
  }
  return 'GENERAL_CONSULT';
}

async function notionReq(endpoint: string, method: string, body?: any) {
  const res = await fetch(`https://api.notion.com/v1/${endpoint}`, {
    method,
    headers: { 'Authorization': `Bearer ${NOTION_KEY}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

export interface InquiryPayload {
  brand: string; formType: string; siteUrl?: string; language?: string;
  name?: string; email?: string; phone?: string;
  nationality?: string; currentVisa?: string; residenceCountry?: string;
  serviceRaw?: string; message?: string; quoteAnswersSummary?: string;
  rawPayload?: any;
}

export async function saveToCRM(payload: InquiryPayload) {
  try {
    const now = new Date().toISOString();
    const today = now.split('T')[0];

    // 1. Find or create contact
    let contactId: string | null = null;
    if (payload.email) {
      const r = await notionReq(`databases/${CONTACTS_DB}/query`, 'POST', { filter: { property: 'Primary Email', email: { equals: payload.email } } });
      if (r.results?.length > 0) {
        contactId = r.results[0].id;
        const cnt = (r.results[0].properties?.['Inquiry Count']?.number || 0) + 1;
        await notionReq(`pages/${contactId}`, 'PATCH', { properties: { 'Last Inquiry Date': { date: { start: today } }, 'Inquiry Count': { number: cnt } } });
      }
    }
    if (!contactId && payload.phone) {
      const r = await notionReq(`databases/${CONTACTS_DB}/query`, 'POST', { filter: { property: 'Primary Phone', phone_number: { equals: payload.phone } } });
      if (r.results?.length > 0) {
        contactId = r.results[0].id;
        const cnt = (r.results[0].properties?.['Inquiry Count']?.number || 0) + 1;
        await notionReq(`pages/${contactId}`, 'PATCH', { properties: { 'Last Inquiry Date': { date: { start: today } }, 'Inquiry Count': { number: cnt } } });
      }
    }
    if (!contactId && (payload.email || payload.phone)) {
      const cp: any = {
        'Contact Name': { title: [{ text: { content: payload.name || 'Unknown' } }] },
        'First Brand': { select: { name: payload.brand } },
        'First Inquiry Date': { date: { start: today } },
        'Last Inquiry Date': { date: { start: today } },
        'Inquiry Count': { number: 1 },
      };
      if (payload.email) cp['Primary Email'] = { email: payload.email };
      if (payload.phone) cp['Primary Phone'] = { phone_number: payload.phone };
      if (payload.language) cp['Preferred Language'] = { select: { name: payload.language } };
      if (payload.nationality) cp['Nationality'] = { rich_text: [{ text: { content: payload.nationality } }] };
      const nc = await notionReq('pages', 'POST', { parent: { database_id: CONTACTS_DB }, properties: cp });
      contactId = nc.id;
    }

    // 2. Create inbox entry
    const dupKey = [payload.email, payload.phone, today].filter(Boolean).join('|');
    const ip: any = {
      'Inquiry ID': { title: [{ text: { content: `${payload.brand}-${Date.now()}` } }] },
      'Received At': { date: { start: now } },
      'Brand': { select: { name: payload.brand } },
      'Form Type': { select: { name: payload.formType } },
      'Status': { select: { name: 'New' } },
      'Duplicate Key': { rich_text: [{ text: { content: dupKey } }] },
      'Task Created': { checkbox: false },
      'Raw Payload': { rich_text: [{ text: { content: JSON.stringify(payload.rawPayload || {}).substring(0, 2000) } }] },
      'Service Code': { select: { name: classifyService(payload.serviceRaw || '') } },
    };
    if (payload.siteUrl) ip['Site URL'] = { url: payload.siteUrl };
    if (payload.language) ip['Language'] = { select: { name: payload.language } };
    if (payload.name) ip['Name'] = { rich_text: [{ text: { content: payload.name } }] };
    if (payload.email) ip['Email'] = { email: payload.email };
    if (payload.phone) ip['Phone'] = { phone_number: payload.phone };
    if (payload.nationality) ip['Nationality'] = { rich_text: [{ text: { content: payload.nationality } }] };
    if (payload.currentVisa) ip['Current Visa'] = { rich_text: [{ text: { content: payload.currentVisa } }] };
    if (payload.residenceCountry) ip['Residence Country'] = { rich_text: [{ text: { content: payload.residenceCountry } }] };
    if (payload.serviceRaw) ip['Service Raw'] = { rich_text: [{ text: { content: payload.serviceRaw } }] };
    if (payload.message) ip['Message'] = { rich_text: [{ text: { content: payload.message.substring(0, 2000) } }] };
    if (payload.quoteAnswersSummary) ip['Quote Answers Summary'] = { rich_text: [{ text: { content: payload.quoteAnswersSummary.substring(0, 2000) } }] };
    if (contactId) ip['Contact'] = { relation: [{ id: contactId }] };
    const inbox = await notionReq('pages', 'POST', { parent: { database_id: INBOX_DB }, properties: ip });

    // 3. Create task
    const tp: any = {
      'Task Title': { title: [{ text: { content: `[${payload.brand}] ${payload.name || 'Unknown'} - 1차 검토` } }] },
      'Brand': { select: { name: payload.brand } },
      'Task Type': { select: { name: !payload.serviceRaw ? 'classify_service' : 'first_review' } },
      'Priority': { select: { name: payload.formType === 'quote' ? 'High' : 'Medium' } },
      'Status': { select: { name: 'Todo' } },
      'Due Date': { date: { start: new Date(Date.now() + 86400000).toISOString().split('T')[0] } },
      'Inquiry': { relation: [{ id: inbox.id }] },
    };
    if (contactId) tp['Contact'] = { relation: [{ id: contactId }] };
    await notionReq('pages', 'POST', { parent: { database_id: TASKS_DB }, properties: tp });

    // 4. Mark task created
    await notionReq(`pages/${inbox.id}`, 'PATCH', { properties: { 'Task Created': { checkbox: true } } });

    return { success: true, inboxId: inbox.id, contactId };
  } catch (e: any) {
    console.error('[CRM] Error:', e.message);
    return { success: false, error: e.message };
  }
}

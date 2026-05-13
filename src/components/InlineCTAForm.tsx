"use client"

import { useState, FormEvent } from "react"

export function InlineCTAForm() {
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !contact.trim()) return
    setStatus("loading")
    try {
      const res = await fetch("/api/contact-step1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          email: email.trim(),
          services: ["블로그 문의"],
          source: "blog-inline",
        }),
      })
      if (!res.ok) throw new Error("fail")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="my-10 rounded-xl border-2 border-brand/30 bg-brand-50 p-6 text-center">
        <p className="text-lg font-semibold text-brand">신청 완료! 곧 연락드리겠습니다.</p>
      </div>
    )
  }

  return (
    <div className="my-10 rounded-xl border-2 border-brand/30 bg-brand-50/60 p-6 md:p-8">
      <h3 className="mb-4 text-lg font-bold text-brand">
        ⚡ 30초 빠른 상담 신청
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            type="text"
            placeholder="이름 *"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-lg border border-border bg-white px-4 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <input
            type="text"
            placeholder="연락처 *"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="h-11 rounded-lg border border-border bg-white px-4 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-lg border border-border bg-white px-4 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-4 h-11 w-full rounded-lg bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:opacity-60 sm:w-auto sm:px-10"
        >
          {status === "loading" ? "전송 중..." : "상담 신청"}
        </button>
        {status === "error" && (
          <p className="mt-2 text-sm text-red-600">전송에 실패했습니다. 다시 시도해주세요.</p>
        )}
      </form>
    </div>
  )
}

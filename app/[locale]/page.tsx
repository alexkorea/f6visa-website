"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { submitConsult } from "@/app/actions/submit-consult";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const BLOG_POSTS = [
  {
    slug: "f6-visa-application-guide",
    category: "비자 신청",
    title: "F-6 결혼이민비자 신청 완벽 가이드 (2025)",
    desc: "처음 신청하시는 분들을 위한 단계별 안내. 서류 준비부터 대사관 접수까지 전 과정을 정리했습니다.",
    date: "2025.05",
    readMin: 8,
    color: "#fef1e8",
    border: "#f2c9b8",
  },
  {
    slug: "f6-renewal-tips",
    category: "갱신·변경",
    title: "F-6 비자 갱신 시 놓치기 쉬운 5가지 주의사항",
    desc: "체류 자격 갱신을 앞두고 있다면 반드시 확인하세요. 보완 통보 없이 불허 처리되는 흔한 실수들.",
    date: "2025.04",
    readMin: 6,
    color: "#f8ece2",
    border: "#dcc1b9",
  },
  {
    slug: "f5-permanent-residence",
    category: "영주권",
    title: "F-5 영주권 전환 조건과 신청 타이밍 계산법",
    desc: "결혼비자 2년 보유 후 F-5 신청이 가능합니다. 최단 신청 시점과 소득 요건을 상세히 설명합니다.",
    date: "2025.03",
    readMin: 7,
    color: "#fff8f4",
    border: "#ece0d7",
  },
];

const TRUST_ITEMS_KO = [
  "87개국 결혼 사례 데이터",
  "고객 만족도 4.9 / 5.0",
  "24시간 이내 1차 검토",
  "5개 언어 상담 가능",
  "행정사법 제2조 공인 전문가",
  "서류 누락 제로 시스템",
  "월~금 09:30–17:30 상담",
];

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const base = `/${locale}`;
  useReveal();

  const [form, setForm] = useState({ name: "", phone: "", country: "", message: "" });
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await submitConsult({ ...form, locale });
      if (result.ok) {
        setSubmitted(true);
        setForm({ name: "", phone: "", country: "", message: "" });
      } else {
        setError(result.error);
      }
    });
  }

  const visaTypes = [
    {
      tag: "F-6-1",
      href: `${base}/visa/f6-1`,
      icon: "❤️",
      iconBg: "#fef1e8",
      iconColor: "#9b4426",
      title: t("services.f61Title"),
      desc: t("services.f61Desc"),
      badge: "98% 승인율",
      badgeBg: "#c8ecc9",
      badgeColor: "#4c6c50",
    },
    {
      tag: "F-6-2",
      href: `${base}/visa/f6-2`,
      icon: "👶",
      iconBg: "#c8ecc9",
      iconColor: "#46664b",
      title: t("services.f62Title"),
      desc: t("services.f62Desc"),
      badge: "자녀 양육",
      badgeBg: "#ffdbd0",
      badgeColor: "#7c2d11",
    },
    {
      tag: "F-6-3",
      href: `${base}/visa/f6-3`,
      icon: "🛡️",
      iconBg: "#ffdcbc",
      iconColor: "#7c572d",
      title: t("services.f63Title"),
      desc: t("services.f63Desc"),
      badge: "인도적 사유",
      badgeBg: "#f8ece2",
      badgeColor: "#56423d",
    },
  ];

  const steps = [
    { num: "01", title: t("process.step1Title"), desc: t("process.step1Desc") },
    { num: "02", title: t("process.step2Title"), desc: t("process.step2Desc") },
    { num: "03", title: t("process.step3Title"), desc: t("process.step3Desc") },
    { num: "04", title: t("process.step4Title"), desc: t("process.step4Desc") },
  ];

  return (
    <>
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="hero-pad" style={{ position: "relative", background: "linear-gradient(135deg, #fff8f4 0%, #fef1e8 50%, #f8ece2 100%)", overflow: "hidden" }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "400px", height: "400px", background: "rgba(200,236,201,0.3)", borderRadius: "50%", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "350px", height: "350px", background: "rgba(224,120,86,0.12)", borderRadius: "50%", filter: "blur(100px)" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="grid-hero">
            {/* Left content */}
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(200,236,201,0.5)", border: "1px solid #accfae",
                borderRadius: "100px", padding: "6px 16px", marginBottom: "24px",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#46664b", display: "block" }} />
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#2f4e34" }}>
                  1,200+ {locale === "ko" ? "가족이 비전과 함께 정착" : "families settled with Vision"}
                </span>
              </div>

              <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 700, color: "#201b15", lineHeight: 1.2, letterSpacing: "-0.03em", marginBottom: "24px" }} className="word-keep">
                {t("hero.title1")}<br />
                <span style={{ color: "#9b4426" }}>{t("hero.titleHighlight")}</span>
                {t("hero.title2")}<br />
                {t("hero.title3")}
              </h1>

              <p style={{ fontSize: "17px", color: "#56423d", lineHeight: 1.7, maxWidth: "440px", marginBottom: "36px" }} className="word-keep">
                {t("hero.subtitle")}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <Link
                  href={`${base}/contact`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "14px 28px", fontSize: "15px", fontWeight: 700,
                    color: "#fff", background: "#e07856", borderRadius: "12px",
                    textDecoration: "none", boxShadow: "0 4px 16px rgba(155,68,38,0.3)",
                    transition: "opacity 0.2s",
                  }}
                >
                  {t("hero.ctaPrimary")}
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link
                  href={`${base}/visa/f6-1`}
                  style={{
                    display: "inline-flex", alignItems: "center", padding: "14px 24px",
                    fontSize: "15px", fontWeight: 600, color: "#9b4426",
                    border: "2px solid #dcc1b9", borderRadius: "12px", textDecoration: "none",
                    background: "rgba(255,255,255,0.7)", transition: "border-color 0.2s",
                  }}
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>

              {/* Stats */}
              <div className="grid-stats">
                {[
                  { value: "87개국", label: t("hero.stat1Label") },
                  { value: "4.9★", label: t("hero.stat2Label") },
                  { value: "24h", label: t("hero.stat3Label") },
                  { value: "5", label: t("hero.stat4Label") },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p style={{ fontSize: "1.6rem", fontWeight: 700, color: "#9b4426", letterSpacing: "-0.03em", lineHeight: 1 }}>{stat.value}</p>
                    <p style={{ fontSize: "12px", color: "#89726b", marginTop: "4px" }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: floating card — hidden on mobile */}
            <div style={{ display: "flex", justifyContent: "center" }} className="hide-mobile">
              <div style={{ position: "relative", width: "100%", maxWidth: "340px" }}>
                <div className="float" style={{
                  background: "#fff", borderRadius: "20px", padding: "28px",
                  boxShadow: "0 24px 60px rgba(44,38,32,0.14)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#fef1e8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#9b4426" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontSize: "11px", color: "#89726b", fontWeight: 600 }}>케이스 현황</p>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "#201b15" }}>F-6-1 접수 완료</p>
                    </div>
                  </div>
                  {[
                    { label: "서류 검토", status: "완료", color: "#46664b" },
                    { label: "번역·공증", status: "완료", color: "#46664b" },
                    { label: "대사관 접수", status: "진행중", color: "#9b4426" },
                  ].map((row) => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f2e6dd" }}>
                      <span style={{ fontSize: "13px", color: "#89726b" }}>{row.label}</span>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: row.color }}>{row.status}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "20px" }}>🇻🇳</span>
                    <span style={{ fontSize: "20px" }}>🇰🇷</span>
                    <span style={{ fontSize: "12px", color: "#89726b", marginLeft: "4px" }}>담당 행정사 배정 완료</span>
                  </div>
                </div>

                {/* Floating badges */}
                <div style={{
                  position: "absolute", top: "-20px", right: "-24px",
                  background: "#9b4426", borderRadius: "12px", padding: "12px 16px",
                  boxShadow: "0 8px 24px rgba(155,68,38,0.3)",
                }}>
                  <p style={{ fontSize: "22px", fontWeight: 800, color: "#fff", lineHeight: 1 }}>87</p>
                  <p style={{ fontSize: "11px", color: "rgba(255,219,208,0.8)", marginTop: "2px" }}>개국 경험</p>
                </div>
                <div style={{
                  position: "absolute", bottom: "-20px", left: "-24px",
                  background: "#fff", borderRadius: "12px", padding: "12px 16px",
                  boxShadow: "0 8px 24px rgba(44,38,32,0.1)",
                  display: "flex", alignItems: "center", gap: "10px",
                }}>
                  <span style={{ fontSize: "24px" }}>⭐</span>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 800, color: "#201b15" }}>4.9 / 5.0</p>
                    <p style={{ fontSize: "11px", color: "#89726b" }}>고객 만족도</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <div style={{ background: "#f8ece2", borderTop: "1px solid #dcc1b9", borderBottom: "1px solid #dcc1b9", padding: "12px 0", overflow: "hidden" }}>
        <div className="marquee" style={{ display: "flex", whiteSpace: "nowrap" }}>
          {[...TRUST_ITEMS_KO, ...TRUST_ITEMS_KO].map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", padding: "0 28px", fontSize: "13px", fontWeight: 600, color: "#56423d" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#e07856", marginRight: "28px", flexShrink: 0, display: "block" }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── VISA TYPES ─── */}
      <section id="services" style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#9b4426", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {t("services.label")}
            </span>
            <h2 style={{ marginTop: "12px", fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 700, color: "#201b15", letterSpacing: "-0.03em", lineHeight: 1.25 }} className="word-keep">
              {t("services.heading1")}<br/>{t("services.heading2")}
            </h2>
            <p style={{ marginTop: "16px", fontSize: "17px", color: "#56423d", maxWidth: "540px", margin: "16px auto 0" }}>
              {t("services.subtitle")}
            </p>
          </div>

          {/* F-6 cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "24px" }}>
            {visaTypes.map((v, i) => (
              <div key={v.tag} className={`reveal delay-${i + 1} warm-card`} style={{
                background: "#fff", borderRadius: "20px", padding: "32px",
                border: "1px solid #ece0d7", boxShadow: "0 4px 12px rgba(44,38,32,0.06)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: v.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px" }}>
                    {v.icon}
                  </div>
                  <span style={{ padding: "4px 10px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, background: v.badgeBg, color: v.badgeColor }}>
                    {v.badge}
                  </span>
                </div>
                <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800, background: "#9b4426", color: "#fff", marginBottom: "10px" }}>
                  {v.tag}
                </span>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#201b15", marginBottom: "12px", lineHeight: 1.3 }} className="word-keep">
                  {v.title}
                </h3>
                <p style={{ fontSize: "15px", color: "#56423d", lineHeight: 1.7, marginBottom: "24px" }} className="word-keep">
                  {v.desc}
                </p>
                <Link href={v.href} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 700, color: "#9b4426", textDecoration: "none" }}>
                  {locale === "ko" ? "자세히 보기" : "Learn more"}
                  <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          {/* F-5 wide card */}
          <div className="reveal delay-4 warm-card grid-f5" style={{
            background: "linear-gradient(135deg, #362f29 0%, #56423d 100%)",
            borderRadius: "20px", padding: "40px",
          }}>
            <div>
              <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 800, background: "rgba(255,181,158,0.2)", color: "#ffb59e", marginBottom: "14px" }}>F-5</span>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", marginBottom: "10px" }}>{t("services.f5Title")}</h3>
              <p style={{ fontSize: "15px", color: "rgba(251,239,229,0.65)", lineHeight: 1.7, maxWidth: "520px" }}>{t("services.f5Desc")}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", flexShrink: 0 }}>
              {[t("services.f5Item1"), t("services.f5Item2"), t("services.f5Item3")].map((item) => (
                <div key={item} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  background: "rgba(255,255,255,0.08)", borderRadius: "10px", padding: "10px 16px",
                }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path d="M3 8l4 4 6-7" stroke="#accfae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize: "14px", color: "rgba(251,239,229,0.8)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section id="process" className="section-pad" style={{ background: "#f8ece2" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="grid-2col">
            <div className="reveal">
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#9b4426", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {t("process.label")}
              </span>
              <h2 style={{ marginTop: "12px", fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 700, color: "#201b15", letterSpacing: "-0.03em", lineHeight: 1.25 }} className="word-keep">
                {t("process.heading1")}<br/>{t("process.heading2")}
              </h2>
              <p style={{ marginTop: "16px", fontSize: "17px", color: "#56423d", maxWidth: "400px", lineHeight: 1.7 }}>{t("process.subtitle")}</p>
              <Link
                href={`${base}/contact`}
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "32px", padding: "14px 28px", fontSize: "15px", fontWeight: 700, color: "#fff", background: "#e07856", borderRadius: "12px", textDecoration: "none", boxShadow: "0 4px 16px rgba(155,68,38,0.25)" }}
              >
                {t("process.cta")}
              </Link>
            </div>

            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "22px", top: "28px", bottom: "28px", width: "2px", background: "linear-gradient(to bottom, #e07856, #c8ecc9)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                {steps.map((step, i) => (
                  <div key={step.num} className={`reveal delay-${Math.min(i + 1, 4)}`} style={{ display: "flex", gap: "20px", paddingLeft: "8px" }}>
                    <div style={{
                      width: "46px", height: "46px", borderRadius: "50%", background: "#fff",
                      border: "2px solid #e07856", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: 800, color: "#9b4426", flexShrink: 0,
                      boxShadow: "0 4px 12px rgba(155,68,38,0.15)",
                    }}>
                      {step.num}
                    </div>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#201b15", marginBottom: "4px" }}>{step.title}</h3>
                      <p style={{ fontSize: "14px", color: "#56423d", lineHeight: 1.7 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COUNTRY GUIDE ─── */}
      <section id="countries" className="section-pad" style={{ background: "#f8ece2" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#9b4426", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {t("country.homeSectionLabel")}
            </span>
            <h2 style={{ marginTop: "12px", fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 700, color: "#201b15", letterSpacing: "-0.03em" }} className="word-keep">
              {t("country.heading")}
            </h2>
            <p style={{ marginTop: "12px", fontSize: "16px", color: "#56423d", maxWidth: "540px", margin: "12px auto 0" }} className="word-keep">
              {t("country.homeSectionSubtitle")}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px" }}>
            {[
              { flag: "🇻🇳", name: "베트남", slug: "vietnam", note: "영사 확인 필요" },
              { flag: "🇨🇳", name: "중국", slug: "china", note: "3단계 공증" },
              { flag: "🇵🇭", name: "필리핀", slug: "philippines", note: "아포스티유" },
              { flag: "🇷🇺", name: "러시아", slug: "russia", note: "아포스티유" },
              { flag: "🇹🇭", name: "태국", slug: "thailand", note: "영사 확인 필요" },
              { flag: "🇺🇿", name: "우즈베키스탄", slug: "uzbekistan", note: "아포스티유" },
            ].map((country, i) => (
              <Link
                key={country.slug}
                href={`${base}/country/${country.slug}`}
                className={`reveal delay-${Math.min(i + 1, 4)} warm-card`}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
                  padding: "24px 16px", background: "#fff", borderRadius: "16px",
                  border: "1px solid #dcc1b9", textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(44,38,32,0.05)",
                }}
              >
                <span style={{ fontSize: "36px" }}>{country.flag}</span>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#201b15", marginBottom: "4px" }}>{country.name}</p>
                  <p style={{ fontSize: "11px", color: "#89726b", background: "#fef1e8", padding: "2px 8px", borderRadius: "20px" }}>{country.note}</p>
                </div>
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14" style={{ color: "#9b4426" }}>
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOG ─── */}
      <section id="blog" className="section-pad" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#9b4426", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {t("nav.blog")}
              </span>
              <h2 style={{ marginTop: "12px", fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 700, color: "#201b15", letterSpacing: "-0.03em" }} className="word-keep">
                {t("blog.heading")}
              </h2>
            </div>
            <Link
              href={`${base}/blog`}
              style={{ fontSize: "14px", fontWeight: 700, color: "#9b4426", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}
            >
              {t("country.viewAll")}
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {BLOG_POSTS.map((post, i) => (
              <Link
                key={post.slug}
                href={`${base}/blog/${post.slug}`}
                className={`reveal delay-${i + 1} warm-card`}
                style={{
                  display: "block", background: post.color, borderRadius: "16px",
                  border: `1px solid ${post.border}`, padding: "28px",
                  textDecoration: "none", boxShadow: "0 4px 12px rgba(44,38,32,0.05)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <span style={{ padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 700, background: "#9b4426", color: "#fff" }}>
                    {post.category}
                  </span>
                  <span style={{ fontSize: "12px", color: "#89726b" }}>{post.date} · {post.readMin}분 읽기</span>
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#201b15", marginBottom: "12px", lineHeight: 1.45 }} className="word-keep">
                  {post.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#56423d", lineHeight: 1.75 }} className="word-keep">
                  {post.desc}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "20px", fontSize: "13px", fontWeight: 700, color: "#9b4426" }}>
                  자세히 보기
                  <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                    <path d="M2.5 6h7M6 2.5l3.5 3.5L6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONSULTATION FORM ─── */}
      <section id="consult" className="section-pad" style={{ background: "linear-gradient(135deg, #fff8f4 0%, #fef1e8 100%)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }} className="grid-2col">
          <div className="reveal">
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#9b4426", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {t("consult.label")}
            </span>
            <h2 style={{ marginTop: "12px", fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 700, color: "#201b15", letterSpacing: "-0.03em", lineHeight: 1.25 }} className="word-keep">
              {t("consult.heading1")}<br/>{t("consult.heading2")}
            </h2>
            <p style={{ marginTop: "16px", fontSize: "17px", color: "#56423d", maxWidth: "400px", lineHeight: 1.7 }}>{t("consult.subtitle")}</p>

            <div style={{ marginTop: "36px", display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { icon: "🕐", label: t("consult.hoursLabel"), value: t("consult.hours") },
                { icon: "💬", label: t("consult.kakaoLabel"), value: t("consult.kakao") },
                { icon: "🌐", label: t("consult.languagesLabel"), value: t("consult.languages") },
                { icon: "✅", label: t("consult.credentialLabel"), value: t("consult.credential") },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "20px" }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#89726b", marginBottom: "2px" }}>{item.label}</p>
                    <p style={{ fontSize: "15px", fontWeight: 600, color: "#201b15" }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal delay-2">
            <div style={{ background: "#fff", borderRadius: "20px", padding: "36px", boxShadow: "0 12px 40px rgba(44,38,32,0.1)", border: "1px solid #ece0d7" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#201b15", marginBottom: "24px" }}>{t("consult.formTitle")}</h3>

              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
                  <p style={{ fontSize: "18px", fontWeight: 700, color: "#46664b", marginBottom: "8px" }}>상담 신청 완료!</p>
                  <p style={{ fontSize: "14px", color: "#56423d" }}>24시간 내 전문 행정사가 연락드립니다.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { key: "name" as const, label: t("consult.formName"), type: "text", placeholder: t("consult.formNamePh") },
                    { key: "phone" as const, label: t("consult.formPhone"), type: "tel", placeholder: t("consult.formPhonePh") },
                    { key: "country" as const, label: t("consult.formCountry"), type: "text", placeholder: t("consult.formCountryPh") },
                  ].map((field) => (
                    <div key={field.key}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#56423d", marginBottom: "6px" }}>{field.label}</label>
                      <input
                        type={field.type}
                        value={form[field.key]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        required
                        style={{ width: "100%", padding: "12px 16px", fontSize: "15px", color: "#201b15", background: "#fef1e8", border: "1.5px solid #dcc1b9", borderRadius: "10px", outline: "none", transition: "border-color 0.2s" }}
                        onFocus={(e) => (e.target.style.borderColor = "#9b4426")}
                        onBlur={(e) => (e.target.style.borderColor = "#dcc1b9")}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#56423d", marginBottom: "6px" }}>{t("consult.formMessage")}</label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={t("consult.formMessagePh")}
                      style={{ width: "100%", padding: "12px 16px", fontSize: "15px", color: "#201b15", background: "#fef1e8", border: "1.5px solid #dcc1b9", borderRadius: "10px", outline: "none", resize: "none", transition: "border-color 0.2s" }}
                      onFocus={(e) => (e.target.style.borderColor = "#9b4426")}
                      onBlur={(e) => (e.target.style.borderColor = "#dcc1b9")}
                    />
                  </div>
                  {error && <p style={{ fontSize: "13px", color: "#ba1a1a" }}>{error}</p>}
                  <button
                    type="submit"
                    disabled={isPending}
                    style={{
                      width: "100%", padding: "14px", fontSize: "15px", fontWeight: 700,
                      color: "#fff", background: isPending ? "#89726b" : "#e07856",
                      borderRadius: "12px", border: "none", cursor: isPending ? "not-allowed" : "pointer",
                      boxShadow: "0 4px 16px rgba(155,68,38,0.25)", transition: "background 0.2s",
                    }}
                  >
                    {isPending ? "제출 중..." : t("consult.formSubmit")}
                  </button>
                  <p style={{ fontSize: "12px", textAlign: "center", color: "#89726b" }}>{t("consult.formPrivacy")}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

"use client";

import { use, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCountry } from "@/data/countries";

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

export default function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const t = useTranslations();
  const locale = useLocale();
  const base = `/${locale}`;
  useReveal();

  const country = getCountry(slug);

  if (!country) {
    return (
      <>
        <Navbar />
        <div style={{ maxWidth: "600px", margin: "120px auto", textAlign: "center", padding: "0 24px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#201b15", marginBottom: "16px" }}>{t("countryDetail.notFound")}</h1>
          <Link href={`${base}/country`} style={{ color: "#9b4426", fontWeight: 600 }}>{t("countryDetail.notFoundBack")}</Link>
        </div>
        <Footer />
      </>
    );
  }

  const processSteps = country.apostille
    ? [
        { step: t("countryDetail.step1"), desc: `${country.nameKo} 현지 관청에 혼인 신고 후 혼인증명서 발급` },
        { step: t("countryDetail.step2Apostille"), desc: "현지 외교부·법무부에 아포스티유 신청 및 부착" },
        { step: t("countryDetail.step3Apostille"), desc: "공인 번역사 번역 후 한국 공증사무소 공증" },
        { step: t("countryDetail.step4Apostille"), desc: "무범죄증명서, 여권 사본, 사진 등 추가 서류 준비" },
        { step: t("countryDetail.step5Apostille"), desc: `${t("countryDetail.processDays")} ${country.processDays} ${t("countryDetail.expected")}` },
      ]
    : [
        { step: t("countryDetail.step1"), desc: `${country.nameKo} 현지 관청에 혼인 신고 후 혼인증명서 발급` },
        { step: t("countryDetail.step2Consular"), desc: `${country.nameKo} 외교부에서 서류 인증 취득` },
        { step: t("countryDetail.step3Consular"), desc: `주${country.nameKo} 한국 대사관에서 영사 확인 (날인)` },
        { step: t("countryDetail.step4Consular"), desc: "공인 번역사 번역 후 한국 공증사무소 공증" },
        { step: t("countryDetail.step5Consular"), desc: "무범죄증명서, 여권 사본, 사진 등 추가 서류 준비" },
        { step: t("countryDetail.step6Consular"), desc: `${t("countryDetail.processDays")} ${country.processDays} ${t("countryDetail.expected")}` },
      ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #fff8f4 0%, #fef1e8 100%)", padding: "56px 24px 48px", borderBottom: "1px solid #dcc1b9" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <nav style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "13px", color: "#89726b", marginBottom: "20px", flexWrap: "wrap" }}>
            <Link href={base} style={{ color: "#9b4426", textDecoration: "none" }}>{t("common.home")}</Link>
            <span>›</span>
            <Link href={`${base}/country`} style={{ color: "#9b4426", textDecoration: "none" }}>{t("nav.countryGuide")}</Link>
            <span>›</span>
            <span>{country.nameKo}</span>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "56px" }}>{country.flag}</span>
            <div>
              <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#201b15", letterSpacing: "-0.03em", marginBottom: "8px" }} className="word-keep">
                {country.nameKo} {t("countryDetail.visaGuide")}
              </h1>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", background: "#f0e8e4", color: "#56423d" }}>
                  {t("countryDetail.processDays")} {country.processDays}
                </span>
              </div>
            </div>
          </div>

          <p style={{ fontSize: "15px", color: "#56423d", lineHeight: 1.7, maxWidth: "700px" }} className="word-keep">
            {country.notarizeNote}
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 24px 96px" }}>

        {/* Required Documents */}
        <section className="reveal" style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#201b15", marginBottom: "20px", paddingBottom: "12px", borderBottom: "2px solid #f0e8e4" }}>
            {t("countryDetail.requiredDocs")}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {country.requiredDocs.map((doc, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "16px 20px", background: "#fff", borderRadius: "12px", border: "1px solid #f0e8e4", boxShadow: "0 1px 4px rgba(44,38,32,0.04)" }}>
                <span style={{ flexShrink: 0, width: "24px", height: "24px", borderRadius: "50%", background: "#9b4426", color: "#fff", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {i + 1}
                </span>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#201b15", marginBottom: "4px" }}>{doc.name}</p>
                  <p style={{ fontSize: "13px", color: "#89726b" }}>{doc.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Marriage Document Detail */}
        <section className="reveal" style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#201b15", marginBottom: "20px", paddingBottom: "12px", borderBottom: "2px solid #f0e8e4" }}>
            {t("countryDetail.marriageDoc")}
          </h2>
          <div style={{ padding: "20px 24px", background: "#fff8f4", borderRadius: "12px", border: "1.5px solid #f2c9b8" }}>
            <p style={{ fontSize: "15px", fontWeight: 600, color: "#201b15", marginBottom: "8px" }}>{country.marriageDoc}</p>
            <p style={{ fontSize: "13px", color: "#56423d", lineHeight: 1.7 }}>{country.notarizeNote}</p>
          </div>
        </section>

        {/* Key Notes */}
        {country.keyNotes.length > 0 && (
          <section className="reveal" style={{ marginBottom: "48px" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#201b15", marginBottom: "20px", paddingBottom: "12px", borderBottom: "2px solid #f0e8e4" }}>
              {t("countryDetail.keyNotes")}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {country.keyNotes.map((note, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", padding: "14px 18px", background: "#fffbf8", borderRadius: "10px", border: "1px solid #f0e8e4" }}>
                  <span style={{ color: "#e07856", flexShrink: 0, marginTop: "1px" }}>•</span>
                  <p style={{ fontSize: "14px", color: "#56423d", lineHeight: 1.6 }} className="word-keep">{note}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Process Timeline */}
        <section className="reveal" style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#201b15", marginBottom: "20px", paddingBottom: "12px", borderBottom: "2px solid #f0e8e4" }}>
            {t("countryDetail.processSteps")}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {processSteps.map((item, i, arr) => (
              <div key={i} style={{ display: "flex", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#9b4426", color: "#fff", fontSize: "13px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {i + 1}
                  </div>
                  {i < arr.length - 1 && <div style={{ width: "2px", height: "32px", background: "#dcc1b9" }} />}
                </div>
                <div style={{ paddingBottom: "16px" }}>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#201b15", marginBottom: "4px" }}>{item.step}</p>
                  <p style={{ fontSize: "13px", color: "#56423d" }} className="word-keep">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        {country.faq.length > 0 && (
          <section className="reveal" style={{ marginBottom: "48px" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#201b15", marginBottom: "20px", paddingBottom: "12px", borderBottom: "2px solid #f0e8e4" }}>
              {t("countryDetail.faq")}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {country.faq.map((item, i) => (
                <div key={i} style={{ borderRadius: "12px", border: "1px solid #f0e8e4", overflow: "hidden" }}>
                  <div style={{ padding: "16px 20px", background: "#fff8f4" }}>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#9b4426" }} className="word-keep">Q. {item.q}</p>
                  </div>
                  <div style={{ padding: "16px 20px", background: "#fff" }}>
                    <p style={{ fontSize: "14px", color: "#56423d", lineHeight: 1.7 }} className="word-keep">A. {item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="reveal" style={{ padding: "40px", background: "linear-gradient(135deg, #9b4426 0%, #c0582e 100%)", borderRadius: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", marginBottom: "12px" }} className="word-keep">
            {country.nameKo} {t("countryDetail.visaGuide")}
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", marginBottom: "24px", lineHeight: 1.7 }}>
            {t("countryDetail.ctaSubtitle")}
          </p>
          <Link
            href={`${base}/contact`}
            style={{ display: "inline-flex", padding: "14px 36px", fontSize: "15px", fontWeight: 700, color: "#9b4426", background: "#fff", borderRadius: "12px", textDecoration: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}
          >
            {t("common.consultBtn")}
          </Link>
        </section>

        {/* Back link */}
        <div style={{ marginTop: "32px", textAlign: "center" }}>
          <Link href={`${base}/country`} style={{ fontSize: "14px", color: "#9b4426", textDecoration: "none", fontWeight: 600 }}>
            {t("countryDetail.backLink")}
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

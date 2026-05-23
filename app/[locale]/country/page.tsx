"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COUNTRIES } from "@/data/countries";

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

const CONTINENT_MAP = [
  { ko: "전체", tKey: "continentAll" },
  { ko: "아시아", tKey: "continentAsia" },
  { ko: "유럽", tKey: "continentEurope" },
  { ko: "아메리카", tKey: "continentAmerica" },
  { ko: "중동", tKey: "continentMiddleEast" },
  { ko: "아프리카", tKey: "continentAfrica" },
  { ko: "오세아니아", tKey: "continentOceania" },
] as const;

export default function CountryIndexPage() {
  const t = useTranslations();
  const locale = useLocale();
  const base = `/${locale}`;
  const [activeKo, setActiveKo] = useState<string>("전체");
  useReveal();

  const filtered = activeKo === "전체" ? COUNTRIES : COUNTRIES.filter((c) => c.continent === activeKo);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #fff8f4 0%, #fef1e8 100%)", padding: "64px 24px 56px", borderBottom: "1px solid #dcc1b9" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <nav style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "13px", color: "#89726b", marginBottom: "20px" }}>
            <Link href={base} style={{ color: "#9b4426", textDecoration: "none" }}>{t("common.home")}</Link>
            <span>›</span>
            <span>{t("nav.countryGuide")}</span>
          </nav>
          <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, background: "#ffdbd0", color: "#7c2d11", marginBottom: "16px" }}>
            {COUNTRIES.length}{t("country.badge")}
          </span>
          <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "#201b15", letterSpacing: "-0.03em", marginBottom: "16px" }} className="word-keep">
            {t("country.heading")}
          </h1>
          <p style={{ fontSize: "17px", color: "#56423d", maxWidth: "600px", lineHeight: 1.7 }} className="word-keep">
            {t("country.subtitle")}
          </p>
        </div>
      </section>

      {/* Country grid */}
      <section style={{ padding: "64px 24px 96px", background: "#fff8f4" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Continent filter */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
            {CONTINENT_MAP.map((c) => (
              <button
                key={c.ko}
                onClick={() => setActiveKo(c.ko)}
                style={{
                  padding: "8px 18px", fontSize: "13px", fontWeight: 700,
                  borderRadius: "100px", border: "1.5px solid",
                  borderColor: activeKo === c.ko ? "#9b4426" : "#dcc1b9",
                  background: activeKo === c.ko ? "#9b4426" : "#fff",
                  color: activeKo === c.ko ? "#fff" : "#56423d",
                  cursor: "pointer",
                }}
              >
                {t(`country.${c.tKey}`)}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "12px" }}>
            {filtered.map((country) => (
              <Link
                key={country.slug}
                href={`${base}/country/${country.slug}`}
                className="warm-card"
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                  padding: "20px 12px", background: "#fff", borderRadius: "14px",
                  border: "1.5px solid #f0e8e4",
                  textDecoration: "none", boxShadow: "0 2px 8px rgba(44,38,32,0.04)",
                }}
              >
                <span style={{ fontSize: "32px" }}>{country.flag}</span>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#201b15", textAlign: "center" }}>{country.nameKo}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "#362f29", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: "16px" }} className="word-keep">
            {t("country.noCountryTitle")}
          </h2>
          <p style={{ fontSize: "17px", color: "rgba(251,239,229,0.7)", marginBottom: "32px", lineHeight: 1.7 }}>
            {t("country.noCountrySubtitle")}
          </p>
          <Link
            href={`${base}/contact`}
            style={{ display: "inline-flex", padding: "16px 40px", fontSize: "16px", fontWeight: 700, color: "#fff", background: "#e07856", borderRadius: "12px", textDecoration: "none", boxShadow: "0 4px 16px rgba(224,120,86,0.4)" }}
          >
            {t("common.consultBtn")}
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

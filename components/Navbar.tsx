"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const LOCALES = ["ko", "en", "zh", "vi", "th", "ru"] as const;

type NavbarProps = { activeSection?: string };

export default function Navbar({ activeSection }: NavbarProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [visaOpen, setVisaOpen] = useState(false);
  const visaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (visaRef.current && !visaRef.current.contains(e.target as Node)) setVisaOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(next: string) {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || `/${next}`);
    setLangOpen(false);
    setMenuOpen(false);
  }

  const base = `/${locale}`;
  const visaSubLinks = [
    { href: `${base}/visa/f6-2`, label: t("nav.f62") },
    { href: `${base}/visa/f6-3`, label: t("nav.f63") },
    { href: `${base}/visa/f6-1`, label: t("nav.f61") },
  ];
  const navLinks = [
    { href: `${base}#process`, label: t("nav.process") },
    { href: `${base}/blog`, label: t("nav.blog") },
    { href: `${base}/about`, label: t("nav.about") },
  ];

  const isActive = (href: string) => pathname === href;
  const isVisaActive = visaSubLinks.some((l) => pathname === l.href);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(255,248,244,0.92)" : "rgba(255,248,244,0.8)",
        backdropFilter: "blur(12px)",
        boxShadow: scrolled ? "0 1px 12px rgba(44,38,32,0.08)" : "none",
        borderBottom: scrolled ? "1px solid rgba(220,193,185,0.4)" : "none",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href={base} style={{ fontWeight: 700, fontSize: "20px", color: "#9b4426", letterSpacing: "-0.02em", textDecoration: "none" }}>
          비전행정사사무소
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-desktop">
          {/* Visa Guide dropdown */}
          <div ref={visaRef} style={{ position: "relative" }}>
            <button
              onClick={() => setVisaOpen((o) => !o)}
              style={{
                fontSize: "14px", fontWeight: 600,
                color: isVisaActive ? "#9b4426" : "#56423d",
                background: "transparent", border: "none", cursor: "pointer",
                borderBottom: isVisaActive ? "2px solid #9b4426" : "none",
                paddingBottom: "2px", display: "flex", alignItems: "center", gap: "4px",
              }}
            >
              {t("nav.visaGuide")}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {visaOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, background: "#fff", border: "1px solid #dcc1b9", borderRadius: "12px", boxShadow: "0 8px 24px rgba(44,38,32,0.12)", minWidth: "200px", overflow: "hidden", zIndex: 100 }}>
                {visaSubLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setVisaOpen(false)}
                    style={{ display: "block", padding: "11px 18px", fontSize: "13px", fontWeight: isActive(link.href) ? 700 : 500, color: isActive(link.href) ? "#9b4426" : "#56423d", textDecoration: "none", background: isActive(link.href) ? "#fef1e8" : "transparent" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: isActive(link.href) ? "#9b4426" : "#56423d",
                textDecoration: "none",
                borderBottom: isActive(link.href) ? "2px solid #9b4426" : "none",
                paddingBottom: "2px",
                transition: "color 0.2s",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Language switcher */}
          <div style={{ position: "relative" }} className="hide-mobile">
            <button
              onClick={() => setLangOpen((o) => !o)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#56423d",
                border: "1px solid #dcc1b9",
                borderRadius: "20px",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M7 1.5C7 1.5 5 4 5 7s2 5.5 2 5.5M7 1.5c0 0 2 2.5 2 5.5s-2 5.5-2 5.5M1.5 7h11" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
              {t(`lang.${locale}`)}
            </button>
            {langOpen && (
              <div style={{ position: "absolute", right: 0, top: "calc(100% + 4px)", background: "#fff", border: "1px solid #dcc1b9", borderRadius: "12px", boxShadow: "0 8px 24px rgba(44,38,32,0.12)", minWidth: "130px", overflow: "hidden", zIndex: 100 }}>
                {LOCALES.map((l) => (
                  <button
                    key={l}
                    onClick={() => switchLocale(l)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 16px",
                      fontSize: "14px",
                      fontWeight: l === locale ? 700 : 400,
                      color: l === locale ? "#9b4426" : "#56423d",
                      background: l === locale ? "#fef1e8" : "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {t(`lang.${l}`)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <Link
            href={`${base}/contact`}
            style={{
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#fff",
              background: "#e07856",
              borderRadius: "12px",
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(155,68,38,0.25)",
              transition: "opacity 0.2s",
            }}
            className="hide-mobile"
          >
            {t("nav.cta")}
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            style={{ padding: "8px", color: "#9b4426", background: "transparent", border: "none", cursor: "pointer" }}
            className="nav-mobile-btn"
            aria-label="menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <path d="M3 3L19 19M19 3L3 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              ) : (
                <path d="M2 6h18M2 11h18M2 16h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "rgba(255,248,244,0.98)", borderTop: "1px solid #dcc1b9", padding: "20px 24px 28px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#9b4426", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{t("nav.visaGuide")}</p>
              {visaSubLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ display: "block", fontSize: "15px", fontWeight: 600, color: "#56423d", textDecoration: "none", paddingLeft: "12px", marginBottom: "8px" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: "16px", fontWeight: 600, color: "#56423d", textDecoration: "none" }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingTop: "8px" }}>
              {LOCALES.map((l) => (
                <button
                  key={l}
                  onClick={() => switchLocale(l)}
                  style={{
                    padding: "6px 12px",
                    fontSize: "12px",
                    fontWeight: 700,
                    borderRadius: "20px",
                    border: "1px solid #dcc1b9",
                    background: l === locale ? "#9b4426" : "transparent",
                    color: l === locale ? "#fff" : "#56423d",
                    cursor: "pointer",
                  }}
                >
                  {t(`lang.${l}`)}
                </button>
              ))}
            </div>
            <Link
              href={`${base}/contact`}
              onClick={() => setMenuOpen(false)}
              style={{ display: "flex", justifyContent: "center", padding: "14px", fontSize: "15px", fontWeight: 700, color: "#fff", background: "#e07856", borderRadius: "12px", textDecoration: "none" }}
            >
              {t("nav.cta")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

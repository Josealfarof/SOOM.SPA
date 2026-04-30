"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const links = {
    Tienda: [
      { label: "Catálogo completo", href: "/catalogo" },
      { label: "Limpiadores", href: "/catalogo" },
      { label: "Sueros", href: "/catalogo" },
      { label: "Hidratantes", href: "/catalogo" },
    ],
    Info: [
      { label: "Nuestra historia", href: "#brand-story" },
      { label: "Ingredientes", href: "#" },
      { label: "Guía de rutina", href: "#" },
      { label: "FAQ", href: "#" },
    ],
    Contacto: [
      { label: "Instagram", href: "https://www.instagram.com/soom.spa/" },
      { label: "Correo", href: "mailto:hola@soom.spa" },
      { label: "WhatsApp", href: "#" },
    ],
  };

  return (
    <footer
      style={{
        background: "var(--bark)",
        color: "rgba(255,255,255,0.55)",
        padding: "80px 0 40px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>

        {/* Top grid */}
        <div
          className="grid gap-12"
          style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
        >
          {/* Brand */}
          <div>
            <div className="mb-6">
              <Image
                src="/Foto Productos/LOGO/11.png"
                alt="SOOM 숨"
                width={110}
                height={62}
                style={{
                  filter: "brightness(0) invert(1)",
                  objectFit: "contain",
                }}
              />
            </div>
            <p
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.9,
                maxWidth: "280px",
                fontWeight: 300,
              }}
            >
              La pureza y eficacia del cuidado de piel asiático,
              llevado directamente a ti.
            </p>
            <div className="flex gap-4 mt-8">
              <a
                href="https://www.instagram.com/soom.spa/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
                style={{
                  width: "38px",
                  height: "38px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.6)",
                  transition: "all 0.3s ease",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--blush)";
                  el.style.color = "var(--blush)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(255,255,255,0.15)";
                  el.style.color = "rgba(255,255,255,0.6)";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4
                className="mb-5"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  fontWeight: 600,
                  fontFamily: "var(--font-body)",
                }}
              >
                {section}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm transition-colors duration-200"
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontWeight: 300,
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.08em" }}>
            © 2025 SOOM 숨. Todos los derechos reservados.
          </p>
          <p
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            숨 · Respira · Conecta · Brilla
          </p>
        </div>
      </div>

      {/* Mobile responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          .grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

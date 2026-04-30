"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 14;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #1C1916 0%, #2E2820 40%, #1A1610 100%)",
      }}
    >
      {/* Texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(196, 168, 154, 0.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 50% at 80% 100%, rgba(136, 158, 130, 0.1) 0%, transparent 60%)
          `,
        }}
      />

      {/* Giant 숨 background character */}
      <div
        className="soom-bg-char absolute pointer-events-none select-none"
        style={{
          fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
          fontSize: "clamp(280px, 45vw, 600px)",
          fontWeight: 300,
          color: "rgba(255,255,255,0.055)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          lineHeight: 1,
          userSelect: "none",
          zIndex: 0,
        }}
      >
        숨
      </div>

      {/* Horizontal ornament lines */}
      <div
        className="absolute top-1/4 left-0 right-0 pointer-events-none"
        style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)" }}
      />
      <div
        className="absolute bottom-1/4 left-0 right-0 pointer-events-none"
        style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)" }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6"
        style={{ maxWidth: "700px" }}
      >
        {/* Eyebrow */}
        <div
          className="flex items-center gap-4 mb-8"
          style={{
            animation: "revealFade 1.2s ease forwards",
            animationDelay: "0.2s",
            opacity: 0,
          }}
        >
          <span
            className="h-px w-10"
            style={{ background: "var(--blush)", display: "block" }}
          />
          <span
            className="text-xs tracking-[0.35em] uppercase"
            style={{ color: "var(--blush)", fontWeight: 500 }}
          >
            K-Beauty · East Asian Skincare
          </span>
          <span
            className="h-px w-10"
            style={{ background: "var(--blush)", display: "block" }}
          />
        </div>

        {/* Main heading */}
        <h1
          className="text-white"
          style={{
            fontSize: "clamp(52px, 9vw, 110px)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
            animation: "revealUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            animationDelay: "0.4s",
            opacity: 0,
          }}
        >
          Respira.
          <br />
          <em style={{ fontStyle: "italic", color: "var(--blush)" }}>Conecta.</em>
          <br />
          Brilla.
        </h1>

        {/* Korean subtitle */}
        <p
          className="mt-5 tracking-[0.45em] text-sm uppercase"
          style={{
            color: "rgba(255,255,255,0.35)",
            animation: "revealFade 1s ease forwards",
            animationDelay: "0.8s",
            opacity: 0,
          }}
        >
          숨 · SOOM · 숨
        </p>

        {/* Description */}
        <p
          className="mt-8 text-base leading-loose"
          style={{
            color: "rgba(255,255,255,0.65)",
            fontWeight: 300,
            maxWidth: "420px",
            animation: "revealUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            animationDelay: "1s",
            opacity: 0,
          }}
        >
          Tu rutina de skincare no es solo un paso más — es el momento donde
          vuelves a conectar contigo misma.
        </p>

        {/* CTAs */}
        <div
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
          style={{
            animation: "revealUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            animationDelay: "1.2s",
            opacity: 0,
          }}
        >
          <Link
            href="/catalogo"
            className="btn-primary"
            style={{
              background: "var(--blush)",
              borderColor: "var(--blush)",
              color: "white",
              minWidth: "200px",
            }}
          >
            Ver Catálogo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <a
            href="#brand-story"
            className="btn-outline"
            style={{
              borderColor: "rgba(255,255,255,0.25)",
              color: "rgba(255,255,255,0.75)",
              minWidth: "200px",
            }}
          >
            Nuestra Historia
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 flex flex-col items-center gap-2"
        style={{
          transform: "translateX(-50%)",
          animation: "revealFade 1s ease forwards",
          animationDelay: "2s",
          opacity: 0,
        }}
      >
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Descubrir
        </span>
        <div
          className="w-px overflow-hidden"
          style={{ height: "48px", background: "rgba(255,255,255,0.1)" }}
        >
          <div
            className="w-full"
            style={{
              height: "48px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
              animation: "scrollLine 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}

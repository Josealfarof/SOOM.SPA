"use client";

import { useRef, useEffect, useState } from "react";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function BrandStory() {
  const { ref, inView } = useInView(0.15);

  const pillars = [
    { num: "01", label: "Pureza", desc: "Ingredientes de la más alta calidad provenientes de Corea, Japón y China." },
    { num: "02", label: "Eficacia", desc: "Fórmulas respaldadas por décadas de investigación en biotecnología asiática." },
    { num: "03", label: "Ritual", desc: "Cada producto es un paso consciente hacia tu mejor versión." },
  ];

  return (
    <section
      id="brand-story"
      ref={ref}
      style={{ background: "var(--cream)", padding: "120px 0" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>

        {/* Top label */}
        <div
          className="flex items-center gap-4 mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <span
            className="h-px block"
            style={{ width: "40px", background: "var(--blush)" }}
          />
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--warm-gray)", fontWeight: 500 }}
          >
            Nuestra Historia
          </span>
        </div>

        {/* Main content grid */}
        <div
          className="grid gap-16"
          style={{ gridTemplateColumns: "1fr 1fr", alignItems: "start" }}
        >
          {/* Left: Big heading */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(32px)",
              transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(38px, 5vw, 72px)",
                fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                fontWeight: 300,
                lineHeight: 1.08,
                color: "var(--bark)",
              }}
            >
              La pureza y{" "}
              <em style={{ fontStyle: "italic", color: "var(--blush)" }}>
                eficacia
              </em>{" "}
              de Asia,
              <br />
              muy pronto
              <br />
              en tus manos.
            </h2>

            <p
              className="mt-8 leading-relaxed"
              style={{
                color: "var(--warm-gray)",
                fontSize: "0.95rem",
                fontWeight: 300,
                maxWidth: "420px",
                lineHeight: 1.9,
              }}
            >
              SOOM (숨) nace de una profunda admiración por las tradiciones de
              belleza del Este Asiático — rituales centenarios que entienden
              el cuidado de la piel como un acto de amor propio.
            </p>
            <p
              className="mt-5 leading-relaxed"
              style={{
                color: "var(--warm-gray)",
                fontSize: "0.95rem",
                fontWeight: 300,
                maxWidth: "420px",
                lineHeight: 1.9,
              }}
            >
              Nuestro nombre significa{" "}
              <span style={{ color: "var(--bark)", fontStyle: "italic" }}>
                "aliento"
              </span>{" "}
              en coreano — ese espacio de quietud entre un paso y el siguiente,
              donde verdaderamente te reconectas contigo misma.
            </p>
          </div>

          {/* Right: Decorative box + quote */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(32px)",
              transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.25s",
            }}
          >
            {/* Korean characters decorative block */}
            <div
              className="relative flex flex-col items-center justify-center"
              style={{
                background: "var(--linen)",
                padding: "64px 48px",
                minHeight: "320px",
                overflow: "hidden",
              }}
            >
              {/* Big char bg */}
              <span
                style={{
                  position: "absolute",
                  fontFamily: "var(--font-display), serif",
                  fontSize: "200px",
                  color: "rgba(28,25,22,0.04)",
                  fontWeight: 300,
                  userSelect: "none",
                  lineHeight: 1,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                숨
              </span>

              {/* Quote */}
              <blockquote
                className="relative z-10 text-center"
                style={{ maxWidth: "300px" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: "clamp(22px, 3vw, 30px)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    color: "var(--bark)",
                    lineHeight: 1.4,
                  }}
                >
                  "Tu rutina de skincare no es solo un paso más — es el momento
                  donde vuelves a conectar contigo misma."
                </p>
                <footer
                  className="mt-6 flex items-center justify-center gap-3"
                >
                  <span
                    className="h-px block"
                    style={{ width: "24px", background: "var(--blush)" }}
                  />
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "var(--warm-gray)" }}
                  >
                    SOOM 숨
                  </span>
                  <span
                    className="h-px block"
                    style={{ width: "24px", background: "var(--blush)" }}
                  />
                </footer>
              </blockquote>
            </div>

            {/* Corner accent */}
            <div
              style={{
                height: "4px",
                background: "linear-gradient(90deg, var(--blush), var(--sage))",
              }}
            />
          </div>
        </div>

        {/* Pillars */}
        <div
          className="grid gap-8 mt-20"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid var(--parchment)",
            paddingTop: "60px",
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(24px)",
            transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s",
          }}
        >
          {pillars.map((p) => (
            <div key={p.num} className="flex flex-col gap-3">
              <span
                className="text-xs tracking-[0.3em]"
                style={{ color: "var(--blush)", fontWeight: 500 }}
              >
                {p.num}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: "28px",
                  fontWeight: 300,
                  color: "var(--bark)",
                }}
              >
                {p.label}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--warm-gray)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          .grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

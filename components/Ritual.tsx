"use client";

import { useRef, useEffect, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
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

const steps = [
  {
    num: "一",
    numKo: "청결",
    label: "Limpiar",
    desc: "Elimina impurezas y maquillaje con una doble limpieza: aceite primero, espuma después.",
    color: "#F0EBE0",
    accent: "#B09060",
  },
  {
    num: "二",
    numKo: "토닝",
    label: "Tonificar",
    desc: "Equilibra el pH y prepara la piel para absorber mejor los activos que siguen.",
    color: "#E8F0E4",
    accent: "#6A8E64",
  },
  {
    num: "三",
    numKo: "트리트먼트",
    label: "Tratar",
    desc: "Aplica sueros concentrados con activos específicos para tus necesidades.",
    color: "#EDE4F0",
    accent: "#8A6E9E",
  },
  {
    num: "四",
    numKo: "수분",
    label: "Hidratar",
    desc: "Sella toda la humedad con una crema que refuerza y nutre la barrera cutánea.",
    color: "#F0E8DC",
    accent: "#B8906A",
  },
  {
    num: "五",
    numKo: "보호",
    label: "Proteger",
    desc: "El paso más importante: protección solar SPF 50+ cada mañana, sin excepción.",
    color: "#FFF0D8",
    accent: "#E08A2A",
  },
];

export default function Ritual() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--linen)",
        padding: "120px 0",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <span
            className="text-xs tracking-[0.3em] uppercase block mb-5"
            style={{ color: "var(--blush)", fontWeight: 500 }}
          >
            El Ritual Coreano
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 68px)",
              fontWeight: 300,
              color: "var(--bark)",
              lineHeight: 1.08,
            }}
          >
            Cinco pasos hacia
            <br />
            <em style={{ fontStyle: "italic", color: "var(--sage-dark)" }}>tu mejor piel</em>
          </h2>
          <span
            className="block mt-6 mx-auto"
            style={{ width: "48px", height: "1px", background: "var(--blush)" }}
          />
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-4 mt-12">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="flex items-center gap-8 group cursor-default"
              style={{
                padding: "28px 36px",
                background: "var(--cream)",
                borderLeft: `3px solid transparent`,
                transition: "all 0.35s ease",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateX(-20px)",
                transitionDelay: inView ? `${i * 0.1 + 0.2}s` : "0s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = step.color;
                el.style.borderLeftColor = step.accent;
                el.style.transform = "translateX(6px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "var(--cream)";
                el.style.borderLeftColor = "transparent";
                el.style.transform = "none";
              }}
            >
              {/* Chinese numeral */}
              <div
                className="flex flex-col items-center flex-shrink-0"
                style={{ width: "48px" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: "32px",
                    fontWeight: 300,
                    color: step.accent,
                    lineHeight: 1,
                    transition: "color 0.3s",
                  }}
                >
                  {step.num}
                </span>
                <span
                  className="text-xs mt-1 tracking-wider"
                  style={{ color: "var(--warm-gray-light)", fontSize: "0.6rem" }}
                >
                  {step.numKo}
                </span>
              </div>

              {/* Step label */}
              <div style={{ minWidth: "130px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: "26px",
                    fontWeight: 400,
                    color: "var(--bark)",
                  }}
                >
                  {step.label}
                </h3>
              </div>

              {/* Divider */}
              <span
                className="hidden md:block flex-shrink-0"
                style={{
                  width: "1px",
                  height: "36px",
                  background: "var(--parchment)",
                }}
              />

              {/* Description */}
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--warm-gray)",
                  lineHeight: 1.75,
                  fontWeight: 300,
                  flex: 1,
                }}
              >
                {step.desc}
              </p>

              {/* Arrow */}
              <svg
                className="hidden md:block flex-shrink-0"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--warm-gray-light)"
                strokeWidth="1"
                style={{ transition: "stroke 0.3s" }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p
          className="text-center mt-12"
          style={{
            fontSize: "0.8rem",
            color: "var(--warm-gray)",
            letterSpacing: "0.08em",
            fontStyle: "italic",
            opacity: inView ? 1 : 0,
            transition: "opacity 0.8s ease 1s",
          }}
        >
          El skincare coreano es constancia, no perfección.
        </p>
      </div>
    </section>
  );
}

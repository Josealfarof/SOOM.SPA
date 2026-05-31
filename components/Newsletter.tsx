"use client";

import { useState, useRef, useEffect } from "react";

function useInView(threshold = 0.2) {
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

export default function Newsletter() {
  const { ref, inView } = useInView(0.15);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      style={{
        background: "var(--sage-dark)",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background 숨 */}
      <div
        style={{
          position: "absolute",
          fontFamily: "var(--font-display), serif",
          fontSize: "clamp(200px, 40vw, 500px)",
          fontWeight: 300,
          color: "rgba(255,255,255,0.025)",
          right: "-5%",
          top: "50%",
          transform: "translateY(-50%)",
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        숨
      </div>

      {/* Gradient accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.35), rgba(255,255,255,0.1))",
        }}
      />

      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "0 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Eyebrow */}
        <div
          className="flex items-center gap-4 mb-8 justify-center"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.8s ease 0.1s",
          }}
        >
          <span
            style={{ width: "32px", height: "1px", background: "var(--blush)", display: "block" }}
          />
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--blush)", fontWeight: 500 }}
          >
            Muy pronto
          </span>
          <span
            style={{ width: "32px", height: "1px", background: "var(--blush)", display: "block" }}
          />
        </div>

        {/* Heading */}
        <h2
          className="text-center"
          style={{
            fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
            fontSize: "clamp(40px, 6vw, 76px)",
            fontWeight: 300,
            color: "white",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(24px)",
            transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s",
          }}
        >
          Sé la primera
          <br />
          <em style={{ fontStyle: "italic", color: "var(--blush)" }}>en descubrirlo</em>
        </h2>

        {/* Subtitle */}
        <p
          className="text-center mt-6 leading-loose"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.9rem",
            fontWeight: 300,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(16px)",
            transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.35s",
          }}
        >
          Únete a nuestra lista de espera y recibe acceso anticipado,
          descuentos exclusivos y los rituales de belleza asiática directamente
          en tu correo.
        </p>

        {/* Form */}
        <div
          className="mt-12"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(16px)",
            transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s",
          }}
        >
          {submitted ? (
            <div
              className="text-center py-8 flex flex-col items-center gap-4"
            >
              <span
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: "48px",
                  color: "var(--blush)",
                }}
              >
                숨
              </span>
              <p
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: "24px",
                  fontWeight: 300,
                  color: "white",
                  fontStyle: "italic",
                }}
              >
                ¡Bienvenida a la familia SOOM!
              </p>
              <p
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Te avisaremos antes que nadie. 🌿
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                className="input-email flex-1"
                style={{ fontSize: "0.875rem" }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{
                  background: "var(--blush)",
                  borderColor: "var(--blush)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                Unirme
              </button>
            </form>
          )}
        </div>

        {/* Fine print */}
        {!submitted && (
          <p
            className="text-center mt-5"
            style={{
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.06em",
              opacity: inView ? 1 : 0,
              transition: "opacity 0.8s ease 0.7s",
            }}
          >
            Sin spam. Solo skincare que transforma. Puedes cancelar cuando quieras.
          </p>
        )}

        {/* Korean brands row */}
        <div
          className="flex items-center justify-center gap-8 mt-16 flex-wrap"
          style={{
            opacity: inView ? 0.35 : 0,
            transition: "opacity 0.8s ease 0.9s",
          }}
        >
          {["COREA", "JAPÓN", "CHINA", "TAIWÁN"].map((c, i) => (
            <span
              key={c}
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "white", fontWeight: 300 }}
            >
              {c}
              {i < 3 && (
                <span style={{ marginLeft: "8px", color: "var(--blush)" }}>·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

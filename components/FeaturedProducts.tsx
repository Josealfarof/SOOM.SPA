"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { featuredProducts } from "@/lib/products";
import ImageCarousel from "@/components/ImageCarousel";

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

export default function FeaturedProducts() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      ref={ref}
      style={{ background: "var(--cream)", padding: "120px 0" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div>
            <span
              className="text-xs tracking-[0.3em] uppercase block mb-4"
              style={{ color: "var(--blush)", fontWeight: 500 }}
            >
              Productos Destacados
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                fontSize: "clamp(34px, 4.5vw, 60px)",
                fontWeight: 300,
                color: "var(--bark)",
                lineHeight: 1.1,
              }}
            >
              Los favoritos
              <br />
              <em style={{ fontStyle: "italic", color: "var(--sage-dark)" }}>de la temporada</em>
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="btn-outline self-start sm:self-auto"
            style={{ whiteSpace: "nowrap" }}
          >
            Ver Todo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Products grid */}
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {featuredProducts.map((product, i) => (
            <Link
              key={product.id}
              href="/catalogo"
              className="product-card block"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(32px)",
                transition: `all 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 0.15 + 0.2}s`,
              }}
            >
              {/* Image carousel */}
              <div className="relative">
                <ImageCarousel images={product.images} alt={product.name} />

                {/* Tag */}
                {product.tag && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "var(--bark)",
                      color: "var(--cream)",
                      fontSize: "0.58rem",
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      zIndex: 4,
                    }}
                  >
                    {product.tag}
                  </div>
                )}

                {/* Category overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "28px 14px 10px",
                    background: "linear-gradient(to top, rgba(28,25,22,0.5) 0%, transparent 100%)",
                    pointerEvents: "none",
                    zIndex: 1,
                  }}
                >
                  <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>
                    {product.category}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div
                className="p-5"
                style={{ background: "var(--linen)" }}
              >
                <p
                  className="text-xs tracking-widest mb-1"
                  style={{ color: "var(--blush)", textTransform: "uppercase", fontWeight: 600, fontSize: "0.58rem", letterSpacing: "0.2em" }}
                >
                  {product.brand}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: "22px",
                    fontWeight: 400,
                    color: "var(--bark)",
                    lineHeight: 1.2,
                  }}
                >
                  {product.name}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--warm-gray)", fontWeight: 300, fontSize: "0.82rem" }}
                >
                  {product.description.substring(0, 90)}...
                </p>
                <div className="flex items-center justify-end mt-4">
                  <span
                    className="text-xs tracking-widest"
                    style={{ color: "var(--sage-dark)", fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
                  >
                    Ver más →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile: single column */}
      <style jsx>{`
        @media (max-width: 900px) {
          .grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 580px) {
          .grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

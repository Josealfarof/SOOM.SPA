"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import {
  products,
  categories,
  tipoPielOptions,
  concernOptions,
  ProductCategory,
  TipoPielFilter,
  ConcernFilter,
  Product,
} from "@/lib/products";
import ProductModal from "@/components/ProductModal";

export default function CatalogoPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("Todos");
  const [activeTipoPiel, setActiveTipoPiel] = useState<TipoPielFilter>("Todas");
  const [activeConcern, setActiveConcern] = useState<ConcernFilter>("Todos");
  const [sortBy, setSortBy] = useState<"default" | "brand-az" | "brand-za" | "price-asc" | "price-desc">("default");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = products
    .filter((p) => activeCategory === "Todos" || p.category === activeCategory)
    .filter((p) => {
      if (activeTipoPiel === "Todas") return true;
      if (!p.tipoPiel) return true;
      if (p.tipoPiel === "Todo tipo") return true;
      return p.tipoPiel.toLowerCase().includes(activeTipoPiel.toLowerCase());
    })
    .filter((p) => {
      if (activeConcern === "Todos") return true;
      if (!p.concern) return true;
      return p.concern.toLowerCase().includes(activeConcern.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === "brand-az") return a.brand.localeCompare(b.brand);
      if (sortBy === "brand-za") return b.brand.localeCompare(a.brand);
      if (sortBy === "price-asc") return (a.price ?? 0) - (b.price ?? 0);
      if (sortBy === "price-desc") return (b.price ?? 0) - (a.price ?? 0);
      return a.id - b.id;
    });

  const filterLabelStyle: React.CSSProperties = {
    fontSize: "0.58rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--warm-gray)",
    fontWeight: 600,
    marginBottom: "10px",
    display: "block",
  };

  return (
    <>
      <Navbar />

      {/* Page header */}
      <header
        style={{
          background: "var(--sage-dark)",
          paddingTop: "140px",
          paddingBottom: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            fontFamily: "var(--font-display), serif",
            fontSize: "clamp(160px, 30vw, 400px)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.025)",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            userSelect: "none",
            pointerEvents: "none",
            lineHeight: 1,
          }}
        >
          숨
        </div>
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
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 40px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span
              style={{ width: "32px", height: "1px", background: "var(--blush)", display: "block" }}
            />
            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--blush)",
                fontWeight: 500,
              }}
            >
              East Asian Skincare
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
              fontSize: "clamp(48px, 8vw, 100px)",
              fontWeight: 300,
              color: "white",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
            }}
          >
            Catálogo
            <br />
            <em style={{ fontStyle: "italic", color: "var(--blush)" }}>SOOM 숨</em>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              marginTop: "20px",
              fontSize: "0.9rem",
              fontWeight: 300,
              maxWidth: "400px",
              lineHeight: 1.8,
            }}
          >
            {filtered.length} producto{filtered.length !== 1 ? "s" : ""} de la mejor belleza asiática
          </p>
        </div>
      </header>

      {/* Filters + products */}
      <main style={{ background: "var(--cream)", minHeight: "60vh" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "60px 40px 100px",
          }}
        >
          {/* Filter bar */}
          <div
            style={{
              paddingBottom: "32px",
              borderBottom: "1px solid var(--parchment)",
              marginBottom: "48px",
            }}
          >
            {/* Top row: filters + sort */}
            <div className="flex items-start justify-between gap-8 flex-col lg:flex-row">
              {/* All filter groups */}
              <div style={{ flex: 1 }}>
                {/* Categoría */}
                <div style={{ marginBottom: "20px" }}>
                  <span style={filterLabelStyle}>Categoría</span>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`filter-tab${activeCategory === cat ? " active" : ""}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tipo de Piel */}
                <div style={{ marginBottom: "20px" }}>
                  <span style={filterLabelStyle}>Tipo de Piel</span>
                  <div className="flex flex-wrap gap-2">
                    {tipoPielOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setActiveTipoPiel(opt)}
                        className={`filter-tab${activeTipoPiel === opt ? " active" : ""}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Objetivo */}
                <div>
                  <span style={filterLabelStyle}>Objetivo</span>
                  <div className="flex flex-wrap gap-2">
                    {concernOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setActiveConcern(opt)}
                        className={`filter-tab${activeConcern === opt ? " active" : ""}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sort + reset */}
              <div className="flex flex-col gap-3 flex-shrink-0">
                <span style={filterLabelStyle}>Ordenar</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--parchment)",
                    padding: "7px 28px 7px 12px",
                    fontSize: "0.75rem",
                    color: "var(--bark)",
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                    outline: "none",
                    fontFamily: "var(--font-body)",
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239A9490' strokeWidth='1.5' fill='none'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 10px center",
                  }}
                >
                  <option value="default">Destacados</option>
                  <option value="brand-az">Marca: A → Z</option>
                  <option value="brand-za">Marca: Z → A</option>
                  <option value="price-asc">Precio: menor a mayor</option>
                  <option value="price-desc">Precio: mayor a menor</option>
                </select>

                {/* Reset filters */}
                {(activeCategory !== "Todos" || activeTipoPiel !== "Todas" || activeConcern !== "Todos") && (
                  <button
                    onClick={() => {
                      setActiveCategory("Todos");
                      setActiveTipoPiel("Todas");
                      setActiveConcern("Todos");
                    }}
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--blush)",
                      fontWeight: 500,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px 0",
                      textAlign: "left",
                    }}
                  >
                    × Limpiar filtros
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Products grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-24">
              <span
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: "80px",
                  color: "var(--parchment)",
                  fontWeight: 300,
                }}
              >
                숨
              </span>
              <p style={{ color: "var(--warm-gray)", fontSize: "0.9rem" }}>
                No hay productos con estos filtros.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("Todos");
                  setActiveTipoPiel("Todas");
                  setActiveConcern("Todos");
                }}
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--blush)",
                  fontWeight: 500,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "28px",
              }}
            >
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                  style={{
                    animation: `revealUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards`,
                    animationDelay: `${i * 0.07}s`,
                    opacity: 0,
                  }}
                />
              ))}
            </div>
          )}

          {/* Bottom note */}
          <div className="text-center mt-20 flex flex-col items-center gap-4">
            <span
              style={{
                width: "1px",
                height: "48px",
                background: "var(--parchment)",
                display: "block",
              }}
            />
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--warm-gray)",
                fontStyle: "italic",
                letterSpacing: "0.06em",
              }}
            >
              Nuevos productos se añaden regularmente. Suscríbete para ser la primera en saberlo.
            </p>
          </div>
        </div>
      </main>

      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}

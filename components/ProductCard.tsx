"use client";

import { Product } from "@/lib/products";
import ImageCarousel from "@/components/ImageCarousel";

interface Props {
  product: Product;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function ProductCard({ product, style, onClick }: Props) {
  return (
    <div
      className="product-card"
      style={{ ...style, cursor: "pointer" }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick?.(); }}
      aria-label={`Ver detalles de ${product.name}`}
    >
      {/* Image / Carousel */}
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
              zIndex: 3,
              pointerEvents: "none",
            }}
          >
            {product.tag}
          </div>
        )}

        {/* Category gradient overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "24px 14px 10px",
            background: "linear-gradient(to top, rgba(28,25,22,0.5) 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {product.category}
          </p>
        </div>
      </div>

      {/* Info */}
      <div
        style={{
          padding: "16px 18px 18px",
          background: "var(--cream)",
          borderBottom: "2px solid var(--parchment)",
          transition: "border-color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderBottomColor = "var(--blush)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderBottomColor = "var(--parchment)";
        }}
      >
        {/* Brand */}
        <p
          style={{
            fontSize: "0.58rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--blush)",
            fontWeight: 600,
            marginBottom: "4px",
          }}
        >
          {product.brand}
        </p>

        {/* Name */}
        <h3
          style={{
            fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
            fontSize: "19px",
            fontWeight: 400,
            color: "var(--bark)",
            lineHeight: 1.25,
          }}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p
          style={{
            marginTop: "8px",
            fontSize: "0.775rem",
            color: "var(--warm-gray)",
            lineHeight: 1.75,
            fontWeight: 300,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </p>

        {/* Price + store */}
        <div className="flex items-center justify-between mt-4 pt-3"
          style={{ borderTop: "1px solid var(--linen)" }}>
          <span
            style={{
              fontSize: "0.85rem",
              letterSpacing: "0.02em",
              color: "var(--bark)",
              fontWeight: 600,
            }}
          >
            {product.price
              ? `$${product.price.toLocaleString("es-CL")}`
              : ""}
          </span>
          {product.size && (
            <span
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--warm-gray-light)",
                fontWeight: 400,
              }}
            >
              {product.size}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

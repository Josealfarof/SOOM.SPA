"use client";

import { useState, useCallback } from "react";
import { imgSrc } from "@/lib/products";

interface Props {
  images: string[];
  alt: string;
  aspectRatio?: string;
}

export default function ImageCarousel({ images, alt, aspectRatio = "3/4" }: Props) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrent((c) => (c - 1 + images.length) % images.length);
    },
    [images.length]
  );

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrent((c) => (c + 1) % images.length);
    },
    [images.length]
  );

  const goTo = useCallback((e: React.MouseEvent, i: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent(i);
  }, []);

  if (images.length === 0) return null;

  const single = images.length === 1;

  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ aspectRatio, background: "var(--linen)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Images */}
      {images.map((src, i) => (
        <img
          key={i}
          src={imgSrc(src)}
          alt={`${alt} ${i + 1}`}
          loading={i === 0 ? "eager" : "lazy"}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Prev/Next arrows — only if multiple images */}
      {!single && (
        <>
          <button
            onClick={prev}
            aria-label="Anterior"
            style={{
              position: "absolute",
              left: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "28px",
              height: "28px",
              background: "rgba(255,255,255,0.88)",
              border: "none",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 2,
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.25s ease",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--bark)" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Siguiente"
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "28px",
              height: "28px",
              background: "rgba(255,255,255,0.88)",
              border: "none",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 2,
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.25s ease",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--bark)" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {!single && images.length <= 8 && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "5px",
            zIndex: 2,
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => goTo(e, i)}
              aria-label={`Imagen ${i + 1}`}
              style={{
                width: i === current ? "16px" : "5px",
                height: "5px",
                borderRadius: "3px",
                background: i === current ? "white" : "rgba(255,255,255,0.5)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </div>
      )}

      {/* Image counter for many images */}
      {!single && images.length > 8 && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            background: "rgba(28,25,22,0.55)",
            color: "white",
            fontSize: "0.6rem",
            padding: "3px 7px",
            letterSpacing: "0.08em",
            zIndex: 2,
          }}
        >
          {current + 1}/{images.length}
        </div>
      )}
    </div>
  );
}

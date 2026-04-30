"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Product, imgSrc } from "@/lib/products";

// ── How-to-use generator ──────────────────────────────────────────────────────

type HowToUse = {
  moment: "AM" | "PM" | "AM + PM" | "Semanal";
  position: string;
  steps: string[];
};

function getHowToUse(product: Product): HowToUse {
  const cat = product.category;
  const tipo = (product.tipoProducto ?? "").toLowerCase();
  const name = product.name.toLowerCase();

  if (cat === "Limpiadores") {
    if (tipo.includes("oil") || tipo.includes("bálsamo") || tipo.includes("balm") || name.includes("oil")) {
      return {
        moment: "PM",
        position: "Paso 1 · Doble limpieza",
        steps: [
          "Aplica sobre el rostro completamente seco, sin agua.",
          "Masajea en movimientos circulares para disolver maquillaje y SPF.",
          "Añade unas gotas de agua para emulsionar hasta textura lechosa.",
          "Enjuaga bien y continúa con tu limpiador en espuma o gel.",
        ],
      };
    }
    return {
      moment: "AM + PM",
      position: "Paso 1 · Limpieza",
      steps: [
        "Moja el rostro con agua tibia.",
        "Aplica una pequeña cantidad y forma espuma entre las manos.",
        "Masajea en movimientos circulares durante 30–60 segundos.",
        "Enjuaga completamente con agua tibia y seca con toquecitos suaves.",
      ],
    };
  }

  if (cat === "Tónicos") {
    return {
      moment: "AM + PM",
      position: "Paso 2 · Tónico",
      steps: [
        "Aplica inmediatamente después del limpiador.",
        "Vierte en las palmas o en un algodón.",
        "Presiona suavemente sobre toda la cara y cuello.",
        "Da golpecitos suaves (patting) hasta absorción completa. No enjuagues.",
      ],
    };
  }

  if (cat === "Sueros") {
    return {
      moment: "AM + PM",
      position: "Paso 3 · Sérum",
      steps: [
        "Aplica después del tónico, sobre la piel limpia y absorta.",
        "Vierte 2–3 gotas en las yemas de los dedos.",
        "Presiona con movimientos de patting cubriendo todo el rostro.",
        "Espera 1–2 minutos antes de continuar con el hidratante.",
      ],
    };
  }

  if (cat === "Hidratantes") {
    return {
      moment: "AM + PM",
      position: "Paso 4 · Hidratante",
      steps: [
        "Aplica como penúltimo paso (antes del protector solar en AM).",
        "Toma una cantidad del tamaño de un garbanzo y calienta entre palmas.",
        "Presiona sobre el rostro, luego extiende hacia afuera y hacia arriba.",
        "Incluye cuello y escote. Masajea el exceso hacia las sienes.",
      ],
    };
  }

  if (cat === "Mascarillas & Pads") {
    if (tipo.includes("pad")) {
      return {
        moment: "AM + PM",
        position: "Paso 2 · Exfoliante / Tónico",
        steps: [
          "Usa después del limpiador, en lugar del tónico.",
          "Pasa el lado texturizado en movimientos suaves por el rostro.",
          "Voltea al lado suave para distribuir el exceso de esencia.",
          "No enjuagues. Continúa con sérum e hidratante.",
        ],
      };
    }
    if (tipo.includes("modeling")) {
      return {
        moment: "Semanal",
        position: "Ritual semanal · Modeling mask",
        steps: [
          "Limpia el rostro a fondo antes de comenzar.",
          "Mezcla los dos componentes hasta obtener una pasta uniforme.",
          "Aplica rápidamente en capa gruesa con espátula o manos.",
          "Deja solidificar 15–20 min. Retira como un solo molde sin enjuagar.",
        ],
      };
    }
    if (name.includes("patch") || name.includes("parche")) {
      return {
        moment: "PM",
        position: "Spot · Tratamiento de acné",
        steps: [
          "Limpia y seca completamente la zona afectada.",
          "Despega el parche y aplica directamente sobre el grano.",
          "Presiona suavemente y deja actuar 6–8 horas (ideal de noche).",
          "Retira con cuidado y descarta. Un parche por uso.",
        ],
      };
    }
    if (name.includes("sleep") || name.includes("night") || name.includes("noche")) {
      return {
        moment: "PM",
        position: "Último paso · Mascarilla nocturna",
        steps: [
          "Aplica como último paso de tu rutina nocturna.",
          "Extiende una capa generosa y uniforme por el rostro.",
          "Deja actuar toda la noche mientras el activo trabaja.",
          "Por la mañana, enjuaga con agua tibia y continúa tu rutina.",
        ],
      };
    }
    return {
      moment: "Semanal",
      position: "Ritual semanal · Mascarilla",
      steps: [
        "Limpia y tonifica el rostro antes de aplicar.",
        "Aplica y ajusta bien la mascarilla al contorno del rostro.",
        "Deja actuar 15–20 minutos. Aplica el exceso en cuello.",
        "Retira y presiona el líquido restante como si fuera sérum.",
      ],
    };
  }

  if (cat === "Protección Solar") {
    return {
      moment: "AM",
      position: "Último paso AM · Protección solar",
      steps: [
        "Aplica como último paso de tu rutina matutina, sobre el hidratante.",
        "Toma una cantidad generosa (aprox. ¼ cucharadita para el rostro).",
        "Distribuye uniformemente por cara, cuello y orejas.",
        "Reapl ica cada 2 horas si estás bajo el sol directo.",
      ],
    };
  }

  if (cat === "Sets & Kits") {
    return {
      moment: "AM + PM",
      position: "Rutina completa",
      steps: [
        "Sigue el orden indicado en el kit para mejores resultados.",
        "Comienza con el limpiador y aplica de menor a mayor consistencia.",
        "Espera unos segundos entre cada producto para asegurar la absorción.",
        "Finaliza con el hidratante o el producto más rico del set.",
      ],
    };
  }

  if (cat === "Cabello") {
    return {
      moment: "Semanal",
      position: "Tratamiento capilar",
      steps: [
        "Lava el cabello con tu champú habitual.",
        "Aplica el tratamiento de medios a puntas, evitando la raíz.",
        "Deja actuar 5–10 minutos bajo calor o con gorro de ducha.",
        "Enjuaga bien con agua tibia. Usa 1–2 veces por semana.",
      ],
    };
  }

  return {
    moment: "AM + PM",
    position: "Rutina diaria",
    steps: [
      "Aplica sobre el rostro limpio.",
      "Sigue las instrucciones específicas del producto.",
      "Integra en tu rutina de skincare habitual.",
      "Usa de forma constante para obtener resultados visibles.",
    ],
  };
}

// ── Routine step indicator ────────────────────────────────────────────────────

const ROUTINE_STEPS = [
  { key: "Limpiadores", label: "Limpieza" },
  { key: "Tónicos", label: "Tónico" },
  { key: "Sueros", label: "Sérum" },
  { key: "Hidratantes", label: "Hidratante" },
  { key: "Protección Solar", label: "SPF" },
];

const MOMENT_COLORS: Record<string, string> = {
  AM: "#889E82",
  PM: "#1C1916",
  "AM + PM": "#B8846E",
  Semanal: "#C4A89A",
};

// ── Modal component ───────────────────────────────────────────────────────────

interface Props {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
  const [activeImg, setActiveImg] = useState(0);
  const [mounted, setMounted] = useState(false);
  const howToUse = getHowToUse(product);
  const routineIndex = ROUTINE_STEPS.findIndex((s) => s.key === product.category);

  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        setActiveImg((i) => (i - 1 + product.images.length) % product.images.length);
      if (e.key === "ArrowRight")
        setActiveImg((i) => (i + 1) % product.images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, product.images.length]);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(28,25,22,0.78)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        animation: "revealFade 0.25s ease forwards",
      }}
      onClick={onClose}
    >
      <div
        className="modal-inner"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--cream)",
          width: "100%",
          maxWidth: "1040px",
          maxHeight: "92vh",
          position: "relative",
          overflow: "hidden",
          animation: "modalSlideUp 0.4s cubic-bezier(0.22,1,0.36,1) forwards",
          boxShadow: "0 40px 80px rgba(28,25,22,0.4)",
        }}
      >
        {/* ── Gallery ──────────────────────────────────────── */}
        <div
          className="modal-gallery"
          style={{
            display: "flex",
            flexDirection: "column",
            background: "var(--linen)",
          }}
        >
          {/* Main image */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden", minHeight: "360px" }}>
            {product.images.map((src, i) => (
              <img
                key={i}
                src={imgSrc(src)}
                alt={`${product.name} ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: i === activeImg ? 1 : 0,
                  transition: "opacity 0.35s ease",
                  pointerEvents: "none",
                }}
              />
            ))}

            {/* Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImg((i) => (i - 1 + product.images.length) % product.images.length)}
                  aria-label="Imagen anterior"
                  style={arrowBtn("left")}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--bark)" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveImg((i) => (i + 1) % product.images.length)}
                  aria-label="Imagen siguiente"
                  style={arrowBtn("right")}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--bark)" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            {/* Counter */}
            {product.images.length > 1 && (
              <div style={{
                position: "absolute", bottom: "12px", right: "12px",
                background: "rgba(28,25,22,0.52)", color: "white",
                fontSize: "0.58rem", padding: "3px 8px", letterSpacing: "0.1em",
              }}>
                {activeImg + 1} / {product.images.length}
              </div>
            )}

            {/* Tag */}
            {product.tag && (
              <div style={{
                position: "absolute", top: "14px", left: "14px",
                background: "var(--bark)", color: "var(--cream)",
                fontSize: "0.55rem", fontWeight: 700,
                letterSpacing: "0.16em", textTransform: "uppercase",
                padding: "4px 10px",
              }}>
                {product.tag}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div style={{
              display: "flex",
              gap: "4px",
              padding: "8px",
              overflowX: "auto",
              flexShrink: 0,
              background: "var(--linen)",
            }}>
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  aria-label={`Ver imagen ${i + 1}`}
                  style={{
                    flexShrink: 0,
                    width: "56px",
                    height: "56px",
                    padding: 0,
                    border: `2px solid ${i === activeImg ? "var(--bark)" : "transparent"}`,
                    cursor: "pointer",
                    background: "none",
                    overflow: "hidden",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <img
                    src={imgSrc(src)}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Info panel ───────────────────────────────────── */}
        <div className="modal-info">
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Cerrar"
            style={{
              position: "absolute", top: "14px", right: "14px",
              width: "34px", height: "34px",
              background: "none", border: "1px solid var(--parchment)",
              cursor: "pointer", zIndex: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--warm-gray)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget;
              b.style.background = "var(--bark)";
              b.style.borderColor = "var(--bark)";
              b.style.color = "white";
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget;
              b.style.background = "none";
              b.style.borderColor = "var(--parchment)";
              b.style.color = "var(--warm-gray)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Brand */}
          <p style={{
            fontSize: "0.58rem", letterSpacing: "0.32em",
            textTransform: "uppercase", color: "var(--blush)",
            fontWeight: 600, marginBottom: "6px",
          }}>
            {product.brand}
          </p>

          {/* Name */}
          <h2 style={{
            fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
            fontSize: "clamp(20px, 2.6vw, 28px)",
            fontWeight: 400, color: "var(--bark)",
            lineHeight: 1.18, marginBottom: "18px",
          }}>
            {product.name}
          </h2>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
            <Tag type="category">{product.category}</Tag>
            {product.tipoPiel && <Tag type="skin">{product.tipoPiel}</Tag>}
            {product.concern && <Tag type="concern">{product.concern}</Tag>}
          </div>

          {/* Price + size */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "24px" }}>
            {product.price != null && (
              <span style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--bark)", letterSpacing: "0.01em" }}>
                ${product.price.toLocaleString("es-CL")}
              </span>
            )}
            {product.size && (
              <span style={{ fontSize: "0.68rem", color: "var(--warm-gray-light)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {product.size}
              </span>
            )}
          </div>

          <Divider />

          {/* Description */}
          <p style={{
            fontSize: "0.875rem", color: "var(--warm-gray)",
            lineHeight: 1.85, fontWeight: 300, marginBottom: "28px",
          }}>
            {product.description}
          </p>

          <Divider />

          {/* Cómo usar */}
          <section style={{ marginBottom: "24px" }}>
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between", flexWrap: "wrap",
              gap: "8px", marginBottom: "20px",
            }}>
              <h3 style={{
                fontSize: "0.6rem", letterSpacing: "0.3em",
                textTransform: "uppercase", color: "var(--bark)", fontWeight: 600,
              }}>
                Cómo usar
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{
                  fontSize: "0.56rem", letterSpacing: "0.15em",
                  textTransform: "uppercase", color: "white",
                  background: MOMENT_COLORS[howToUse.moment],
                  padding: "3px 9px", fontWeight: 700,
                }}>
                  {howToUse.moment}
                </span>
                <span style={{
                  fontSize: "0.6rem", letterSpacing: "0.06em",
                  color: "var(--warm-gray)", fontStyle: "italic",
                }}>
                  {howToUse.position}
                </span>
              </div>
            </div>

            <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "13px" }}>
              {howToUse.steps.map((step, i) => (
                <li key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <span style={{
                    flexShrink: 0,
                    width: "22px", height: "22px",
                    border: "1px solid var(--blush)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.6rem", fontWeight: 700,
                    color: "var(--blush)", letterSpacing: "0.02em",
                  }}>
                    {i + 1}
                  </span>
                  <p style={{
                    fontSize: "0.82rem", color: "var(--bark)",
                    lineHeight: 1.72, fontWeight: 300, margin: 0, paddingTop: "2px",
                  }}>
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* Routine position indicator */}
          {routineIndex >= 0 && (
            <>
              <Divider />
              <div>
                <p style={{
                  fontSize: "0.56rem", letterSpacing: "0.24em",
                  textTransform: "uppercase", color: "var(--warm-gray)",
                  fontWeight: 600, marginBottom: "12px",
                }}>
                  Posición en tu rutina
                </p>
                <div style={{ display: "flex", gap: "3px" }}>
                  {ROUTINE_STEPS.map((step, i) => (
                    <div key={step.key} style={{ flex: 1, textAlign: "center" }}>
                      <div style={{
                        height: "3px",
                        background: i === routineIndex ? "var(--blush)" : "var(--parchment)",
                        marginBottom: "7px",
                      }} />
                      <p style={{
                        fontSize: "0.5rem", letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: i === routineIndex ? "var(--bark)" : "var(--warm-gray-light)",
                        fontWeight: i === routineIndex ? 700 : 400,
                        margin: 0,
                      }}>
                        {step.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>,
    document.body
  );
}

// ── Helper components ─────────────────────────────────────────────────────────

function Divider() {
  return (
    <div style={{ width: "100%", height: "1px", background: "var(--parchment)", margin: "0 0 24px" }} />
  );
}

function Tag({ children, type }: { children: React.ReactNode; type: "category" | "skin" | "concern" }) {
  const styles: Record<string, React.CSSProperties> = {
    category: { borderColor: "var(--parchment)", color: "var(--warm-gray)" },
    skin:     { borderColor: "var(--blush)",     color: "var(--blush)" },
    concern:  { borderColor: "var(--sage)",      color: "var(--sage-dark)" },
  };
  return (
    <span style={{
      fontSize: "0.56rem", letterSpacing: "0.15em",
      textTransform: "uppercase", fontWeight: 500,
      padding: "4px 10px", border: "1px solid",
      ...styles[type],
    }}>
      {children}
    </span>
  );
}

function arrowBtn(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    [side]: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "34px", height: "34px",
    background: "rgba(250,246,240,0.92)",
    border: "none", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", zIndex: 2,
    boxShadow: "0 2px 10px rgba(0,0,0,0.14)",
  };
}

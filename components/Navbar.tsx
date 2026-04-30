"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/catalogo", label: "Catálogo" },
    { href: "#nosotras", label: "Nosotras" },
  ];

  const navBg =
    isHome && !scrolled
      ? "bg-transparent"
      : "bg-cream/95 backdrop-blur-sm border-b border-parchment/60";

  const textColor =
    isHome && !scrolled ? "text-white" : "text-bark";

  const logoColor =
    isHome && !scrolled ? "text-white" : "text-bark";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
        style={{ color: isHome && !scrolled ? "white" : "var(--bark)" }}
      >
        <div
          className="max-w-screen-xl mx-auto px-6 md:px-10 flex items-center justify-between"
          style={{ height: scrolled ? "64px" : "80px", transition: "height 0.4s ease" }}
        >
          {/* Logo */}
          <Link href="/" className="flex flex-col items-center leading-none group">
            <span
              className="block text-sm tracking-widest transition-colors duration-300"
              style={{
                fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                color: isHome && !scrolled ? "rgba(255,255,255,0.9)" : "var(--bark)",
              }}
            >
              숨
            </span>
            <span
              className="block text-xl tracking-[0.22em] font-light transition-colors duration-300"
              style={{
                fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                color: isHome && !scrolled ? "white" : "var(--bark)",
                letterSpacing: "0.28em",
              }}
            >
              SOOM
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative text-xs tracking-[0.18em] uppercase font-medium group transition-colors duration-300"
                style={{
                  color: isHome && !scrolled ? "rgba(255,255,255,0.85)" : "var(--warm-gray)",
                }}
              >
                {label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px bg-blush transition-all duration-300"
                  style={{
                    width: pathname === href ? "100%" : "0",
                  }}
                />
                <span
                  className="absolute -bottom-0.5 left-0 h-px bg-blush transition-all duration-300 group-hover:w-full"
                  style={{ width: "0" }}
                />
              </Link>
            ))}
            <Link href="/catalogo" className="btn-primary text-xs py-3 px-7"
              style={
                isHome && !scrolled
                  ? {
                      background: "rgba(255,255,255,0.15)",
                      borderColor: "rgba(255,255,255,0.5)",
                      color: "white",
                    }
                  : {}
              }
            >
              Tienda
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-px w-6 transition-all duration-300"
                style={{
                  background: isHome && !scrolled ? "white" : "var(--bark)",
                  transform:
                    menuOpen
                      ? i === 0
                        ? "rotate(45deg) translate(5px, 5px)"
                        : i === 1
                        ? "scaleX(0)"
                        : "rotate(-45deg) translate(5px, -5px)"
                      : "none",
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col transition-all duration-500"
        style={{
          background: "var(--cream)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-8 pt-20 pb-12">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-4xl font-light tracking-widest"
              style={{
                fontFamily: "var(--font-display), serif",
                color: "var(--bark)",
              }}
            >
              {label}
            </Link>
          ))}
          <div className="mt-4">
            <Link href="/catalogo" className="btn-primary">
              Ver Tienda
            </Link>
          </div>
        </div>
        <p
          className="text-center text-xs pb-8 tracking-widest uppercase"
          style={{ color: "var(--warm-gray)" }}
        >
          숨 · Respira · Conecta
        </p>
      </div>
    </>
  );
}

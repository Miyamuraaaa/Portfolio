"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#journey", label: "Journey" },
  { href: "#worksheets", label: "Worksheets" },
  { href: "#responses", label: "Responses" },
  { href: "#icare", label: "iCARE" },
  { href: "#reflection", label: "Reflection" },
];

export default function Navbar() {
  const pathname = usePathname();
  const anchor = (hash: string) => pathname === "/" ? hash : "/" + hash;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      let current = "#home";
      for (const link of navLinks) {
        const section = document.getElementById(link.href.slice(1));
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.3) current = link.href;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    const frame = requestAnimationFrame(handleScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <Link
          href="/"
          className="nav-brand hover:text-accent transition-colors"
          data-cursor="link"
        >
          <span className="brand-mark" aria-hidden="true">B<span>.</span></span>
          <span>GED0001<span className="block text-[9px] tracking-[0.18em] text-foreground/60">READING PORTFOLIO</span></span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={anchor(link.href)}
              className="nav-section-link relative text-sm font-medium text-foreground/70 hover:text-foreground transition-colors group"
              aria-current={pathname === "/" && active === link.href ? "location" : undefined}
              data-cursor="link"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </a>
          ))}
          <a
            href={anchor("#projects")}
            className="text-xs font-medium px-4 py-3 border border-foreground/25 hover:border-accent transition-all duration-300"
            data-cursor="link"
          >
            Explore Portfolio
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden relative z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onKeyDown={(event) => { if (event.key === "Escape") setIsOpen(false); }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              id="mobile-navigation"
              onKeyDown={(event) => { if (event.key === "Escape") setIsOpen(false); }}
              className="fixed top-0 right-0 h-dvh w-72 bg-background border-l border-border z-40 p-8 pt-24 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={anchor(link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="nav-section-link text-lg font-medium text-foreground/70 hover:text-accent transition-colors"
                    aria-current={pathname === "/" && active === link.href ? "location" : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href={anchor("#projects")}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="text-lg font-medium text-accent"
                >
                  Explore Portfolio
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

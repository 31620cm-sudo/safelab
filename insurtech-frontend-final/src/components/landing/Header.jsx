import React, { useEffect, useState } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { BRAND, HEADER_MENUS } from '../../data/landing';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md transition-all border-b ${
        scrolled
          ? 'bg-white/80 border-black/5 shadow-[0_2px_20px_-12px_rgba(0,0,0,0.18)]'
          : 'bg-white/60 border-transparent'
      }`}
    >
      <nav
        className="mx-auto max-w-7xl px-5 md:px-8 h-16 md:h-20 flex items-center justify-between"
        aria-label="주 메뉴"
      >
        <a href="#hero" className="flex items-center gap-2 group" aria-label={BRAND.name + ' 홈'}>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-primary text-white shadow-glow transition group-hover:scale-105">
            <ShieldCheck size={18} strokeWidth={2.4} />
          </span>
          <span className="font-display font-extrabold text-lg tracking-tight">
            {BRAND.name}
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {HEADER_MENUS.slice(0, 3).map((m) => (
            <li key={m.label}>
              <a
                href={m.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-text-primary/80 hover:text-brand-primary hover:bg-brand-primary/5 transition"
              >
                {m.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="#contact"
            className="inline-flex items-center gap-1 rounded-full bg-brand-primary text-white px-5 py-2 text-sm font-semibold shadow-glow transition hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
          >
            문의하기
          </a>
        </div>

        <button
          type="button"
          aria-label="메뉴 열기"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 bg-white/80"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-black/5 bg-white/95 backdrop-blur">
          <ul className="px-5 py-4 flex flex-col gap-1">
            {HEADER_MENUS.map((m) => (
              <li key={m.label}>
                <a
                  href={m.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 rounded-xl text-sm font-medium hover:bg-brand-primary/5"
                >
                  {m.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block text-center rounded-full bg-brand-primary text-white px-5 py-3 text-sm font-semibold shadow-glow"
              >
                무료 안전 진단 받기
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

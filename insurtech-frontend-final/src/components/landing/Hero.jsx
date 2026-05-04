import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, HardHat, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import SmartLink from './SmartLink';
import { HERO } from '../../data/landing';

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* 배경 글로우 — 푸드 모티프 미사용, 추상 도형만 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-[560px] w-[560px] rounded-full bg-brand-primary/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 h-[480px] w-[480px] rounded-full bg-brand-accent/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-dots opacity-60"
      />

      {/* 초대형 워드마크 — 배경 outline 스타일 */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-24 md:top-28 select-none pointer-events-none"
      >
        <p
          className="hero-mega text-center text-transparent"
          style={{ WebkitTextStroke: '1.5px rgba(37,99,235,0.18)' }}
        >
          {HERO.megaText}
        </p>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-12 md:pt-20 pb-24 md:pb-32">
        {/* 슬라이드 페이지네이터 (정적) */}
        <div className="flex items-center gap-3 text-sm text-text-muted">
          <span className="font-display font-bold text-text-primary text-base">
            {HERO.indicator.current}
          </span>
          <span>/</span>
          <span>{HERO.indicator.total}</span>
          <div className="ml-3 flex items-center gap-1">
            <button
              type="button"
              aria-label="이전 슬라이드"
              className="h-8 w-8 inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 hover:bg-white transition"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="다음 슬라이드"
              className="h-8 w-8 inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 hover:bg-white transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="mt-12 md:mt-20 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-black/5 px-3 py-1.5 text-xs font-semibold text-brand-primary">
              <CheckCircle2 size={14} /> 캠퍼스 안전관리 + 학생 단체보험
            </span>
            <h1 className="mt-5 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight whitespace-pre-line">
              {HERO.headline}
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-text-muted leading-relaxed">
              {HERO.subcopy}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <SmartLink
                to={HERO.ctaPrimary.to}
                className="inline-flex items-center gap-2 rounded-full bg-brand-primary text-white px-6 py-3.5 text-sm font-semibold shadow-glow transition hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
              >
                {HERO.ctaPrimary.label}
                <ArrowRight size={16} />
              </SmartLink>
              <SmartLink
                to={HERO.ctaSecondary.to}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 backdrop-blur px-6 py-3.5 text-sm font-semibold text-text-primary transition hover:bg-white hover:scale-[1.02]"
              >
                {HERO.ctaSecondary.label}
                <ArrowRight size={16} />
              </SmartLink>
            </div>
            <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-text-muted">
              <li className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-brand-secondary" /> 법정의무교육 자동화
              </li>
              <li className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-brand-secondary" /> 보험료 차등 적용
              </li>
              <li className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-brand-secondary" /> 사고 청구 원클릭
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* TODO: 실제 안전교육 일러스트/사진으로 교체 — public/landing/hero.png */}
              <div
                role="img"
                aria-label="안전모와 방패가 떠 있는 안전교육 이미지 placeholder"
                className="relative aspect-square rounded-3xl bg-gradient-to-br from-brand-primary/15 via-white to-brand-secondary/15 border border-white shadow-xl overflow-hidden"
              >
                <div className="absolute inset-0 grid-dots opacity-60" aria-hidden="true" />
                <div
                  className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-brand-primary/30 blur-2xl"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-8 -left-8 h-44 w-44 rounded-full bg-brand-accent/30 blur-2xl"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                  <div className="h-28 w-28 rounded-3xl bg-white/90 backdrop-blur border border-black/5 shadow-glow flex items-center justify-center animate-float-y">
                    <ShieldCheck size={56} className="text-brand-primary" strokeWidth={2.2} />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-16 rounded-2xl bg-white/90 border border-black/5 shadow flex items-center justify-center">
                      <HardHat size={28} className="text-brand-accent" />
                    </div>
                    <div className="h-16 w-16 rounded-2xl bg-brand-primary text-white shadow-glow flex items-center justify-center font-display font-extrabold">
                      A+
                    </div>
                    <div className="h-16 w-16 rounded-2xl bg-white/90 border border-black/5 shadow flex items-center justify-center">
                      <CheckCircle2 size={28} className="text-brand-secondary" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 보조 카드 — 통계 칩 */}
              <div className="absolute -left-3 md:-left-6 bottom-6 rounded-2xl bg-white/95 backdrop-blur border border-black/5 shadow-lg px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                  Completion
                </p>
                <p className="font-display font-extrabold text-xl text-text-primary">94.2%</p>
                <p className="text-[11px] text-text-muted">올해 이수율</p>
              </div>
              <div className="absolute -right-3 md:-right-6 top-6 rounded-2xl bg-white/95 backdrop-blur border border-black/5 shadow-lg px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                  Risk
                </p>
                <p className="font-display font-extrabold text-xl text-brand-secondary">Low</p>
                <p className="text-[11px] text-text-muted">실험실 평균</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

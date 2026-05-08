// NOTE: 인슈어테크 안전관리 컨셉. 푸드/스플래시 모티프는 사용하지 않습니다.
// 카피/데이터 수정: src/data/landing.js
// 컬러 토큰: src/index.css 의 :root CSS 변수
// 격리: tailwind.config.js — content scope + important: '.landing-root' + preflight: false
import React from 'react';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import Lineup from '../components/landing/Lineup';
import ContactForm from '../components/landing/ContactForm';
import Footer from '../components/landing/Footer';
import { ToastProvider } from '../hooks/useToast';

export default function SafetyLandingPage() {
  return (
    <ToastProvider>
      <div className="landing-root min-h-screen bg-bg-soft text-text-primary font-sans antialiased">
        <Header />
        <main>
          <Hero />
          <About />
          <Lineup />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}

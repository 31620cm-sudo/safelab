import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FlaskConical,
  Wrench,
  Users,
  Settings,
  Bell,
  AlertTriangle,
  ShieldAlert,
  Recycle,
  Trash2,
  Eye,
  Flame,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

// SafeLab 대시보드 — 랜딩과 같은 SafeLab 톤(시안/옐로우/핑크/민트)
// Tailwind는 .landing-root 스코프에서만 동작하므로 wrapper에 동일 className 부여.
export default function DashboardPage() {
  const [imgError, setImgError] = useState(false);

  const sidebar = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: FlaskConical, label: 'Experiments' },
    { icon: Wrench, label: 'Equipment' },
    { icon: Users, label: 'Researchers' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="landing-root min-h-screen bg-bg-soft text-text-primary font-sans antialiased">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden md:flex w-56 shrink-0 flex-col bg-white border-r border-black/5 px-5 py-6">
          <Link to="/landing" className="flex items-center gap-2 mb-10 no-underline">
            <span className="font-display font-extrabold text-2xl text-brand-primary">
              safe<span className="text-text-primary">lab</span>
            </span>
          </Link>
          <nav className="flex flex-col gap-1">
            {sidebar.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold transition ${
                  item.active
                    ? 'bg-brand-primary/10 text-brand-primary'
                    : 'text-text-muted hover:bg-bg-soft hover:text-text-primary'
                }`}
              >
                <item.icon size={18} strokeWidth={2.2} />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto pt-6 border-t border-black/5">
            <Link
              to="/landing"
              className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-brand-primary transition no-underline"
            >
              <ArrowLeft size={14} /> 랜딩으로 돌아가기
            </Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 p-5 md:p-8">
          {/* Top bar */}
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">
                대시보드
              </h1>
              <p className="text-sm text-text-muted mt-1">
                SafeLab — 실험실 안전 현황 한눈에 보기
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="알림"
                className="relative h-10 w-10 inline-flex items-center justify-center rounded-2xl bg-white border border-black/5 hover:shadow transition"
              >
                <Bell size={18} />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-brand-accent" />
              </button>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-mint shadow-glow" />
            </div>
          </header>

          <div className="grid lg:grid-cols-12 gap-5 md:gap-6">
            {/* Active Experiments — 큰 카드 */}
            <section className="lg:col-span-8 rounded-3xl bg-white border border-black/5 shadow-sm p-5 md:p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-lg">Active Experiments</h2>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-primary">
                  실시간
                </span>
              </div>

              <div className="mt-4 relative aspect-[16/9] rounded-2xl bg-gradient-to-br from-brand-primary/15 via-white to-brand-mint/20 overflow-hidden">
                {!imgError ? (
                  <img
                    src={process.env.PUBLIC_URL + '/landing/safelab-dashboard.png'}
                    alt="SafeLab 실험 모니터링"
                    onError={() => setImgError(true)}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FlaskConical size={84} className="text-brand-primary/60" />
                  </div>
                )}
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-sm">
                  <p className="font-semibold">
                    Project X · Reaction <span className="text-brand-primary">75% Complete</span>
                  </p>
                  <p className="text-text-muted">예상 종료 14:30</p>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-bg-soft overflow-hidden">
                  <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-brand-primary to-brand-mint" />
                </div>
              </div>
            </section>

            {/* Today's Safety Tip */}
            <section className="lg:col-span-4 rounded-3xl bg-yellow-100 border border-yellow-200 p-5 md:p-6">
              <h2 className="font-display font-bold text-lg flex items-center gap-2">
                <AlertTriangle size={18} className="text-amber-600" />
                Today's Safety Tip
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-yellow-900/80">
                실험 중에는 항상 <strong>흄 후드</strong>를 작동시키고, 반응 종료 후 5분 이상
                환기 상태를 유지하세요.
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-yellow-900 hover:text-yellow-950 transition"
              >
                팁 더보기 <ArrowRight size={12} />
              </button>
            </section>

            {/* Emergency Resources */}
            <section className="lg:col-span-4 rounded-3xl bg-pink-100 border border-pink-200 p-5 md:p-6">
              <h2 className="font-display font-bold text-lg flex items-center gap-2">
                <ShieldAlert size={18} className="text-rose-600" />
                Emergency Resources
              </h2>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {[
                  { Icon: Flame, color: 'bg-rose-500', label: '소화기' },
                  { Icon: Eye, color: 'bg-emerald-500', label: '아이워시' },
                  { Icon: ShieldAlert, color: 'bg-amber-500', label: '비상' },
                  { Icon: Bell, color: 'bg-cyan-500', label: '알람' },
                ].map(({ Icon, color, label }) => (
                  <button
                    key={label}
                    type="button"
                    className={`aspect-square rounded-2xl ${color} text-white flex flex-col items-center justify-center gap-1 hover:scale-105 transition`}
                  >
                    <Icon size={20} />
                    <span className="text-[10px] font-semibold">{label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Waste Status */}
            <section className="lg:col-span-4 rounded-3xl bg-emerald-50 border border-emerald-200 p-5 md:p-6">
              <h2 className="font-display font-bold text-lg flex items-center gap-2">
                <Recycle size={18} className="text-emerald-600" />
                Waste Status
              </h2>
              <div className="mt-4 space-y-3">
                <WasteBar Icon={Trash2} label="Organic" pct={60} barClass="bg-emerald-500" />
                <WasteBar Icon={Trash2} label="Inorganic" pct={30} barClass="bg-cyan-500" />
              </div>
            </section>

            {/* Stats row */}
            <section className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { label: '이수율', value: '94.2%', tone: 'bg-brand-primary text-white' },
                { label: '활성 실험실', value: '12', tone: 'bg-white text-text-primary border border-black/5' },
                { label: '미이수자', value: '7', tone: 'bg-pink-100 text-rose-700' },
                { label: '리스크 점수', value: 'Low', tone: 'bg-yellow-100 text-yellow-800' },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`rounded-3xl p-5 ${s.tone} shadow-sm transition hover:-translate-y-0.5`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-widest opacity-70">
                    {s.label}
                  </p>
                  <p className="font-display font-extrabold text-2xl mt-1">{s.value}</p>
                </div>
              ))}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function WasteBar({ Icon, label, pct, barClass }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-2 font-semibold">
          <Icon size={14} /> {label}
        </span>
        <span className="text-text-muted">{pct}% Full</span>
      </div>
      <div className="mt-1.5 h-2 rounded-full bg-white/60 overflow-hidden">
        <div className={`h-full rounded-full ${barClass}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

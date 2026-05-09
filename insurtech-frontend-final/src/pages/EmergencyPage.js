import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { COMMON_EMERGENCY } from '../data/emergencyCommon';
import { getDepartment } from '../data/departments';
import { SEVERITY_LEVELS, REPORTING_CHAINS } from '../data/incidentTypes';
import './EmergencyPage.css';

const SEVERITY_ORDER = ['심각', '경계', '주의', '관심'];

export default function EmergencyPage() {
  const navigate = useNavigate();

  const studentDept = useMemo(() => {
    try {
      const raw = localStorage.getItem('safelab.student');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed?.deptId ? getDepartment(parsed.deptId) : null;
    } catch {
      return null;
    }
  }, []);

  const handleCall = (phone) => {
    window.location.href = `tel:${phone.replace(/-/g, '')}`;
  };

  return (
    <div className="app-shell">
      <div className="aurora-orb o1" />
      <div className="aurora-orb o2" />
      <div className="aurora-orb o3" />
      <div className="aurora-orb o4" />
      <div className="em-frame">
        <header className="em-header">
          <button className="em-back" onClick={() => navigate(-1)} aria-label="뒤로">
            ←
          </button>
          <div className="em-header__title">
            <h1>긴급 연락처</h1>
            <p>사고 발생 시 — 위에서부터 순서대로 연락하세요</p>
          </div>
          <button
            type="button"
            className="em-header__photo"
            onClick={() => navigate('/incident/photo')}
            title="사진으로 사고 신고"
            aria-label="사진으로 사고 신고"
          >
            📷
          </button>
        </header>

        <main className="em-main">
          {/* 경고 배너 */}
          <div className="em-warn">
            <div className="em-warn__icon">⚠️</div>
            <div className="em-warn__body">
              <strong>먼저 119 — 그 다음 학과·안전원 통지</strong>
              <span>약관 제11조: 사고 인지 즉시 안전원에 통지해야 보상 가능</span>
            </div>
            <div
              className="em-warn__cta"
              onClick={() => handleCall('119')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCall('119')}
            >
              <span className="em-warn__num">119</span>
              <span className="em-warn__label">즉시 호출</span>
            </div>
          </div>

          {/* 사고 등급별 신고 가이드 (B 패키지) */}
          <section className="em-section">
            <div className="em-section__head">
              <span className="eyebrow">사고 등급별 신고 가이드</span>
              <h2>등급에 따라 신고처가 다릅니다</h2>
              <p>출처: 인하공전 「2026 대학안전관리계획」 p.24~25 사고등급 평가 매트릭스</p>
            </div>
            <div className="em-severity-grid">
              {SEVERITY_ORDER.map((sev) => {
                const meta = SEVERITY_LEVELS[sev];
                const chain = REPORTING_CHAINS[sev] || [];
                return (
                  <details key={sev} className={`em-severity em-severity--${meta.color}`}>
                    <summary className="em-severity__summary">
                      <span className={`pill ${meta.pillClass} em-severity__pill`}>
                        {meta.label}
                      </span>
                      <span className="em-severity__desc">{meta.description}</span>
                      <span className="em-severity__deadline">{meta.deadline}</span>
                      <span className="em-severity__chev" aria-hidden>▾</span>
                    </summary>
                    <ol className="em-severity__chain">
                      {chain.map((r) => (
                        <li key={r.step} className="em-severity__step">
                          <span className="em-severity__num">{String(r.step).padStart(2, '0')}</span>
                          <div>
                            <h4>{r.label}</h4>
                            {r.phone && (
                              <button
                                type="button"
                                className="em-severity__call"
                                onClick={() =>
                                  r.kind === 'email'
                                    ? (window.location.href = `mailto:${r.phone}`)
                                    : handleCall(r.phone)
                                }
                              >
                                {r.kind === 'email' ? '✉ ' : '📞 '}
                                {r.phone}
                              </button>
                            )}
                            {r.desc && <p>{r.desc}</p>}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </details>
                );
              })}
            </div>
          </section>

          {/* 학과 전용 (있을 때만) */}
          {studentDept && (
            <section className="em-section">
              <div className="em-section__head">
                <span className="eyebrow">학과 전용</span>
                <h2>
                  <span className="em-dept-icon" aria-hidden>
                    {studentDept.icon}
                  </span>
                  {studentDept.name}
                </h2>
                <p>학생 정보로 매핑된 학과의 1차 연락처</p>
              </div>
              <div className="em-grid">
                {studentDept.emergencyContacts.map((c, i) => (
                  <ContactCard
                    key={i}
                    item={c}
                    onCall={handleCall}
                    variant="dept"
                  />
                ))}
              </div>
            </section>
          )}

          {/* 공통 카테고리들 */}
          {COMMON_EMERGENCY.map((group, gi) => (
            <section className="em-section" key={gi}>
              <div className="em-section__head">
                <span className="eyebrow">{group.category}</span>
                <h2>{group.heading || group.category}</h2>
                {group.subtitle && <p>{group.subtitle}</p>}
              </div>
              <div className="em-grid">
                {group.items.map((c, i) => (
                  <ContactCard
                    key={i}
                    item={c}
                    onCall={handleCall}
                    variant={c.urgent ? 'urgent' : 'normal'}
                  />
                ))}
              </div>
            </section>
          ))}

          <p className="em-footer-note">
            긴급상황 후에는 안전관리실에 <strong>사고 경위서</strong>를 제출해주세요.
            연구실안전공제 청구는 사고 인지 후 <strong>3년 이내</strong> (약관 제26조).
          </p>
        </main>
      </div>
    </div>
  );
}

function ContactCard({ item, onCall, variant = 'normal' }) {
  return (
    <button
      type="button"
      className={`em-card em-card--${variant}`}
      onClick={() => onCall(item.phone)}
    >
      <div className="em-card__head">
        <h3 className="em-card__name">{item.label}</h3>
        <span className="em-card__phone">{item.phone}</span>
      </div>
      <p className="em-card__desc">{item.desc}</p>
      <div className="em-card__cta">
        <span className="em-card__icon" aria-hidden>📞</span>
        전화 걸기
      </div>
    </button>
  );
}

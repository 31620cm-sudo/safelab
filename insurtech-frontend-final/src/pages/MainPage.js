import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SAMPLE_CONSULT_HISTORY } from '../data/labsafety';
import './MainPage.css';

// 자료 기반(연구실안전공제)이 아닌 더미가 들어있을 때 자동으로 연구실 사고 시나리오로 reset.
// 자동차/교통사고/상해 등 일반 보험 더미를 정리하기 위함.
const STALE_KEYWORDS = /교통사고|자동차|상해\s*-\s*\d/;

function loadConsultHistory() {
  try {
    const raw = localStorage.getItem('consultHistory');
    const parsed = raw ? JSON.parse(raw) : [];
    const isEmpty = !Array.isArray(parsed) || parsed.length === 0;
    const hasStale = Array.isArray(parsed) && parsed.some((h) => STALE_KEYWORDS.test(h?.title || ''));
    if (isEmpty || hasStale) {
      localStorage.setItem('consultHistory', JSON.stringify(SAMPLE_CONSULT_HISTORY));
      return SAMPLE_CONSULT_HISTORY;
    }
    return parsed;
  } catch (_e) {
    localStorage.setItem('consultHistory', JSON.stringify(SAMPLE_CONSULT_HISTORY));
    return SAMPLE_CONSULT_HISTORY;
  }
}

export default function MainPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (!u) { navigate('/login'); return; }
    setUser(JSON.parse(u));
    setHistory(loadConsultHistory());
  }, [navigate]);

  const startNewConsult = () => {
    const roomId = 'room-' + Date.now();
    localStorage.setItem('currentRoom', roomId);
    navigate('/device-check');
  };

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="main-container">
      <nav className="main-nav">
        <div className="nav-logo">🧪 연구실안전공제 도우미</div>
        <div className="nav-right">
          <span className="nav-user">👤 {user?.name}님</span>
          <button onClick={logout} className="btn-logout">로그아웃</button>
        </div>
      </nav>

      <div className="main-hero">
        <h1>연구실안전공제 AI 상담 시스템</h1>
        <p>「연구실 안전환경 조성에 관한 법률」 제26조 기반 — Gemini AI가 약관·보상기준을 분석하고 상담해드립니다</p>
      </div>

      <div className="main-content">
        <div className="main-left">
          <div className="new-consult-card" onClick={startNewConsult}>
            <div className="plus-icon">+</div>
            <h3>새 연구실 사고 상담 시작</h3>
            <p>화학·기계·감전·화재 등 사고 시나리오별 보장 범위 안내</p>
            <button className="btn-start">새 상담 방 생성 →</button>
          </div>

          <div className="feature-list">
            <div className="feature-item">
              <span>🤖</span>
              <div>
                <strong>Gemini AI 실시간 분석</strong>
                <p>연구실안전공제 약관·보상기준 즉시 요약</p>
              </div>
            </div>
            <div className="feature-item">
              <span>📄</span>
              <div>
                <strong>공제증서 PDF 공유</strong>
                <p>상담 중 약관 조항 직접 인용</p>
              </div>
            </div>
            <div className="feature-item">
              <span>📊</span>
              <div>
                <strong>청구 리포트 자동 생성</strong>
                <p>요양·장해·유족·입원·장의비 항목별 정리</p>
              </div>
            </div>
          </div>
        </div>

        <div className="main-right">
          <div className="history-header">
            <h2>이전 상담 기록</h2>
            <span className="history-count">{history.length}건</span>
          </div>

          {history.length === 0 ? (
            <div className="empty-history">
              <div className="empty-icon">💬</div>
              <p>아직 상담 기록이 없습니다.</p>
              <p className="empty-sub">새로운 AI 상담을 시작해보세요!</p>
            </div>
          ) : (
            <div className="history-list">
              {history.map((h, i) => (
                <div key={i} className="history-item" onClick={() => navigate(`/summary/${h.roomId}`)}>
                  <div className="history-left">
                    <div className="history-icon">🤖</div>
                    <div>
                      <p className="history-title">{h.title}</p>
                      <p className="history-date">{h.date}</p>
                      {h.keywords?.length > 0 && (
                        <div className="history-keywords">
                          {h.keywords.slice(0, 3).map((kw, j) => (
                            <span key={j} className="mini-tag">{kw}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="history-arrow">요약 보기 →</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

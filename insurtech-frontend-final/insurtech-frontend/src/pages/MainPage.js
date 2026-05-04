import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

export default function MainPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (!u) { navigate('/login'); return; }
    setUser(JSON.parse(u));
    setHistory(JSON.parse(localStorage.getItem('consultHistory') || '[]'));
  }, [navigate]);

  const startNew = () => {
    const roomId = 'room-' + Date.now();
    localStorage.setItem('currentRoom', roomId);
    navigate('/device-check');
  };

  const logout = () => { localStorage.removeItem('user'); navigate('/login'); };

  const riskColor = { '높음': '#ef4444', '보통': '#f59e0b', '낮음': '#10b981' };

  return (
    <div className="main-container">
      <nav className="main-nav">
        <div className="nav-logo">🏫 인하공전 학생 단체보험 AI 상담</div>
        <div className="nav-right">
          <button onClick={() => navigate('/dashboard')} className="btn-dash">📊 대시보드</button>
          <span>{user?.name}님</span>
          <button onClick={logout} className="btn-logout">로그아웃</button>
        </div>
      </nav>

      <div className="main-content">
        <div className="main-left">
          <div className="new-consult-card" onClick={startNew}>
            <div className="plus-icon">+</div>
            <h3>새로운 보험 상담 시작</h3>
            <p>실험실 사고 · 실습 중 부상 · 기자재 파손 · 현장실습 상해</p>
            <button className="btn-primary">상담방 생성</button>
          </div>
          <div className="info-cards">
            <div className="info-card">
              <span>🧪</span>
              <div>
                <strong>실험실 사고 대응</strong>
                <p>화상·감전·화학물질·기계 부상 시나리오 즉시 매칭</p>
              </div>
            </div>
            <div className="info-card">
              <span>⚡</span>
              <div>
                <strong>위험 키워드 실시간 감지</strong>
                <p>폭발·감전·중독 등 위기 키워드 즉시 경고</p>
              </div>
            </div>
            <div className="info-card">
              <span>🤖</span>
              <div>
                <strong>Mock-first + Gemini 하이브리드</strong>
                <p>자주 발생 사고는 즉시 답변, 신규 상황만 AI 호출</p>
              </div>
            </div>
          </div>
        </div>

        <div className="main-right">
          <div className="right-header">
            <h2>이전 상담 기록</h2>
            <button onClick={() => navigate('/dashboard')} className="view-all-btn">전체 보기 →</button>
          </div>
          {history.length === 0 ? (
            <div className="empty-history"><p>상담 기록이 없습니다.</p></div>
          ) : (
            <div className="history-list">
              {history.slice(0, 10).map((h, i) => (
                <div key={i} className="history-item" onClick={() => navigate(`/summary/${h.roomId}`)}>
                  <div className="h-left">
                    <div className="h-title">{h.title}</div>
                    <div className="h-date">{h.date}</div>
                  </div>
                  <div className="h-right">
                    {h.analysis && (
                      <span className="h-risk" style={{background: riskColor[h.analysis.riskLevel] || '#6b7280'}}>
                        {h.analysis.riskLevel}
                      </span>
                    )}
                    <span className="h-badge">요약 보기</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

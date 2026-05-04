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
        <div className="nav-logo">📹 AI 약관 도우미</div>
        <div className="nav-right">
          <span className="nav-user">👤 {user?.name}님</span>
          <button onClick={logout} className="btn-logout">로그아웃</button>
        </div>
      </nav>

      <div className="main-hero">
        <h1>AI 보험 약관 상담 시스템</h1>
        <p>Gemini AI가 실시간으로 보험 약관을 분석하고 상담해드립니다</p>
      </div>

      <div className="main-content">
        <div className="main-left">
          <div className="new-consult-card" onClick={startNewConsult}>
            <div className="plus-icon">+</div>
            <h3>새로운 AI 상담 시작</h3>
            <p>AI 기반 실시간 약관 상담을 시작하세요</p>
            <button className="btn-start">새로운 AI 상담 방 생성 →</button>
          </div>

          <div className="feature-list">
            <div className="feature-item">
              <span>🤖</span>
              <div>
                <strong>Gemini AI 실시간 분석</strong>
                <p>약관 내용 즉시 요약 및 설명</p>
              </div>
            </div>
            <div className="feature-item">
              <span>📄</span>
              <div>
                <strong>약관 PDF 공유</strong>
                <p>상담 중 약관 조항 직접 확인</p>
              </div>
            </div>
            <div className="feature-item">
              <span>📊</span>
              <div>
                <strong>상담 리포트 자동 생성</strong>
                <p>종료 후 요약 보고서 저장</p>
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

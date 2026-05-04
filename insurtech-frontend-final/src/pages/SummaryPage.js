import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SummaryPage.css';

export default function SummaryPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('consultHistory') || '[]');
    const found = history.find(h => h.roomId === roomId);
    setData(found || null);
  }, [roomId]);

  const formatDuration = (s) => {
    if (!s) return '-';
    return `${Math.floor(s / 60)}분 ${s % 60}초`;
  };

  const userMessages = data?.messages?.filter(m => m.role === 'user') || [];
  const aiMessages = data?.messages?.filter(m => m.role === 'ai') || [];

  return (
    <div className="summary-page">
      <nav className="summary-nav">
        <span className="nav-logo">📹 AI 약관 도우미</span>
        <button onClick={() => navigate('/main')} className="back-btn">← 메인으로</button>
      </nav>

      <div className="summary-content">
        {/* 상단 성공 배너 */}
        <div className="success-banner">
          <div className="success-icon">✅</div>
          <div>
            <h2>상담이 성공적으로 종료되었습니다</h2>
            <p>AI가 분석한 상담 내용을 확인하세요</p>
          </div>
          <div className="summary-meta-right">
            <span>📅 {data?.date || '-'}</span>
            <span>⏱ {formatDuration(data?.duration)}</span>
          </div>
        </div>

        <div className="summary-grid">
          {/* 상담 통계 */}
          <div className="stat-cards">
            <div className="stat-card">
              <span className="stat-num">{userMessages.length}</span>
              <span className="stat-label">고객 질문 수</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">{aiMessages.length}</span>
              <span className="stat-label">AI 답변 수</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">{data?.keywords?.length || 0}</span>
              <span className="stat-label">감지 키워드</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">{formatDuration(data?.duration)}</span>
              <span className="stat-label">상담 시간</span>
            </div>
          </div>

          {/* 키워드 */}
          {data?.keywords?.length > 0 && (
            <div className="card">
              <h3>🔍 감지된 약관 키워드</h3>
              <div className="keyword-list">
                {data.keywords.map((kw, i) => (
                  <span key={i} className="kw-badge">{kw}</span>
                ))}
              </div>
            </div>
          )}

          {/* 대화 내역 */}
          <div className="card chat-record">
            <h3>💬 상담 대화 내역</h3>
            <div className="chat-log">
              {data?.messages?.length > 0 ? (
                data.messages.map((msg, i) => (
                  <div key={i} className={`log-row ${msg.role}`}>
                    <span className="log-role">{msg.role === 'ai' ? '🤖 AI' : '👤 고객'}</span>
                    <p className="log-text">{msg.text}</p>
                  </div>
                ))
              ) : (
                <p className="empty-text">대화 내역이 없습니다.</p>
              )}
            </div>
          </div>

          {/* AI 분석 리포트 */}
          <div className="card">
            <h3>📊 AI 분석 리포트</h3>
            <div className="analysis-items">
              <div className="analysis-row">
                <span className="analysis-label">주요 관심 분야</span>
                <span className="analysis-value">
                  {data?.keywords?.length > 0
                    ? data.keywords.slice(0, 3).join(', ')
                    : 'Gemini API 연동 후 분석 제공'}
                </span>
              </div>
              <div className="analysis-row">
                <span className="analysis-label">상담 만족도</span>
                <span className="analysis-value stars">⭐⭐⭐⭐⭐</span>
              </div>
              <div className="analysis-row">
                <span className="analysis-label">후속 조치 필요</span>
                <span className="analysis-value">
                  {data?.keywords?.includes('보험금') ? '보험금 청구 서류 안내 필요' :
                   data?.keywords?.includes('계약해지') ? '해지환급금 조회 안내 필요' :
                   '추가 상담 불필요'}
                </span>
              </div>
              <div className="analysis-row">
                <span className="analysis-label">상담 유형</span>
                <span className="analysis-value">보험 약관 일반 상담</span>
              </div>
            </div>
          </div>
        </div>

        <div className="summary-actions">
          <button onClick={() => navigate('/main')} className="btn-primary">🏠 메인으로 돌아가기</button>
          <button onClick={() => window.print()} className="btn-secondary">🖨️ 리포트 출력</button>
        </div>
      </div>
    </div>
  );
}

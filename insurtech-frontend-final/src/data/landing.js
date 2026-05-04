// 안전관리/안전교육 랜딩페이지의 모든 카피·데이터 단일 소스.
// 카피·메뉴·태그·카드·라인업·연락처를 여기에서만 수정하세요.

export const BRAND = {
  name: '인슈어테크',
  enName: 'INSURETECH',
  tagline: 'Safer Lab, Safer Tomorrow',
};

export const HEADER_MENUS = [
  { label: '서비스 소개', href: '#about' },
  { label: '라인업', href: '#lineup' },
  { label: '도입 문의', href: '#contact' },
  { label: '문의하기', href: '#contact' },
];

export const HERO = {
  indicator: { current: '05', total: '12' },
  megaText: 'SAFE LAB',
  headline: '안전한 실험실,\n안심하는 단체보험',
  subcopy:
    '공대 실험실의 안전교육 이수부터 학생 단체보험 리스크 관리까지 — 인슈어테크가 한 번에 연결합니다.',
  ctaPrimary: { label: '무료 안전 진단 받기', href: '#contact' },
  ctaSecondary: { label: '라인업 살펴보기', href: '#lineup' },
};

export const ABOUT = {
  eyebrow: 'About',
  title: '왜 인슈어테크인가',
  paragraphs: [
    '현장 사고의 대부분은 예측 가능한 위험에서 발생합니다. 우리는 법정의무 안전교육 이수 데이터와 실험실 위험성 평가를 결합해, 학교 단위 단체보험 보험료를 합리적으로 재설계합니다.',
    '교수·학생·학과 행정실 모두를 위한 대시보드를 제공합니다. 이수율은 자동으로 추적되고, 미이수자 알림과 보험 적용 범위가 실시간으로 동기화됩니다.',
  ],
  tags: ['법정의무교육', '위험성 평가', '이수율 추적', '단체보험 연계', '사고 리포트'],
  cards: [
    {
      title: '맞춤 커리큘럼',
      desc: '학과별 위험요소에 맞춘 모듈형 안전교육 트랙',
      icon: 'GraduationCap',
      tone: 'primary',
    },
    {
      title: '이수 자동 인증',
      desc: 'QR/SSO 기반 출석, 학생증 연동',
      icon: 'QrCode',
      tone: 'secondary',
    },
    {
      title: '리스크 점수화',
      desc: '실험실 단위 위험 등급으로 보험료 차등 적용',
      icon: 'Gauge',
      tone: 'accent',
    },
    {
      title: '사고 대응 가이드',
      desc: '사고 발생 시 보험 청구까지 원클릭',
      icon: 'LifeBuoy',
      tone: 'primary',
    },
  ],
};

export const LINEUP = {
  eyebrow: 'Lineup',
  title: '세 가지 핵심 솔루션',
  subtitle: '안전교육 · 단체보험 · 리스크 모니터링이 하나로 이어집니다.',
  items: [
    {
      key: 'safelab',
      name: 'SafeLab Education',
      desc: '학과 맞춤형 온라인 안전교육',
      detail: '실험실/장비별 위험요소를 반영한 모듈형 강의 + 망각곡선 기반 반복 학습.',
      icon: 'BookOpenCheck',
      gradient: 'from-blue-500 to-blue-700',
      pillBg: 'bg-blue-50',
      pillText: 'text-blue-700',
    },
    {
      key: 'campusguard',
      name: 'CampusGuard Insurance',
      desc: '이수율 기반 학생 단체보험 플랜',
      detail: '교육 이수율과 위험 점수를 바탕으로 보험료를 차등 설계합니다.',
      icon: 'ShieldCheck',
      gradient: 'from-rose-400 to-rose-600',
      pillBg: 'bg-rose-50',
      pillText: 'text-rose-700',
    },
    {
      key: 'riskradar',
      name: 'RiskRadar Dashboard',
      desc: '실험실 위험 모니터링 + 사고 리포트',
      detail: '학과 단위 위험 지표·미이수자·청구 현황을 한 화면에서 추적.',
      icon: 'Activity',
      gradient: 'from-amber-400 to-amber-600',
      pillBg: 'bg-amber-50',
      pillText: 'text-amber-700',
    },
  ],
};

export const CONTACT = {
  eyebrow: 'Contact',
  title: '지금 도입 문의하세요',
  subtitle:
    '도입을 검토 중인 학교/학과 담당자분들을 위한 무료 컨설팅을 제공합니다. 영업일 기준 1일 이내 회신드립니다.',
  info: [
    { icon: 'Phone', label: '전화', value: '032-870-2114' },
    { icon: 'Mail', label: '이메일', value: 'hello@insuretech.lab' },
    { icon: 'MapPin', label: '주소', value: '인천광역시 남구 인하로 100, 인하공업전문대학' },
    { icon: 'MessageCircle', label: '카카오 채널', value: '@인슈어테크' },
  ],
  submitLabel: '신청하기',
};

export const FOOTER = {
  brand: '인슈어테크',
  description: '안전교육과 학생 단체보험을 잇는 캠퍼스 리스크 플랫폼',
  columns: [
    {
      title: '서비스',
      links: [
        { label: '서비스 소개', href: '#about' },
        { label: '라인업', href: '#lineup' },
        { label: '도입 문의', href: '#contact' },
      ],
    },
    {
      title: '회사',
      links: [
        { label: '팀 소개', href: '#about' },
        { label: '경진대회 출품', href: '#about' },
        { label: '블로그', href: '#' },
      ],
    },
  ],
  socials: [
    { icon: 'Instagram', label: 'Instagram', href: '#' },
    { icon: 'Youtube', label: 'YouTube', href: '#' },
    { icon: 'MessageCircle', label: 'KakaoTalk', href: '#' },
  ],
  copyright: '© 2026 인슈어테크. 인하공업전문대학 경진대회 출품.',
};

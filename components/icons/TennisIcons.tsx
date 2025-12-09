// Icône de raquette SVG personnalisée
export const RacketIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
    <line x1="9" y1="3" x2="9" y2="15" stroke="currentColor" strokeWidth="1"/>
    <line x1="3" y1="9" x2="15" y2="9" stroke="currentColor" strokeWidth="1"/>
    <line x1="6" y1="6" x2="12" y2="12" stroke="currentColor" strokeWidth="1"/>
    <line x1="6" y1="12" x2="12" y2="6" stroke="currentColor" strokeWidth="1"/>
    <line x1="13" y1="13" x2="20" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <rect x="19" y="19" width="3" height="3" fill="currentColor" rx="0.5"/>
  </svg>
);

// Icône de balle de tennis SVG
export const TennisBallIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2"/>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M2 12C2 8 4 4 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M22 12C22 16 20 20 16 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);


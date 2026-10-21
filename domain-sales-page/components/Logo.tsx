import { useId } from 'react';

export function CoinMark({ size = 36, className }: { size?: number; className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD27A" />
          <stop offset=".5" stopColor="#F7931A" />
          <stop offset="1" stopColor="#D96A05" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="19" fill={`url(#${id}-g)`} />
      <circle cx="20" cy="20" r="15.5" fill="none" stroke="#1A1206" strokeOpacity=".22" strokeWidth="1.2" />
      <text
        x="20"
        y="21"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontWeight="700"
        fontSize="16"
        letterSpacing="-.5"
        fill="#1A1206"
      >
        14
      </text>
    </svg>
  );
}

export function Logo() {
  return (
    <span className="logo">
      <CoinMark />
      <span className="logo-word">
        Coin<span className="logo-accent">14</span>
        <span className="logo-tld">.com</span>
      </span>
    </span>
  );
}

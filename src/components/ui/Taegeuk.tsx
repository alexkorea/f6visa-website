// Korean Taegeuk (태극) symbol — simplified for inline use as logo / accent
export function Taegeuk({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="48" fill="#FBF7E8" stroke="#1A1A1A" strokeWidth="1" />
      {/* Red top half (clockwise comma) */}
      <path
        d="M50 2 A48 48 0 0 1 50 98 A24 24 0 0 1 50 50 A24 24 0 0 0 50 2 Z"
        fill="#C60C30"
      />
      {/* Blue bottom half (counter-clockwise comma) */}
      <path
        d="M50 98 A48 48 0 0 1 50 2 A24 24 0 0 1 50 50 A24 24 0 0 0 50 98 Z"
        fill="#003478"
      />
    </svg>
  );
}

// 한옥 처마 (eaves) silhouette — repeating curve pattern as SVG decoration
export function HanokEaves({ color = '#003478', height = 24, className }: { color?: string; height?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 240 24"
      preserveAspectRatio="none"
      className={className}
      style={{ width: '100%', height: `${height}px`, display: 'block' }}
      aria-hidden
    >
      <path
        d="M0 24 L0 12 Q15 0 30 12 Q45 24 60 12 Q75 0 90 12 Q105 24 120 12 Q135 0 150 12 Q165 24 180 12 Q195 0 210 12 Q225 24 240 12 L240 24 Z"
        fill={color}
      />
    </svg>
  );
}

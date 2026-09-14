export default function BrandMark({ compact = false }) {
  return (
    <span className={`brand-mark ${compact ? 'brand-mark--compact' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 72 84" role="img">
        <path className="bulb-outline" d="M36 3C18.2 3 4 16.9 4 34.4c0 11 5.6 19.4 12.7 26.8 3.3 3.4 5.6 7.8 6.6 12.4h25.4c1-4.6 3.3-9 6.6-12.4C62.4 53.8 68 45.4 68 34.4 68 16.9 53.8 3 36 3Z" />
        <path className="bulb-lines" d="M36 15v47M16 29l40 22M16 49l40-22M22 14l28 41M50 14 22 55M9 36h54" />
        <circle className="bulb-node" cx="36" cy="15" r="2.7" />
        <circle className="bulb-node" cx="16" cy="29" r="2.7" />
        <circle className="bulb-node" cx="56" cy="27" r="2.7" />
        <circle className="bulb-node" cx="36" cy="39" r="3.6" />
        <circle className="bulb-node" cx="22" cy="55" r="2.7" />
        <circle className="bulb-node" cx="50" cy="55" r="2.7" />
        <path className="bulb-base" d="M22 73h28M21 79h30" />
      </svg>
    </span>
  );
}

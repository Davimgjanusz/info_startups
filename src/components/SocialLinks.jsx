import { ArrowUpRight, Globe2, Mail } from 'lucide-react';
import { accessibleText } from '../data/translations';

function InstagramIcon({ size = 19 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ size = 19 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M5.2 8.3A1.8 1.8 0 1 0 5.2 4.7a1.8 1.8 0 0 0 0 3.6ZM3.6 9.8h3.2V20H3.6V9.8Zm5.1 0h3.1v1.4h.1c.4-.8 1.5-1.8 3.6-1.8 3.8 0 4.5 2.4 4.5 5.6V20h-3.2v-4.4c0-1.1 0-2.6-1.7-2.6s-2 1.2-2 2.5V20H8.7V9.8Z" />
    </svg>
  );
}

function GithubIcon({ size = 19 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.21.65-.46v-1.62c-2.65.58-3.21-1.12-3.21-1.12-.44-1.1-1.08-1.39-1.08-1.39-.87-.6.07-.59.07-.59.96.07 1.47.99 1.47.99.86 1.46 2.25 1.04 2.8.8.09-.62.34-1.04.61-1.28-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.89.98-2.56-.1-.24-.43-1.21.09-2.52 0 0 .8-.26 2.62.98A9.1 9.1 0 0 1 12 7.2c.81 0 1.63.11 2.4.32 1.82-1.24 2.61-.98 2.61-.98.52 1.31.2 2.28.1 2.52.61.67.98 1.52.98 2.56 0 3.67-2.24 4.48-4.37 4.72.35.3.65.87.65 1.76v2.61c0 .25.17.55.66.46A9.5 9.5 0 0 0 12 2.5Z" />
    </svg>
  );
}

const networks = [
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon },
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedinIcon },
  { key: 'github', label: 'GitHub', Icon: GithubIcon },
  { key: 'website', label: 'Website', Icon: Globe2 },
  { key: 'email', label: 'Email', Icon: Mail },
];

export default function SocialLinks({ links = {}, name, language, t, compact = false, onInternalLink }) {
  const a11y = accessibleText[language];
  const available = networks.filter(({ key }) => links[key]);
  if (!available.length) return null;
  return (
    <div className={compact ? 'member-socials' : 'detail-socials'} role="group" aria-label={a11y.socials(name)}>
      {available.map(({ key, label: networkLabel, Icon }) => {
        const label = key === 'website' ? t('Site') : networkLabel;
        const href = key === 'email' && !links[key].startsWith('mailto:') ? `mailto:${links[key]}` : links[key];
        const internal = href.startsWith('#');
        const email = href.startsWith('mailto:');
        return (
          <a key={key} className={compact ? undefined : 'social-link'} href={href}
            target={internal || email ? undefined : '_blank'} rel={internal || email ? undefined : 'noreferrer'}
            aria-label={a11y.social(label, name)} onClick={internal ? () => onInternalLink?.(href) : undefined}>
            <Icon size={compact ? 14 : 19} />
            {!compact && <><span>{label}</span><ArrowUpRight size={14} /></>}
          </a>
        );
      })}
    </div>
  );
}

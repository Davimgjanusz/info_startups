import BrandMark from './BrandMark';
import SocialLinks from './SocialLinks';
import { accessibleText, getLocalizedText } from '../data/translations';

function Photo({ src, alt, className, t }) {
  return src
    ? <img className={`team-photo ${className}`} src={src} alt={alt} />
    : <div className={`photo-placeholder ${className}`} role="img" aria-label={`${alt} — ${t('Foto não informada')}`}>{t('Foto não informada')}</div>;
}

export default function StartupDetail({ startup, language, t, preferences, headingRef, onBack }) {
  const localize = value => getLocalizedText(value, language);
  const a11y = accessibleText[language];
  const headline = localize(startup.headline) || {};
  const paragraphs = localize(startup.paragraphs) || [];
  const features = localize(startup.features) || [];
  return (
    <main className={`startup-detail-page startup-detail-page--${startup.accent}`}>
      <header className="site-header detail-header">
        <a className="brand" href="#inicio" onClick={() => onBack('#inicio')}>
          <BrandMark compact />
          <span><strong>INFO</strong> startups</span>
        </a>
        {preferences}
        <button className="detail-back" type="button" onClick={() => onBack()}>{t('Voltar')}</button>
      </header>

      <section className="detail-section section-shell">
        <div className="detail-visual">
          <div className="detail-brand-panel">
            {startup.logo
              ? <img src={startup.logo} alt={a11y.logo(startup.name)} />
              : <strong className="logo-placeholder">{startup.name}</strong>}
            {localize(startup.tagline) && <span>{localize(startup.tagline)}</span>}
          </div>
          <div className="team-gallery">
            <Photo t={t} className="team-photo--group" src={startup.teamImage} alt={a11y.team(startup.name)} />
            {startup.teamMembers.map((member) => (
              <div className="team-member" key={member.name}>
                <Photo t={t} className="team-photo--portrait" src={member.image} alt={member.name} />
                <strong>{member.name}</strong>
                {localize(member.role) && <span>{localize(member.role)}</span>}
                <SocialLinks links={member} name={member.name} language={language} t={t} compact />
              </div>
            ))}
          </div>
        </div>

        <div className="detail-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> {startup.name}{localize(startup.segment) && ` · ${localize(startup.segment)}`}</p>
          <h1 ref={headingRef} tabIndex={-1}>
            {headline.text || startup.name}
            {headline.emphasis && <><br /><em>{headline.emphasis}</em></>}
          </h1>
          {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          {features.length > 0 && (
            <ul className="detail-features">
              {features.map((feature) => <li key={feature.title}><strong>{feature.title}</strong><span>{feature.description}</span></li>)}
            </ul>
          )}
          <SocialLinks links={startup.socials} name={startup.name} language={language} t={t} onInternalLink={onBack} />
        </div>
      </section>
    </main>
  );
}

import { useEffect, useState, useSyncExternalStore } from 'react';
import { HEADLINE_TIMING, splitCharacters, startTypewriter } from '../utils/typewriter';

const motionQuery = '(prefers-reduced-motion: reduce)';
function subscribeToMotion(listener) {
  const media = window.matchMedia?.(motionQuery);
  media?.addEventListener('change', listener);
  return () => media?.removeEventListener('change', listener);
}
const readMotion = () => window.matchMedia?.(motionQuery).matches ?? true;
const serverMotion = () => true;

function Phrase({ text, language }) {
  const characters = splitCharacters(text, language);
  return <>{characters.slice(0, -1).join('')}<span className="headline-tail">{characters.at(-1)}<span className="headline-cursor" /></span></>;
}

function HeadlineCycle({ fixedText, phrasesKey, language, reduced, timing, className }) {
  const [text, setText] = useState('');
  const phrases = JSON.parse(phrasesKey);
  const { typing, deleting, hold, gap } = { ...HEADLINE_TIMING, ...timing };
  useEffect(() => {
    if (reduced) return;
    return startTypewriter({
      phrases: JSON.parse(phrasesKey), language, onText: setText,
      timing: { typing, deleting, hold, gap },
    });
  }, [phrasesKey, language, reduced, typing, deleting, hold, gap]);

  return (
    <h1 className={`animated-headline ${className}`} data-reduced-motion={reduced}>
      <span className="visually-hidden">{[fixedText, phrases[0]].filter(Boolean).join(' ')}</span>
      <span aria-hidden="true">
        <span className="headline-fixed">{fixedText}</span>
        {phrases.length > 0 && <em className="headline-slot">
          {phrases.map((phrase, index) => <span className="headline-measure" key={index}><Phrase text={phrase} language={language} /></span>)}
          <span className="headline-current"><Phrase text={reduced ? phrases[0] : text} language={language} /></span>
        </em>}
      </span>
    </h1>
  );
}

export default function AnimatedHeadline({ fixedText = '', phrases = [], language = 'pt', timing = HEADLINE_TIMING, className = '' }) {
  const reduced = useSyncExternalStore(subscribeToMotion, readMotion, serverMotion);
  const phrasesKey = JSON.stringify(Array.isArray(phrases) ? phrases.filter(phrase => typeof phrase === 'string' && phrase.trim()) : []);
  // Content-based keys reset immediately on language/motion changes, never on theme changes.
  return <HeadlineCycle key={`${language}:${reduced}:${phrasesKey}`} {...{ fixedText, phrasesKey, language, reduced, timing, className }} />;
}

export const HEADLINE_TIMING = Object.freeze({ typing: 130, deleting: 70, hold: 2200, gap: 500 });

export function splitCharacters(text, language) {
  if (typeof Intl.Segmenter === 'function') {
    return Array.from(new Intl.Segmenter(language, { granularity: 'grapheme' }).segment(text), item => item.segment);
  }
  return Array.from(text.normalize('NFC'));
}

// Each instance owns one timeout. React's effect cleanup cancels the entire cycle.
export function startTypewriter({ phrases, language, onText, timing = HEADLINE_TIMING }) {
  const words = phrases.filter(phrase => typeof phrase === 'string' && phrase.trim()).map(phrase => splitCharacters(phrase, language));
  if (!words.length) return () => {};
  const delays = Object.fromEntries(Object.entries(HEADLINE_TIMING).map(([key, fallback]) => [
    key, Number.isFinite(timing[key]) && timing[key] > 0 ? timing[key] : fallback,
  ]));
  let index = 0;
  let length = 0;
  let deleting = false;
  let stopped = false;
  let timeout;

  function tick() {
    if (stopped) return;
    const word = words[index];
    length += deleting ? -1 : 1;
    onText(word.slice(0, length).join(''));
    let delay = deleting ? delays.deleting : delays.typing;
    if (!deleting && length === word.length) {
      deleting = true;
      delay = delays.hold;
    } else if (deleting && length === 0) {
      deleting = false;
      index = (index + 1) % words.length;
      delay = delays.gap;
    }
    if (!stopped) timeout = setTimeout(tick, delay);
  }

  timeout = setTimeout(tick, delays.typing);
  return () => { stopped = true; clearTimeout(timeout); };
}

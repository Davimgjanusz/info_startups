import assert from 'node:assert/strict';
import { HEADLINE_TIMING, splitCharacters, startTypewriter } from '../src/utils/typewriter.js';
import { heroHeadlines } from '../src/data/translations.js';

const nativeSet = globalThis.setTimeout;
const nativeClear = globalThis.clearTimeout;
const timers = new Map();
let nextId = 0;
let now = 0;
globalThis.setTimeout = (callback, delay) => {
  const id = ++nextId;
  timers.set(id, { callback, delay, at: now + delay });
  return id;
};
globalThis.clearTimeout = id => timers.delete(id);
function advance() {
  assert.equal(timers.size, 1, 'Only one timeout may be active');
  const [id, timer] = timers.entries().next().value;
  timers.delete(id);
  now = timer.at;
  timer.callback();
  return timer.delay;
}

try {
  for (const language of ['pt', 'en']) {
    const phrases = heroHeadlines[language].phrases;
    let text = '';
    const stop = startTypewriter({ phrases, language, onText: value => { text = value; } });
    for (let round = 0; round < 2; round++) {
      for (let index = 0; index < phrases.length; index++) {
        const characters = splitCharacters(phrases[index], language);
        for (let length = 1; length <= characters.length; length++) {
          const delay = advance();
          assert.equal(delay, length === 1 && (index > 0 || round > 0) ? HEADLINE_TIMING.gap : HEADLINE_TIMING.typing);
          assert.equal(text, characters.slice(0, length).join(''));
        }
        for (let length = characters.length - 1; length >= 0; length--) {
          assert.equal(advance(), length === characters.length - 1 ? HEADLINE_TIMING.hold : HEADLINE_TIMING.deleting);
          assert.equal(text, characters.slice(0, length).join(''));
        }
      }
    }
    stop();
    assert.equal(timers.size, 0);
  }

  // Simulate cleanup on language changes/unmount in every phase, including a queued callback.
  for (const ticks of [0, 1, 2, 3, 4]) {
    let oldText = '';
    const stop = startTypewriter({ phrases: ['ab'], language: 'pt', onText: value => { oldText = value; } });
    for (let index = 0; index < ticks; index++) advance();
    const staleCallback = timers.values().next().value.callback;
    stop();
    stop();
    const before = oldText;
    staleCallback();
    assert.equal(oldText, before, 'Canceled callbacks must never publish text');
    assert.equal(timers.size, 0);
    let newText = '';
    const stopNew = startTypewriter({ phrases: ['start here.'], language: 'en', onText: value => { newText = value; } });
    advance();
    assert.equal(newText, 's');
    stopNew();
  }

  // StrictMode's setup → cleanup → setup leaves one active cycle.
  const first = startTypewriter({ phrases: ['test'], onText() {} });
  first();
  const second = startTypewriter({ phrases: ['test'], onText() {} });
  assert.equal(timers.size, 1);
  second();
  assert.equal(timers.size, 0);
  const empty = startTypewriter({ phrases: ['', null], onText() { assert.fail('Empty phrases must not animate'); } });
  assert.equal(timers.size, 0);
  empty();
  assert.deepEqual(splitCharacters('a\u0301👩🏽‍💻', 'pt'), ['a\u0301', '👩🏽‍💻']);
  console.log('PASS: complete PT/EN cycles, timing, cleanup in every phase, restart, StrictMode lifecycle and Unicode graphemes.');
} finally {
  globalThis.setTimeout = nativeSet;
  globalThis.clearTimeout = nativeClear;
}

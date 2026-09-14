import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { build } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readPreference, savePreference } from '../src/data/preferences.js';
import { getLocalizedText, heroHeadlines, translate, translations } from '../src/data/translations.js';

const storage = new Map();
globalThis.localStorage = {
  getItem: key => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
};
const dependencies = ['react', 'react/jsx-runtime', 'react/jsx-dev-runtime', 'lucide-react'];
const result = await build({
  configFile: false,
  plugins: [{
    name: 'verify-entry',
    resolveId(id) { if (id.endsWith('virtual:verify')) return '\0virtual:verify'; },
    load(id) {
      if (id === '\0virtual:verify') return `
        export { default as App } from '/src/App.jsx';
        export { default as StartupDetail } from '/src/components/StartupDetail.jsx';
        export { default as Preferences } from '/src/components/Preferences.jsx';
        export { default as AnimatedHeadline } from '/src/components/AnimatedHeadline.jsx';
        export { startupsByYear, categories } from '/src/data/startups.js';
      `;
    },
  }],
  build: { ssr: 'virtual:verify', write: false, rollupOptions: { external: dependencies } },
});
let code = result.output.find(item => item.type === 'chunk' && item.isEntry).code;
for (const dependency of dependencies) {
  code = code.replaceAll(`"${dependency}"`, JSON.stringify(import.meta.resolve(dependency)));
}
try {
  const { App, StartupDetail, Preferences, AnimatedHeadline, startupsByYear, categories } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
  const startups = startupsByYear['2026'];
  assert.equal(startups.length, 2);
  assert.deepEqual(startups.map(s => s.id), ['appono', 'selectio']);

  for (const language of ['pt', 'en']) {
    for (const theme of ['dark', 'light']) {
      storage.clear();
      savePreference('info-startups-theme', theme);
      savePreference('info-startups-language', language);
      assert.equal(readPreference('info-startups-theme', ['dark', 'light'], 'dark'), theme);
      assert.equal(readPreference('info-startups-language', ['pt', 'en'], 'pt'), language);
      const t = key => translate(language, key);
      const home = renderToStaticMarkup(React.createElement(App));
      assert.ok(home.includes(t('Grandes ideias')));
      assert.equal((home.match(/<h1\b/g) ?? []).length, 1);
      const headline = renderToStaticMarkup(React.createElement(AnimatedHeadline, { language, ...heroHeadlines[language] }));
      assert.ok(headline.includes(`class="visually-hidden">${heroHeadlines[language].fixedText} ${heroHeadlines[language].phrases[0]}</span>`));
      assert.ok(headline.includes('data-reduced-motion="true"'));
      assert.ok(headline.includes('aria-hidden="true"'));
      assert.ok(!headline.includes('aria-live'));
      assert.equal((headline.match(/class="headline-measure"/g) ?? []).length, 4);
      assert.ok(home.includes(`2 ${t('startups encontradas')}`));
      assert.equal((home.match(/class="startup-card /g) ?? []).length, 2);
      assert.ok(home.includes(t(theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro')));
      const preferences = React.createElement(Preferences, { key: 'preferences', theme, language, t, setTheme() {}, setLanguage() {} });
      for (const startup of startups) {
        const detail = renderToStaticMarkup(React.createElement(StartupDetail, { startup, language, t, preferences, onBack() {} }));
        assert.ok(detail.includes(getLocalizedText(startup.headline, language).emphasis));
        assert.equal((detail.match(/class="team-member"/g) ?? []).length, 3);
        assert.equal((detail.match(/<li>/g) ?? []).length, 3);
        assert.ok(detail.includes(`>${t('Voltar')}</button>`));
        for (const member of startup.teamMembers) {
          assert.ok(detail.includes(member.name));
          assert.ok(detail.includes(getLocalizedText(member.role, language)));
        }
        for (const field of ['description', 'tags', 'tagline', 'segment', 'headline', 'paragraphs', 'features']) {
          assert.ok(startup[field].pt && startup[field].en, `${startup.id}.${field} translations`);
        }
        assert.equal(getLocalizedText(startup.paragraphs, language).length, 2);
        assert.ok(home.includes(getLocalizedText(startup.description, language)));
        assert.ok(detail.includes('target="_blank" rel="noreferrer"'));
      }
      for (const category of categories) {
        const filtered = category === 'Todas' ? startups : startups.filter(s => s.category === category);
        assert.equal(filtered.length, ['Todas', 'Tecnologia'].includes(category) ? 2 : 0);
        assert.ok(home.includes(t(category)));
      }
    }
  }

  assert.equal(getLocalizedText('legacy', 'en'), 'legacy');
  const emptyHeadline = renderToStaticMarkup(React.createElement(AnimatedHeadline, { fixedText: 'Great ideas', phrases: [null, ''] }));
  assert.ok(emptyHeadline.includes('Great ideas'));
  assert.ok(!emptyHeadline.includes('headline-cursor'));
  assert.equal(getLocalizedText({ pt: 'fallback' }, 'en'), 'fallback');
  assert.equal(getLocalizedText(null, 'en'), '');
  assert.equal(getLocalizedText({}, 'en'), '');
  assert.deepEqual(Object.keys(translations.pt), Object.keys(translations.en));
  const appSource = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
  for (const match of appSource.matchAll(/\bt\('([^']+)'\)/g)) {
    assert.ok(translations.en[match[1]], `Missing interface translation: ${match[1]}`);
  }

  // Run the actual pre-paint script against saved, invalid and unavailable storage.
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const bootstrap = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  for (const [theme, language, expectedTheme, expectedLanguage] of [
    ['light', 'en', 'light', 'en'], ['dark', 'pt', 'dark', 'pt-BR'],
    ['invalid', 'invalid', 'dark', 'pt-BR'], [null, null, 'dark', 'pt-BR'],
  ]) {
    storage.clear();
    if (theme) storage.set('info-startups-theme', theme);
    if (language) storage.set('info-startups-language', language);
    const document = { documentElement: { dataset: {}, style: {} } };
    vm.runInNewContext(bootstrap, { document, localStorage });
    assert.equal(document.documentElement.dataset.theme, expectedTheme);
    assert.equal(document.documentElement.lang, expectedLanguage);
    assert.equal(readPreference('info-startups-theme', ['dark', 'light'], 'dark'), expectedTheme);
    assert.equal(readPreference('info-startups-language', ['pt', 'en'], 'pt'), expectedLanguage === 'en' ? 'en' : 'pt');
  }
  globalThis.localStorage = { getItem() { throw Error('Blocked'); }, setItem() { throw Error('Blocked'); } };
  assert.equal(readPreference('info-startups-theme', ['dark', 'light'], 'dark'), 'dark');
  assert.doesNotThrow(() => savePreference('info-startups-theme', 'light'));
  assert.doesNotThrow(() => renderToStaticMarkup(React.createElement(App)));
  const document = { documentElement: { dataset: {}, style: {} } };
  vm.runInNewContext(bootstrap, { document, localStorage });
  assert.equal(document.documentElement.dataset.theme, 'dark');
  assert.equal(document.documentElement.lang, 'pt-BR');
  console.log('PASS: PT/EN × dark/light rendering, both startups, filter data, translated content, preferences and pre-paint defaults.');
} finally {
  delete globalThis.localStorage;
}

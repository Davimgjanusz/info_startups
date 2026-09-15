import assert from 'node:assert/strict';
import { build } from 'vite';

const dependencies = ['@supabase/supabase-js'];
const result = await build({
  configFile: false,
  plugins: [{
    name: 'verify-startup-service-entry',
    resolveId(id) { return id.endsWith('virtual:startup-service') ? '\0virtual:startup-service' : null; },
    load(id) { return id === '\0virtual:startup-service' ? "export { normalizeStartupRows } from '/src/services/startups.js';" : null; },
  }],
  build: { ssr: 'virtual:startup-service', write: false, rollupOptions: { external: dependencies } },
});

let code = result.output.find((item) => item.type === 'chunk' && item.isEntry).code;
for (const dependency of dependencies) {
  code = code.replaceAll(`"${dependency}"`, JSON.stringify(import.meta.resolve(dependency)));
}
const { normalizeStartupRows } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);

const rows = [
  {
    slug: 'beta', cohort_year: '2026', display_number: '02', name: 'Beta', category: 'Tecnologia', accent: 'cyan',
    tags: { pt: ['Plataforma'], en: ['Platform'] }, description: { pt: 'Descricao', en: 'Description' },
    tagline: { pt: 'Tagline', en: 'Tagline' }, segment: { pt: 'Segmento', en: 'Segment' },
    headline: { pt: { normal: 'Beta', emphasis: 'Beta' }, en: { normal: 'Beta', emphasis: 'Beta' } },
    paragraphs: { pt: ['Um', 'Dois'], en: ['One', 'Two'] }, features: { pt: ['Recurso'], en: ['Feature'] },
    socials: { github: 'https://github.com/example/beta' }, logo_url: 'beta/logo.png', team_image_url: 'beta/team.png',
    startup_members: [
      { name: 'Segundo', role: { pt: 'Dev', en: 'Developer' }, image_url: 'beta/members/second.png', sort_order: 2 },
      { name: 'Primeiro', role: { pt: 'Design', en: 'Designer' }, image_url: 'beta/members/first.png', sort_order: 1 },
    ],
  },
  {
    slug: 'alpha', cohort_year: '2025', display_number: '01', name: 'Alpha', category: 'Tecnologia', accent: 'gold',
    tags: { pt: [], en: [] }, description: { pt: 'Descricao', en: 'Description' }, tagline: { pt: 'Tagline', en: 'Tagline' },
    segment: { pt: 'Segmento', en: 'Segment' }, headline: { pt: { normal: 'Alpha', emphasis: 'Alpha' }, en: { normal: 'Alpha', emphasis: 'Alpha' } },
    paragraphs: { pt: ['Um', 'Dois'], en: ['One', 'Two'] }, features: { pt: [], en: [] }, socials: null,
    logo_url: null, team_image_url: null, startup_members: [],
  },
];

const catalog = normalizeStartupRows(rows, (path) => path ? `https://assets.example/${path}` : null);

assert.deepEqual(catalog.years, ['2026', '2025']);
assert.equal(catalog.startupsByYear['2026'][0].id, 'beta');
assert.equal(catalog.startupsByYear['2026'][0].logo, 'https://assets.example/beta/logo.png');
assert.equal(catalog.startupsByYear['2026'][0].teamMembers[0].name, 'Primeiro');
assert.equal(catalog.startupsByYear['2025'][0].socials.github, undefined);
assert.equal(catalog.startupsByYear['2025'][0].teamImage, null);

console.log('Startup service normalization verified without network access.');

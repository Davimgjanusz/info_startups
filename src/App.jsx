import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import BrandMark from './components/BrandMark';
import StartupDetail from './components/StartupDetail';
import { categories, startupsByYear, years } from './data/startups';
import Preferences from './components/Preferences';
import { accessibleText, getLocalizedText, heroHeadlines, translate } from './data/translations';
import AnimatedHeadline from './components/AnimatedHeadline';
import useHeaderScroll from './hooks/useHeaderScroll';
import { readPreference, savePreference } from './data/preferences';

function App() {
  const headerScrolled = useHeaderScroll();
  const [theme, setTheme] = useState(() => readPreference('info-startups-theme', ['dark', 'light'], 'dark'));
  const [language, setLanguage] = useState(() => readPreference('info-startups-language', ['pt', 'en'], 'pt'));
  const t = key => translate(language, key);
  const localize = value => getLocalizedText(value, language);
  const a11y = accessibleText[language];
  const preferences = <Preferences key="preferences" {...{ theme, language, setTheme, setLanguage, t }} />;

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f5f8fc' : '#05070b');
    savePreference('info-startups-theme', theme);
  }, [theme]);

  useLayoutEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    document.title = translate(language, 'Info Startups | Ideias que ganham forma');
    document.querySelector('meta[name="description"]')?.setAttribute('content', translate(language, 'Info Startups: ideias que ganham forma pelas mãos dos alunos de Informática da FECAP.'));
    savePreference('info-startups-language', language);
  }, [language]);

  const [activeCategory, setActiveCategory] = useState('Todas');
  const [activeYear, setActiveYear] = useState(years[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const returnPosition = useRef(0);
  const returnFocus = useRef(null);
  const returnSection = useRef(null);
  const detailHeading = useRef(null);

  useLayoutEffect(() => {
    if (selectedStartup) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      detailHeading.current?.focus({ preventScroll: true });
    } else if (returnSection.current) {
      document.getElementById(returnSection.current)?.scrollIntoView({ behavior: 'instant' });
      returnSection.current = null;
    } else if (returnFocus.current) {
      document.getElementById(returnFocus.current)?.focus({ preventScroll: true });
      window.scrollTo({ top: returnPosition.current, behavior: 'instant' });
    }
  }, [selectedStartup]);

  const openStartup = (startup) => {
    returnPosition.current = window.scrollY;
    returnFocus.current = `startup-${startup.id}`;
    setMenuOpen(false);
    setSelectedStartup(startup);
  };
  const closeStartup = (section) => {
    returnSection.current = section?.replace('#', '') || null;
    setSelectedStartup(null);
  };

  const startups = startupsByYear[activeYear] ?? [];
  const filteredStartups = activeCategory === 'Todas'
    ? startups
    : startups.filter((startup) => startup.category === activeCategory);

  const closeMenu = () => setMenuOpen(false);

  if (selectedStartup) {
    return <StartupDetail startup={selectedStartup} language={language} t={t} preferences={preferences} headingRef={detailHeading} onBack={closeStartup} />;
  }

  return (
    <main>
      <header className={`site-header home-header${headerScrolled ? ' home-header--scrolled' : ''}`} onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) {
          closeMenu();
          event.currentTarget.querySelector('.menu-toggle')?.focus();
        }
      }}>
        <nav id="main-navigation" className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`} aria-label={t('Navegação principal')}>
          <a href="#inicio" onClick={closeMenu}>{t('Início')}</a>
          <a href="#startups" onClick={closeMenu}>{t('Startups')}</a>
          <a href="#sobre" onClick={closeMenu}>{t('Sobre o projeto')}</a>
        </nav>
        <div className="header-actions">
          {preferences}
          <a className="nav-cta" href="#startups" onClick={closeMenu}>{t('Explorar projetos')} <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
        <button type="button" className="menu-toggle" aria-label={t(menuOpen ? 'Fechar menu' : 'Abrir menu')} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </header>

      <section className="hero section-shell" id="inicio">
        <div className="hero-copy reveal-up">
          <a className="brand hero-brand" href="#inicio">
            <BrandMark compact />
            <span><strong>INFO</strong> startups</span>
          </a>
          <p className="eyebrow"><span className="eyebrow-line" /> {t('info startups · laboratório fecap')}</p>
          <AnimatedHeadline language={language} {...heroHeadlines[language]} />
          <p className="hero-lede">{t('Startups criadas por estudantes que transformam curiosidade em tecnologia, e tecnologia em novas possibilidades.')}</p>
          <div className="hero-actions">
            <a className="button button--primary" href="#startups">{t('Conheça as startups')} <ArrowUpRight size={17} /></a>
            <a className="text-link" href="#sobre">{t('O projeto')} <span>↗</span></a>
          </div>
          <div className="hero-footnote"><span className="live-dot" /> {activeYear} · {t('Curso de Informática')}</div>
        </div>

        <div className="hero-art reveal-art">
          <div className="art-orbit art-orbit--one" />
          <div className="art-orbit art-orbit--two" />
          <div className="art-label art-label--top">{t('ideia')} <span>→</span> {t('impacto')}</div>
          <BrandMark />
          <div className="art-caption"><span>01</span><strong>{t('Acenda')}<br />{t('a próxima ideia.')}</strong></div>
        </div>

        <div className="hero-scroll">{t('scroll para explorar')} <ChevronDown size={15} /></div>
      </section>

      <section className="statement section-shell" id="sobre">
        <div className="section-kicker"><span>01</span><span className="kicker-rule" /><span>{t('O ponto de partida')}</span></div>
        <div className="statement-grid">
          <h2>{t('Uma ideia muda quando encontra')} <span>{t('outras ideias.')}</span></h2>
          <div className="statement-copy">
            <p>{t('O Info Startups é o espaço onde alunos do curso de Informática experimentam, colaboram e constroem soluções para o mundo real, turma após turma.')}</p>
            <a className="text-link" href="#startups">{t('Conheça nossa jornada')} <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="metrics" aria-label={t('Números do projeto')}>
          <div><strong>{String(startups.length).padStart(2, '0')}</strong><span>{t('startups em')} {activeYear}</span></div>
          <div><strong>+80</strong><span>{t('alunos envolvidos')}</span></div>
          <div><strong>∞</strong><span>{t('possibilidades abertas')}</span></div>
        </div>
      </section>

      <section className="projects section-shell" id="startups">
        <div className="section-heading">
          <div><p className="eyebrow"><span className="eyebrow-line" /> {t('acervo de projetos')}</p><h2>{t('Ideias com')} <span>{t('nome próprio.')}</span></h2></div>
          <p>{t('Explore as soluções criadas pelas diferentes turmas do curso.')}</p>
        </div>
        <div className="year-bar" role="group" aria-label={t('Selecionar ano da turma')}>
          <span className="year-label">{t('Turma')}</span>
          {years.map((year) => <button key={year} className={activeYear === year ? 'year-button active' : 'year-button'} aria-pressed={activeYear === year} onClick={() => { setActiveYear(year); setActiveCategory('Todas'); }}>{year}</button>)}
          <button className="year-button year-button--future" type="button" disabled>{t('Próximas turmas +')}</button>
        </div>
        <div className="filter-bar" role="group" aria-label={t('Filtrar startups')}>
          {categories.map((category) => <button key={category} className={activeCategory === category ? 'filter-button active' : 'filter-button'} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{t(category)}</button>)}
        </div>
        <p className="results-count" role="status">{filteredStartups.length} {t(filteredStartups.length === 1 ? 'startup encontrada' : 'startups encontradas')}</p>
        {filteredStartups.length === 0 && <p className="empty-state">{t('Nenhuma startup encontrada para estes filtros.')}</p>}
        <div className="startup-grid">
          {filteredStartups.map((startup) => (
            <article className={`startup-card startup-card--${startup.accent} startup-card--featured`} key={startup.id}>
              <div className="card-top"><span className="card-number">{startup.number}</span><span className="card-category">{t(startup.category)}</span><ArrowUpRight className="card-arrow" size={19} /></div>
              <div className="card-symbol">
                {startup.logo
                  ? <img className="startup-card-logo" src={startup.logo} alt={a11y.logo(startup.name)} />
                  : <span className="logo-placeholder">{startup.name}</span>}
              </div>
              <p>{localize(startup.description)}</p>
              <div className="card-bottom">
                <div className="tag-list">{(localize(startup.tags) || []).map((tag) => <span key={tag}>{tag}</span>)}</div>
                <button id={`startup-${startup.id}`} type="button" aria-label={`${t('Ver projeto')} ${startup.name}`} onClick={() => openStartup(startup)}><ArrowUpRight size={17} /></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="students section-shell">
        <div className="students-image" aria-label={t('Equipe de estudantes colaborando em um projeto de tecnologia')} role="img"><div className="image-overlay"><span>info startups · fecap</span><strong>{t('feito por')}<br /><i>{t('quem faz.')}</i></strong></div></div>
        <div className="students-copy"><div className="section-kicker"><span>02</span><span className="kicker-rule" /><span>{t('Por trás das ideias')}</span></div><h2>{t('Aprender é')} <span>{t('construir')}</span> {t('junto.')}</h2><p>{t('Por trás de cada startup existe uma equipe aprendendo a fazer perguntas melhores, testar caminhos e dar forma ao que ainda não existe.')}</p><div className="student-detail"><span className="detail-mark">✦</span><div><strong>{t('Colaboração na prática')}</strong><small>{t('Do primeiro rascunho ao protótipo, cada passo é compartilhado.')}</small></div></div></div>
      </section>

      <section className="closing section-shell" id="contato"><div className="closing-glow" /><p className="eyebrow"><span className="eyebrow-line" /> {t('próximo capítulo')}</p><h2>{t('Uma ideia pode')}<br /><em>{t('transformar o futuro.')}</em></h2><a className="button button--light" href="mailto:startup@fecap.br">{t('Fale com a gente')} <ArrowUpRight size={17} /></a></section>

      <footer className="site-footer section-shell"><a className="brand" href="#inicio"><BrandMark compact /><span><strong>INFO</strong> startups</span></a><p>{t('Colégio FECAP · Curso de Informática')}<br />{t('São Paulo, Brasil · acervo anual')}</p><div className="footer-links"><a href="#inicio">Instagram</a><a href="#contato">{t('Contato')}</a><a href="#inicio">{t('Voltar ao topo ↑')}</a></div></footer>
    </main>
  );
}

export default App;

import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Globe2, Menu, Sparkles, X } from 'lucide-react';
import BrandMark from './components/BrandMark';
import apponoLogo from './assets/appono-logo.png';
import apponoTeam from './assets/appono-equipe.jpg';
import apponoTeamTwo from './assets/appono-equipe-2.jpg';
import apponoTeamThree from './assets/appono-equipe-3.jpg';
import apponoTeamFour from './assets/appono-equipe-4.jpg';
import { categories, startupsByYear, years } from './data/startups';

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

const teamMembers = [
  {
    name: 'Guilherme Yuji',
    role: 'Diretor de tecnologia',
    image: apponoTeamTwo,
    instagram: 'https://www.instagram.com/gui.matsune/',
    linkedin: 'https://www.linkedin.com/in/guilherme-yuji-1ab6b53b7/',
    github: 'https://github.com/GuiYuji123',
  },
  {
    name: 'Davi Janusz',
    role: 'Diretor de projeto',
    image: apponoTeamThree,
    instagram: 'https://www.instagram.com/davi.mgarcia/',
    linkedin: 'https://www.linkedin.com/in/davi-janusz-349271337/',
    github: 'https://github.com/Davimgjanusz',
  },
  {
    name: 'João Victor',
    role: 'Diretor administrativo',
    image: apponoTeamFour,
    instagram: 'https://www.instagram.com/johnny.cfj02/',
    linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-victor-macedo-3963153b6/',
    github: null,
  },
];

function App() {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [activeYear, setActiveYear] = useState(years[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [detailView, setDetailView] = useState(false);

  const startups = startupsByYear[activeYear] ?? [];
  const filteredStartups = activeCategory === 'Todas'
    ? startups
    : startups.filter((startup) => startup.category === activeCategory);

  const closeMenu = () => setMenuOpen(false);

  if (detailView) {
    return (
      <main className="startup-detail-page">
        <header className="site-header detail-header">
          <a className="brand" href="#inicio" onClick={() => { closeMenu(); setDetailView(false); }}>
            <BrandMark compact />
            <span><strong>INFO</strong> startups</span>
          </a>
          <button className="detail-back" type="button" onClick={() => setDetailView(false)}>Voltar</button>
        </header>

        <section className="detail-section section-shell">
          <div className="detail-visual">
            <div className="detail-brand-panel">
              <img src={apponoLogo} alt="Logo da Appono" />
              <span>Foodtech · tecnologia para uma alimentação mais inteligente</span>
            </div>
            <div className="team-gallery">
              <img className="team-photo team-photo--group" src={apponoTeam} alt="Equipe da Appono reunida" />
              {teamMembers.map((member) => (
                <div className="team-member" key={member.name}>
                  <img className="team-photo team-photo--portrait" src={member.image} alt={member.name} />
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                  <div className="member-socials" aria-label={`Redes de ${member.name}`}>
                    <a href={member.instagram} target="_blank" rel="noreferrer" aria-label={`Instagram de ${member.name}`}><InstagramIcon size={14} /></a>
                    <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn de ${member.name}`}><LinkedinIcon size={14} /></a>
                    <a
                      className={!member.github ? 'member-social-link--disabled' : ''}
                      href={member.github || undefined}
                      target={member.github ? '_blank' : undefined}
                      rel={member.github ? 'noreferrer' : undefined}
                      aria-label={member.github ? `GitHub de ${member.name}` : `GitHub de ${member.name} (link pendente)`}
                      aria-disabled={!member.github}
                      onClick={!member.github ? (event) => event.preventDefault() : undefined}
                    >
                      <GithubIcon size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> appono · foodtech</p>
            <h1>Alimentação que<br /><em>entende você.</em></h1>
            <p>
              A Appono é uma plataforma digital que conecta pessoas e restaurantes em uma experiência de alimentação mais
              personalizada, previsível e eficiente. A solução transforma preferências, objetivos, orçamento e restrições
              alimentares em recomendações práticas para a rotina de cada cliente.
            </p>
            <p>
              Com a Appono Rotina, o usuário planeja sua semana e encontra refeições e restaurantes alinhados ao seu perfil.
              Já o pedido antecipado permite reservar a refeição antes da chegada, reduzindo o tempo de espera e ajudando o
              restaurante a organizar melhor sua produção e seu fluxo de atendimento.
            </p>

            <ul className="detail-features">
              <li><strong>Rotina personalizada</strong><span>Alimentação mais adequada ao perfil do cliente.</span></li>
              <li><strong>Pedido antecipado</strong><span>Menos espera e mais previsibilidade para restaurantes.</span></li>
              <li><strong>Experiência integrada</strong><span>Conexão mais inteligente entre cliente e negócio.</span></li>
            </ul>

            <div className="detail-socials" aria-label="Redes sociais da Appono">
              <a className="social-link" href="https://www.instagram.com/appono.br/" target="_blank" rel="noreferrer" aria-label="Instagram da Appono"><InstagramIcon /><span>Instagram</span><ArrowUpRight size={14} /></a>
              <a className="social-link" href="https://linkedin.com/company/appono-br/" target="_blank" rel="noreferrer" aria-label="LinkedIn da Appono"><LinkedinIcon /><span>LinkedIn</span><ArrowUpRight size={14} /></a>
              <a className="social-link" href="#contato" aria-label="Site da Appono"><Globe2 size={19} /><span>Website</span><ArrowUpRight size={14} /></a>
            </div>

          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" onClick={closeMenu}>
          <BrandMark compact />
          <span><strong>INFO</strong> startups</span>
        </a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`} aria-label="Navegação principal">
          <a href="#inicio" onClick={closeMenu}>Início</a>
          <a href="#startups" onClick={closeMenu}>Startups</a>
          <a href="#sobre" onClick={closeMenu}>Sobre o projeto</a>
          <a href="#contato" onClick={closeMenu}>Contato</a>
          <a className="nav-cta" href="#startups" onClick={closeMenu}>Explorar projetos <ArrowUpRight size={16} /></a>
        </nav>
      </header>

      <section className="hero section-shell" id="inicio">
        <div className="hero-copy reveal-up">
          <p className="eyebrow"><span className="eyebrow-line" /> info startups · laboratório fecap</p>
          <h1>Grandes ideias <em>começam</em> aqui.</h1>
          <p className="hero-lede">Startups criadas por estudantes que transformam curiosidade em tecnologia, e tecnologia em novas possibilidades.</p>
          <div className="hero-actions">
            <a className="button button--primary" href="#startups">Conheça as startups <ArrowUpRight size={17} /></a>
            <a className="text-link" href="#sobre">O projeto <span>↗</span></a>
          </div>
          <div className="hero-footnote"><span className="live-dot" /> {activeYear} · Curso de Informática</div>
        </div>

        <div className="hero-art reveal-art">
          <div className="art-orbit art-orbit--one" />
          <div className="art-orbit art-orbit--two" />
          <div className="art-label art-label--top">ideia <span>→</span> impacto</div>
          <BrandMark />
          <div className="art-caption"><span>01</span><strong>Acenda<br />a próxima ideia.</strong></div>
        </div>

        <div className="hero-scroll">scroll para explorar <ChevronDown size={15} /></div>
      </section>

      <section className="statement section-shell" id="sobre">
        <div className="section-kicker"><span>01</span><span className="kicker-rule" /><span>O ponto de partida</span></div>
        <div className="statement-grid">
          <h2>Uma ideia muda quando encontra <span>outras ideias.</span></h2>
          <div className="statement-copy">
            <p>O Info Startups é o espaço onde alunos do curso de Informática experimentam, colaboram e constroem soluções para o mundo real, turma após turma.</p>
            <a className="text-link" href="#startups">Conheça nossa jornada <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="metrics" aria-label="Números do projeto">
          <div><strong>{String(startups.length).padStart(2, '0')}</strong><span>startups em {activeYear}</span></div>
          <div><strong>+80</strong><span>alunos envolvidos</span></div>
          <div><strong>∞</strong><span>possibilidades abertas</span></div>
        </div>
      </section>

      <section className="projects section-shell" id="startups">
        <div className="section-heading">
          <div><p className="eyebrow"><span className="eyebrow-line" /> acervo de projetos</p><h2>Ideias com <span>nome próprio.</span></h2></div>
          <p>Explore as soluções criadas pelas diferentes turmas do curso.</p>
        </div>
        <div className="year-bar" role="tablist" aria-label="Selecionar ano da turma">
          <span className="year-label">Turma</span>
          {years.map((year) => <button key={year} className={activeYear === year ? 'year-button active' : 'year-button'} role="tab" aria-selected={activeYear === year} onClick={() => { setActiveYear(year); setActiveCategory('Todas'); }}>{year}</button>)}
          <button className="year-button year-button--future" type="button" disabled>Próximas turmas +</button>
        </div>
        <div className="filter-bar" role="tablist" aria-label="Filtrar startups">
          {categories.map((category) => <button key={category} className={activeCategory === category ? 'filter-button active' : 'filter-button'} role="tab" aria-selected={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
        </div>
        <div className="startup-grid">
          {filteredStartups.map((startup) => {
            const isAppono = startup.name === 'Appono';

            return (
              <article
                className={`startup-card startup-card--${startup.accent} ${isAppono ? 'startup-card--featured' : ''}`}
                key={startup.name}
                onClick={isAppono ? () => setDetailView(true) : undefined}
                role={isAppono ? 'button' : undefined}
                tabIndex={isAppono ? 0 : undefined}
                onKeyDown={isAppono ? (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setDetailView(true);
                  }
                } : undefined}
              >
                <div className="card-top"><span className="card-number">{startup.number}</span><span className="card-category">{startup.category}</span><ArrowUpRight className="card-arrow" size={19} /></div>
                <div className="card-symbol">
                  {isAppono ? <img className="startup-card-logo" src={apponoLogo} alt="Logo da Appono" /> : <Sparkles size={21} />}
                </div>
                {!isAppono && <h3>{startup.name}</h3>}
                <p>{startup.description}</p>
                <div className="card-bottom"><div className="tag-list">{startup.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button type="button" aria-label={`Ver projeto ${startup.name}`} onClick={(event) => { event.stopPropagation(); setDetailView(true); }}><ArrowUpRight size={17} /></button></div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="students section-shell">
        <div className="students-image" aria-label="Equipe de estudantes colaborando em um projeto de tecnologia" role="img"><div className="image-overlay"><span>info startups · fecap</span><strong>feito por<br /><i>quem faz.</i></strong></div></div>
        <div className="students-copy"><div className="section-kicker"><span>02</span><span className="kicker-rule" /><span>Por trás das ideias</span></div><h2>Aprender é <span>construir</span> junto.</h2><p>Por trás de cada startup existe uma equipe aprendendo a fazer perguntas melhores, testar caminhos e dar forma ao que ainda não existe.</p><div className="student-detail"><span className="detail-mark">✦</span><div><strong>Colaboração na prática</strong><small>Do primeiro rascunho ao protótipo, cada passo é compartilhado.</small></div></div></div>
      </section>

      <section className="closing section-shell" id="contato"><div className="closing-glow" /><p className="eyebrow"><span className="eyebrow-line" /> próximo capítulo</p><h2>Uma ideia pode<br /><em>transformar o futuro.</em></h2><a className="button button--light" href="mailto:startup@fecap.br">Fale com a gente <ArrowUpRight size={17} /></a></section>

      <footer className="site-footer section-shell"><a className="brand" href="#inicio"><BrandMark compact /><span><strong>INFO</strong> startups</span></a><p>Colégio FECAP · Curso de Informática<br />São Paulo, Brasil · acervo anual</p><div className="footer-links"><a href="#inicio">Instagram</a><a href="#contato">Contato</a><a href="#inicio">Voltar ao topo ↑</a></div></footer>
    </main>
  );
}

export default App;

// Portuguese source strings also serve as stable keys for interface copy.
const en = {
  'Início': 'Home', 'Startups': 'Startups', 'Sobre o projeto': 'About the project', 'Contato': 'Contact',
  'Explorar projetos': 'Explore projects', 'Fechar menu': 'Close menu', 'Abrir menu': 'Open menu',
  'Navegação principal': 'Main navigation', 'info startups · laboratório fecap': 'info startups · fecap lab',
  'Grandes ideias': 'Great ideas', 'começam': 'start', 'aqui.': 'here.',
  'Startups criadas por estudantes que transformam curiosidade em tecnologia, e tecnologia em novas possibilidades.': 'Startups created by students who turn curiosity into technology, and technology into new possibilities.',
  'Conheça as startups': 'Discover the startups', 'O projeto': 'The project', 'Curso de Informática': 'Information Technology Program',
  'ideia': 'idea', 'impacto': 'impact', 'Acenda': 'Spark', 'a próxima ideia.': 'the next idea.',
  'scroll para explorar': 'scroll to explore', 'O ponto de partida': 'The starting point',
  'Uma ideia muda quando encontra': 'An idea changes when it meets', 'outras ideias.': 'other ideas.',
  'O Info Startups é o espaço onde alunos do curso de Informática experimentam, colaboram e constroem soluções para o mundo real, turma após turma.': 'Info Startups is a space where Information Technology students experiment, collaborate and build solutions for the real world, class after class.',
  'Conheça nossa jornada': 'Discover our journey', 'Números do projeto': 'Project figures', 'startups em': 'startups in',
  'alunos envolvidos': 'students involved', 'possibilidades abertas': 'open possibilities', 'acervo de projetos': 'project collection',
  'Ideias com': 'Ideas with', 'nome próprio.': 'a name of their own.',
  'Explore as soluções criadas pelas diferentes turmas do curso.': 'Explore solutions created by different classes in the program.',
  'Selecionar ano da turma': 'Select class year', 'Turma': 'Class', 'Próximas turmas +': 'Upcoming classes +',
  'Filtrar startups': 'Filter startups', 'Todas': 'All', 'Tecnologia': 'Technology', 'Educação': 'Education',
  'Sustentabilidade': 'Sustainability', 'Negócios': 'Business', 'Ver projeto': 'View project',
  'Equipe de estudantes colaborando em um projeto de tecnologia': 'A team of students collaborating on a technology project',
  'feito por': 'made by', 'quem faz.': 'those who build.', 'Por trás das ideias': 'Behind the ideas',
  'Aprender é': 'Learning means', 'construir': 'building', 'junto.': 'together.',
  'Por trás de cada startup existe uma equipe aprendendo a fazer perguntas melhores, testar caminhos e dar forma ao que ainda não existe.': 'Behind every startup is a team learning to ask better questions, explore possibilities and give shape to what does not yet exist.',
  'Colaboração na prática': 'Collaboration in practice',
  'Do primeiro rascunho ao protótipo, cada passo é compartilhado.': 'From the first sketch to the prototype, every step is shared.',
  'próximo capítulo': 'next chapter', 'Uma ideia pode': 'An idea can', 'transformar o futuro.': 'transform the future.',
  'Fale com a gente': 'Get in touch', 'Colégio FECAP · Curso de Informática': 'FECAP School · Information Technology Program',
  'São Paulo, Brasil · acervo anual': 'São Paulo, Brazil · annual collection', 'Voltar ao topo ↑': 'Back to top ↑',
  'Voltar': 'Back', 'Foto não informada': 'Photo not provided', 'Site': 'Website',
  'Tema e idioma': 'Theme and language', 'Modo claro': 'Light mode', 'Modo escuro': 'Dark mode',
  'Ativar modo claro': 'Switch to light mode', 'Ativar modo escuro': 'Switch to dark mode',
  'Idioma': 'Language', 'Nenhuma startup encontrada para estes filtros.': 'No startups found for these filters.',
  'startup encontrada': 'startup found', 'startups encontradas': 'startups found',
  'Carregando startups...': 'Loading startups...',
  'Não foi possível carregar as startups.': 'The startups could not be loaded.',
  'Tentar novamente': 'Try again',
  'Nenhuma startup publicada no momento.': 'No startup is published at the moment.',
  'Nenhuma startup publicada nesta turma.': 'No startup is published for this class.',
  'Lâmpada 3D girável': 'Rotatable 3D light bulb',
  'Info Startups | Ideias que ganham forma': 'Info Startups | Ideas taking shape',
  'Info Startups: ideias que ganham forma pelas mãos dos alunos de Informática da FECAP.': 'Info Startups: ideas taking shape through the work of FECAP Information Technology students.',
};

export const translations = { pt: Object.fromEntries(Object.keys(en).map(key => [key, key])), en };
export const translate = (language, key) => translations[language]?.[key] ?? translations.pt[key] ?? key;

export const heroHeadlines = {
  pt: { fixedText: 'Grandes ideias', phrases: ['começam aqui.', 'conectam pessoas.', 'ganham forma.', 'transformam o futuro.'] },
  en: { fixedText: 'Great ideas', phrases: ['start here.', 'connect people.', 'take shape.', 'transform the future.'] },
};

export function getLocalizedText(value, language) {
  if (value == null) return '';
  if (typeof value !== 'object' || Array.isArray(value)) return value;
  return value[language] ?? value.pt ?? '';
}

export const accessibleText = {
  pt: { logo: name => `Logo da ${name}`, team: name => `Equipe da ${name} reunida`, socials: name => `Redes de ${name}`, social: (label, name) => `${label} de ${name}` },
  en: { logo: name => `${name} logo`, team: name => `${name} team together`, socials: name => `${name} social links`, social: (label, name) => `${name} on ${label}` },
};

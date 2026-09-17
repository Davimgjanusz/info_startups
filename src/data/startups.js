import apponoLogo from '../assets/appono-logo.png';
import apponoTeam from '../assets/appono-equipe.jpg';
import apponoTeamTwo from '../assets/appono-equipe-2.jpg';
import apponoTeamThree from '../assets/appono-equipe-3.jpg';
import apponoTeamFour from '../assets/appono-equipe-4.jpg';
import selectioLogo from '../assets/selectio-logo.png';
import selectioTeam from '../assets/selectio-equipe.png';
import selectioKalil from '../assets/selectio-kalil.png';
import selectioGustavo from '../assets/selectio-gustavo.png';
import selectioMarcos from '../assets/selectio-marcos.png';
import bixucoLogo from '../assets/bixuco-logo.png';
import bixucoTeam from '../assets/bixuco-equipe.png';
import bixucoArthur from '../assets/bixuco-arthur.png';
import bixucoSophia from '../assets/bixuco-sophia.png';
import bixucoYasmin from '../assets/bixuco-yasmin.png';
import facosLogo from '../assets/facos-logo.svg';
import condomitLogo from '../assets/condomit-logo.png';
import recureLogo from '../assets/recure-logo.png';
import recureTeam from '../assets/recure-equipe.jpg';
import recureFernando from '../assets/recure-fernando.jpg';
import recurePedro from '../assets/recure-pedro.jpg';
import recureRafael from '../assets/recure-rafael.jpg';
import recureDaniel from '../assets/recure-daniel.jpg';

const selectio = {
  id: 'selectio',
  name: 'Selectio',
  year: '2026',
  category: 'Tecnologia',
  number: '02',
  description: 'Plataforma web de recrutamento por indicação que organiza vagas, candidatos, processos seletivos e recompensas.',
  accent: 'selectio',
  tags: ['Recrutamento', 'Indicações', 'Plataforma'],
  logo: selectioLogo,
  teamImage: selectioTeam,
  tagline: 'Recrutamento por indicação · vagas, talentos e recompensas',
  segment: 'recrutamento por indicação',
  headline: { text: 'Indicações que', emphasis: 'conectam talentos.' },
  paragraphs: [
    'A Selectio é uma plataforma web para operações de recrutamento baseadas em indicação. A solução reúne a publicação de vagas, o cadastro de candidatos e o acompanhamento de processos seletivos, com áreas específicas para empresas e indicadores. Empresas gerenciam oportunidades, candidatos e entrevistas, enquanto indicadores cadastram talentos e acompanham suas indicações.',
    'O processo inclui o acompanhamento de cada candidato, da indicação à contratação, e o agendamento de entrevistas com histórico e notificações. O ranking de compatibilidade por vaga utiliza critérios ponderados, evidências e revisão humana. A plataforma também organiza as recompensas por indicação, com integração ao Mercado Pago e registro de transações.',
  ],
  features: [
    { title: 'Recrutamento por indicação', description: 'Vagas, cadastro de talentos e acompanhamento das etapas do processo seletivo em uma única plataforma.' },
    { title: 'Compatibilidade com critérios', description: 'Ranking por vaga com critérios ponderados, evidências, alertas e revisão humana.' },
    { title: 'Gestão de recompensas', description: 'Pagamentos integrados ao Mercado Pago, registro de transações e acompanhamento financeiro das indicações.' },
  ],
  teamMembers: [
    {
      name: 'Kalil Barreto', role: 'Diretor Administrativo', image: selectioKalil,
      instagram: 'https://www.instagram.com/kalil_mitre',
      github: 'https://github.com/kalilmtb',
      linkedin: 'https://www.linkedin.com/in/kalil-mitre/',
    },
    {
      name: 'Gustavo de Amorim', role: 'Diretor de Tecnologias', image: selectioGustavo,
      instagram: 'https://www.instagram.com/amorimnr',
      github: 'https://github.com/amorimnr',
      linkedin: 'https://www.linkedin.com/gustavodeamorim?_l=pt_BR',
    },
    {
      name: 'Marcos Peyerl', role: 'Diretor de Projetos', image: selectioMarcos,
      instagram: 'https://www.instagram.com/peyerlmarcos/',
      github: 'https://github.com/MarcosPeyerl-MVSP',
      linkedin: 'https://www.linkedin.com/in/marcos-peyerl-683a5025b/',
    },
  ],
  socials: {
    instagram: 'https://www.instagram.com/selectio_/',
    linkedin: 'https://www.linkedin.com/company/selectioltda/posts/?feedView=all',
    website: 'https://selectio.app.br/',
  },
};

const startupSource = {
  '2026': [
    {
      id: 'appono',
      name: 'Appono',
      category: 'Tecnologia',
      number: '01',
      description: 'Plataforma web que conecta clientes e restaurantes com rotina alimentar personalizada e pedidos antecipados.',
      accent: 'amber',
      tags: ['Foodtech', 'Plataforma', 'Rotina alimentar'],
      logo: apponoLogo,
      teamImage: apponoTeam,
      tagline: 'Foodtech · tecnologia para uma alimentação mais inteligente',
      segment: 'foodtech',
      headline: { text: 'Alimentação que', emphasis: 'entende você.' },
      paragraphs: [
        'A Appono é uma plataforma digital que conecta pessoas e restaurantes em uma experiência de alimentação mais personalizada, previsível e eficiente. A solução transforma preferências, objetivos, orçamento e restrições alimentares em recomendações práticas para a rotina de cada cliente.',
        'Com a Appono Rotina, o usuário planeja sua semana e encontra refeições e restaurantes alinhados ao seu perfil. Já o pedido antecipado permite reservar a refeição antes da chegada, reduzindo o tempo de espera e ajudando o restaurante a organizar melhor sua produção e seu fluxo de atendimento.',
      ],
      features: [
        { title: 'Rotina personalizada', description: 'Alimentação mais adequada ao perfil do cliente.' },
        { title: 'Pedido antecipado', description: 'Menos espera e mais previsibilidade para restaurantes.' },
        { title: 'Experiência integrada', description: 'Conexão mais inteligente entre cliente e negócio.' },
      ],
      teamMembers: [
        {
          name: 'Guilherme Yuji', role: 'Diretor de tecnologia', image: apponoTeamTwo,
          instagram: 'https://www.instagram.com/gui.matsune/',
          linkedin: 'https://www.linkedin.com/in/guilherme-yuji-1ab6b53b7/',
          github: 'https://github.com/GuiYuji123',
        },
        {
          name: 'Davi Janusz', role: 'Diretor de projeto', image: apponoTeamThree,
          instagram: 'https://www.instagram.com/davi.mgarcia/',
          linkedin: 'https://www.linkedin.com/in/davi-janusz-349271337/',
          github: 'https://github.com/Davimgjanusz',
        },
        {
          name: 'João Victor', role: 'Diretor administrativo', image: apponoTeamFour,
          instagram: 'https://www.instagram.com/johnny.cfj02/',
          linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-victor-macedo-3963153b6/',
          github: null,
        },
      ],
      socials: {
        instagram: 'https://www.instagram.com/appono.br/',
        linkedin: 'https://linkedin.com/company/appono-br/',
        website: 'https://appono.vercel.app/',
      },
    },
    selectio,
    {
      id: 'bixuco',
      name: 'Bixuco',
      category: 'Tecnologia',
      number: '03',
      description: 'Startup brasileira que combina produto físico, tecnologia e plataforma digital para criar experiências voltadas ao contexto familiar.',
      accent: 'bixuco',
      tags: ['Famílias', 'Produto conectado', 'Plataforma digital'],
      logo: bixucoLogo,
      teamImage: bixucoTeam,
      tagline: 'Produto físico · plataforma digital · experiência familiar',
      segment: 'famílias e tecnologia',
      headline: { text: 'Produto físico com', emphasis: 'experiência digital.' },
      paragraphs: [
        'A Bixuco atua na interseção entre tecnologia, inovação e desenvolvimento de produtos, com a proposta de criar soluções voltadas ao contexto familiar. Seu principal produto em desenvolvimento é a pelúcia Bixuco, integrada a uma proposta tecnológica e a uma plataforma digital própria.',
        'O projeto busca transformar um produto físico em uma experiência conectada ao ambiente digital. Para isso, trabalha em infraestrutura de front-end, back-end, integração de APIs e gerenciamento de dados, além de frentes estratégicas como finanças, comunicação, planejamento e identidade visual.',
      ],
      features: [
        { title: 'Pelúcia conectada', description: 'Produto físico pensado para ampliar possibilidades de interação no ambiente familiar.' },
        { title: 'Plataforma própria', description: 'Base digital com front-end, back-end, APIs e dados para sustentar a experiência.' },
        { title: 'Modelo escalável', description: 'Proposta de valor para unir produto, tecnologia e experiência do usuário no mercado brasileiro.' },
      ],
      teamMembers: [
        {
          name: 'Arthur Regiani Delgado Rosa De Oliveira', role: 'Membro da equipe', image: bixucoArthur,
          linkedin: 'https://www.linkedin.com/search/results/people/?keywords=Arthur%20Regiani',
          email: 'a.regianidelgado@gmail.com',
        },
        {
          name: 'Sophia Silva Freitas', role: 'Membro da equipe', image: bixucoSophia,
          linkedin: 'https://www.linkedin.com/search/results/people/?keywords=Sophia%20Freitas',
          email: 'suelisophia21@gmail.com',
        },
        {
          name: 'Yasmin Bertoni', role: 'Membro da equipe', image: bixucoYasmin,
          linkedin: 'https://www.linkedin.com/search/results/people/?keywords=Yasmin%20Bertoni',
          email: 'bertoniyasmin@gmail.com',
        },
      ],
      socials: {
        instagram: 'https://www.instagram.com/bixu.co/',
        linkedin: 'https://www.linkedin.com/in/bixuco-oficial-4500b1402/',
      },
    },
    {
      id: 'facos',
      name: 'Faços',
      category: 'Tecnologia',
      number: '04',
      description: 'Startup que conecta prestadores de serviço aos clientes que buscam soluções para necessidades do dia a dia.',
      accent: 'facos',
      tags: ['Serviços locais', 'Conexão', 'Marketplace'],
      logo: facosLogo,
      tagline: 'Serviços locais · conexão prática · comunidade',
      segment: 'serviços locais',
      headline: { text: 'Serviços próximos', emphasis: 'conectados a quem precisa.' },
      paragraphs: [
        'A Faços é uma startup criada para aproximar prestadores de serviço de clientes que procuram apoio para demandas do dia a dia. A proposta é tornar mais simples encontrar, conhecer e entrar em contato com profissionais disponíveis.',
        'Com foco em conexão local e praticidade, a solução organiza a ponte entre quem oferece um serviço e quem precisa contratá-lo. A marca usa uma identidade visual inspirada em localização, caminhos e colmeia para reforçar a ideia de rede, proximidade e colaboração.',
      ],
      features: [
        { title: 'Conexão local', description: 'Aproxima clientes de prestadores de serviço disponíveis na região.' },
        { title: 'Busca prática', description: 'Facilita encontrar ajuda para necessidades e tarefas do cotidiano.' },
        { title: 'Rede de confiança', description: 'Organiza contatos, serviços e oportunidades em uma experiência simples.' },
      ],
      teamMembers: [],
      socials: {
        instagram: 'https://www.instagram.com/facos.oficial?stkn=MTU0cm5ibHpvejI1YQ==',
        github: 'https://github.com/Pedro-Arruda-Az/Fa-os',
        website: 'https://facos.netlify.app/',
      },
    },
    {
      id: 'condomit',
      name: 'Condomit',
      category: 'Tecnologia',
      number: '05',
      description: 'Plataforma digital que reúne comunicação, serviços e decisões para simplificar a gestão de condomínios.',
      accent: 'condomit',
      tags: ['Condomínios', 'Gestão', 'Comunicação'],
      logo: condomitLogo,
      tagline: 'O app do seu condomínio',
      segment: 'gestão condominial',
      headline: { text: 'Seu condomínio', emphasis: 'em um só lugar.' },
      paragraphs: [
        'A Condomit centraliza a comunicação, a gestão e os serviços do condomínio em um ambiente digital para síndicos, administradores e moradores. Comunicados, eventos, reservas, visitantes e manutenções ficam organizados na mesma plataforma.',
        'Votações, reuniões e assembleias também fazem parte da proposta, facilitando a participação e a tomada de decisões. Ao reunir essas rotinas, a Condomit busca reduzir a dependência de grupos de mensagens, planilhas e processos manuais.',
      ],
      features: [
        { title: 'Rotina integrada', description: 'Comunicados, eventos, reservas, visitantes e manutenção em um único ambiente.' },
        { title: 'Decisões participativas', description: 'Votações, reuniões e assembleias conectadas à gestão do condomínio.' },
        { title: 'Gestão mais clara', description: 'Informações e processos organizados para moradores, síndicos e administradores.' },
      ],
      teamMembers: [
        { name: 'Giancarlo', role: 'CEO · Desenvolvimento full stack', instagram: 'https://www.instagram.com/gian.munarin/' },
        { name: 'Gabriella', role: 'CMO · Marketing, finanças e front-end', instagram: 'https://www.instagram.com/Gab_l1no/' },
        { name: 'Gustavo', role: 'COO · Operações, documentação e back-end', instagram: 'https://www.instagram.com/gustavolsilva09/' },
      ],
      socials: {
        instagram: 'https://www.instagram.com/condomit.ofc/',
        website: 'https://condomit.netlify.app/',
      },
    },
    {
      id: 'recure',
      name: 'RECURE',
      category: 'Tecnologia',
      number: '06',
      description: 'Plataforma digital de fisioterapia que conecta profissionais e pacientes durante a recuperação.',
      accent: 'recure',
      tags: ['Fisioterapia', 'Tratamento', 'Evolução'],
      logo: recureLogo,
      teamImage: recureTeam,
      tagline: 'Fisioterapia · acompanhamento · evolução',
      segment: 'fisioterapia digital',
      headline: { text: 'Recuperação com', emphasis: 'acompanhamento.' },
      paragraphs: [
        'A RECURE é uma plataforma digital para fisioterapia que conecta profissionais e pacientes. Ela facilita o acompanhamento dos tratamentos e a realização dos exercícios ao longo da recuperação.',
        'A solução também ajuda a monitorar a evolução de cada paciente, com a proposta de tornar o processo de recuperação mais eficiente, prático e motivador.',
      ],
      features: [
        { title: 'Conexão profissional-paciente', description: 'Um espaço digital para acompanhar o tratamento de fisioterapia.' },
        { title: 'Exercícios acompanhados', description: 'Apoio para realizar os exercícios durante a recuperação.' },
        { title: 'Evolução monitorada', description: 'Visibilidade do progresso para pacientes e profissionais.' },
      ],
      teamMembers: [
        { name: 'Fernando Bolonha', role: 'Desenvolvedor full stack', image: recureFernando },
        { name: 'Pedro de Macedo', role: 'Desenvolvedor full stack', image: recurePedro },
        { name: 'Rafael Rodrigues', role: 'Diretor de Marketing', image: recureRafael },
        { name: 'Daniel Martins', role: 'Diretor Financeiro', image: recureDaniel },
      ],
      socials: {
        instagram: 'https://www.instagram.com/recure.fisio/',
        linkedin: 'https://www.linkedin.com/company/recurephysio/about/',
        website: 'https://recurephysio.com/',
      },
    },
  ],
};

const englishContent = {
  appono: {
    description: 'A web platform connecting customers and restaurants through personalized meal routines and advance ordering.',
    tags: ['Foodtech', 'Platform', 'Meal routine'],
    tagline: 'Foodtech · technology for smarter eating',
    segment: 'foodtech',
    headline: { text: 'Food that', emphasis: 'understands you.' },
    paragraphs: [
      'Appono is a digital platform connecting people and restaurants through a more personalized, predictable and efficient dining experience. The solution turns preferences, goals, budgets and dietary restrictions into practical recommendations for each customer’s routine.',
      'With Appono Rotina, users plan their week and find meals and restaurants aligned with their profile. Advance ordering lets them reserve a meal before arriving, reducing waiting times and helping restaurants better organize production and service.',
    ],
    features: [
      { title: 'Personalized routine', description: 'Meals better suited to each customer’s profile.' },
      { title: 'Advance ordering', description: 'Less waiting and greater predictability for restaurants.' },
      { title: 'Integrated experience', description: 'A smarter connection between customers and businesses.' },
    ],
    roles: ['Technology Director', 'Project Director', 'Administrative Director'],
  },
  selectio: {
    description: 'A referral recruitment web platform that organizes job openings, candidates, hiring processes and rewards.',
    tags: ['Recruitment', 'Referrals', 'Platform'],
    tagline: 'Referral recruitment · jobs, talent and rewards',
    segment: 'referral recruitment',
    headline: { text: 'Referrals that', emphasis: 'connect talent.' },
    paragraphs: [
      'Selectio is a web platform for referral-based recruitment operations. The solution brings together job posting, candidate registration and hiring process tracking, with dedicated areas for companies and referrers. Companies manage opportunities, candidates and interviews, while referrers register talent and track their referrals.',
      'The process includes tracking each candidate from referral to hiring, and scheduling interviews with history and notifications. Compatibility rankings for each job use weighted criteria, evidence and human review. The platform also organizes referral rewards, with Mercado Pago integration and transaction records.',
    ],
    features: [
      { title: 'Referral recruitment', description: 'Job openings, talent registration and hiring stage tracking in a single platform.' },
      { title: 'Criteria-based matching', description: 'Rankings for each job with weighted criteria, evidence, alerts and human review.' },
      { title: 'Reward management', description: 'Payments integrated with Mercado Pago, transaction records and financial tracking of referrals.' },
    ],
    roles: ['Administrative Director', 'Technology Director', 'Projects Director'],
  },
  bixuco: {
    description: 'A Brazilian startup combining a physical product, technology and a digital platform to create experiences for family contexts.',
    tags: ['Families', 'Connected product', 'Digital platform'],
    tagline: 'Physical product · digital platform · family experience',
    segment: 'families and technology',
    headline: { text: 'A physical product with', emphasis: 'a digital experience.' },
    paragraphs: [
      'Bixuco works at the intersection of technology, innovation and product development, with the goal of creating solutions for family contexts. Its main product in development is the Bixuco plush toy, integrated with a technology proposal and its own digital platform.',
      'The project aims to transform a physical product into an experience connected to the digital environment. To do so, it is developing front-end and back-end infrastructure, API integration and data management, as well as strategic areas such as finance, communication, planning and visual identity.',
    ],
    features: [
      { title: 'Connected plush toy', description: 'A physical product designed to expand interaction possibilities in family environments.' },
      { title: 'Owned platform', description: 'A digital base with front end, back end, APIs and data to support the experience.' },
      { title: 'Scalable model', description: 'A value proposition that combines product, technology and user experience for the Brazilian market.' },
    ],
    roles: ['Team Member', 'Team Member', 'Team Member'],
  },
  facos: {
    description: 'A startup that connects service providers with customers looking for everyday solutions.',
    tags: ['Local services', 'Connection', 'Marketplace'],
    tagline: 'Local services · practical connection · community',
    segment: 'local services',
    headline: { text: 'Nearby services', emphasis: 'connected to those who need them.' },
    paragraphs: [
      'Faços was created to bring service providers closer to customers looking for support with everyday needs. Its goal is to make it simpler to find, learn about and contact available professionals.',
      'Focused on local connection and practicality, the solution builds a bridge between those offering a service and those who need to hire one. The brand identity draws from location, paths and honeycomb imagery to reinforce network, proximity and collaboration.',
    ],
    features: [
      { title: 'Local connection', description: 'Brings customers closer to service providers available in their area.' },
      { title: 'Practical search', description: 'Makes it easier to find help for everyday needs and tasks.' },
      { title: 'Trusted network', description: 'Organizes contacts, services and opportunities in a simple experience.' },
    ],
    roles: [],
  },
  condomit: {
    description: 'A digital platform bringing communication, services and decisions together to simplify condominium management.',
    tags: ['Condominiums', 'Management', 'Communication'],
    tagline: 'Your condominium app',
    segment: 'condominium management',
    headline: { text: 'Your condominium', emphasis: 'in one place.' },
    paragraphs: [
      'Condomit brings condominium communication, management and services into one digital space for residents, managers and administrators. Announcements, events, bookings, visitors and maintenance are organized in the same platform.',
      'Voting, meetings and assemblies are also part of the proposal, making participation and decisions easier. By bringing these routines together, Condomit aims to reduce reliance on messaging groups, spreadsheets and manual processes.',
    ],
    features: [
      { title: 'Connected routines', description: 'Announcements, events, bookings, visitors and maintenance in one place.' },
      { title: 'Shared decisions', description: 'Voting, meetings and assemblies connected to condominium management.' },
      { title: 'Clearer management', description: 'Organized information and processes for residents, managers and administrators.' },
    ],
    roles: ['CEO · Full stack development', 'CMO · Marketing, finance and front end', 'COO · Operations, documentation and back end'],
  },
  recure: {
    description: 'A digital physiotherapy platform connecting professionals and patients throughout recovery.',
    tags: ['Physiotherapy', 'Treatment', 'Progress'],
    tagline: 'Physiotherapy · follow-up · progress',
    segment: 'digital physiotherapy',
    headline: { text: 'Recovery with', emphasis: 'guidance.' },
    paragraphs: [
      'RECURE is a digital physiotherapy platform connecting professionals and patients. It helps them follow treatment plans and complete exercises throughout recovery.',
      'The solution also helps monitor each patient’s progress, aiming to make recovery more efficient, practical and motivating.',
    ],
    features: [
      { title: 'Professional-patient connection', description: 'A digital space to follow physiotherapy treatment.' },
      { title: 'Guided exercises', description: 'Support for completing exercises during recovery.' },
      { title: 'Progress tracking', description: 'Visibility into recovery progress for patients and professionals.' },
    ],
    roles: ['Full stack developer', 'Full stack developer', 'Marketing Director', 'Finance Director'],
  },
};

// Keep identity, filter values and links independent of the selected language.
export const startupsByYear = Object.fromEntries(Object.entries(startupSource).map(([year, startups]) => [year,
  startups.map(startup => {
    const english = englishContent[startup.id] ?? {};
    const localized = { ...startup };
    for (const field of ['description', 'tags', 'tagline', 'segment', 'headline', 'paragraphs', 'features']) {
      localized[field] = { pt: startup[field], en: english[field] ?? startup[field] };
    }
    localized.teamMembers = startup.teamMembers.map((member, index) => ({
      ...member, role: { pt: member.role, en: english.roles?.[index] ?? member.role },
    }));
    return localized;
  }),
]));

export const years = Object.keys(startupsByYear).sort((firstYear, secondYear) => secondYear.localeCompare(firstYear));
export const categories = [...new Set([
  'Todas', 'Tecnologia', 'Educação', 'Sustentabilidade', 'Negócios',
  ...Object.values(startupsByYear).flat().map((startup) => startup.category).filter(Boolean),
])];

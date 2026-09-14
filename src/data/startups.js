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
        website: '#contato',
      },
    },
    selectio,
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

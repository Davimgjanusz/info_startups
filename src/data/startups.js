export const categories = ['Todas', 'Tecnologia', 'Educação', 'Sustentabilidade', 'Negócios'];

export const startupsByYear = {
  '2026': [
    {
      name: 'Appono',
      category: 'Tecnologia',
      number: '01',
      description: 'Plataforma web que conecta clientes e restaurantes com rotina alimentar personalizada e pedidos antecipados.',
      accent: 'amber',
      tags: ['Foodtech', 'Plataforma', 'Rotina alimentar'],
    },
  ],
};

export const years = Object.keys(startupsByYear).sort((firstYear, secondYear) => secondYear.localeCompare(firstYear));

const packConfigurations = {
  evo: {
    numCards: 255,
    rareRange: [1, 95],
    uncommonRange: [96, 175],
    santuarioRange: [1, 20],
    imagePrefix: 'evo',
    dropRates: { common: 6, uncommon: 4, rare: 1 },
  },
  dev: {
    numCards: 280,
    rareRange: [1, 100],
    uncommonRange: [101, 190],
    santuarioRange: [1, 24],
    imagePrefix: 'dev',
    dropRates: { common: 6, uncommon: 4, rare: 1 },
  },
  sub: {
    numCards: 200,
    rareRange: [1, 76],
    uncommonRange: [77, 139],
    santuarioRange: [1, 12],
    imagePrefix: 'sub',
    dropRates: { common: 6, uncommon: 4, rare: 1 },
  },
  shk: {
    numCards: 250,
    rareRange: [1, 121],
    uncommonRange: [122, 190],
    santuarioRange: [25, 40],
    imagePrefix: 'shk',
    dropRates: { common: 6, uncommon: 4, rare: 1 },
  },
  col: {
    numCards: 216,
    rareRange: [1, 79],
    uncommonRange: [80, 143],
    santuarioList: [1, 2, 3, 4, 80, 81, 82, 83, 144, 145, 146, 147],
    imagePrefix: 'col',
    dropRates: { common: 6, uncommon: 4, rare: 1 },
  },
  avl: {
    numCards: 60,
    rareList: [1, 16, 31, 46],
    santuarioList: [1, 16, 31, 46],
    imagePrefix: 'avl',
    dropRates: { uncommon: 4, rare: 1 },
  },
  cal: {
    numCards: 120,
    rareRange: [1, 19],
    rareList: [28, 29, 38, 39, 48, 49, 62, 66, 70, 74, 78, 80, 81],
    santuarioRange: [6, 17],
    imagePrefix: 'cal',
    dropRates: { uncommon: 4, rare: 1 },
  },
  promos: {
    numCards: 129,
    rareRange: [1, 129],
    santuarioList: [1, 2, 3, 4, 8,9,10,11,41,43,44,45,56,57,58,59,124],
    imagePrefix: 'promos',
    dropRates: { rare: 10 },
  },
};

export default packConfigurations;

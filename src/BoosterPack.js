import React, { useState, useEffect } from 'react';
import Card from './Card';
import './BoosterPack.css';

const BoosterPack = ({ packType }) => {
  const [cards, setCards] = useState([]);

  const packConfigurations = {
    evo: {
      numCards: 255,
      rareRange: [1, 95],
      uncommonRange: [96, 175],
      santuarioRange:[1,20],
      imagePrefix: 'evo',
      dropRates: { common: 6, uncommon: 4, rare: 1 }
    },
    dev: {
      numCards: 280,
      rareRange: [1, 100],
      uncommonRange: [101, 190],
      santuarioRange:[1,24],
      imagePrefix: 'dev',
      dropRates: { common: 6, uncommon: 4, rare: 1 }
    },
    sub: {
      numCards: 200,
      rareRange: [1, 76],
      uncommonRange: [77, 139],
      santuarioRange:[1,12],
      imagePrefix: 'sub',
      dropRates: { common: 6, uncommon: 4, rare: 1 }
    },
    shk: {
      numCards: 250,
      rareRange: [1, 121],
      uncommonRange: [122, 190],
      santuarioRange:[25,40],
      imagePrefix: 'shk',
      dropRates: { common: 6, uncommon: 4, rare: 1 }
    },
    col: {
      numCards: 216,
      rareRange: [1, 79],
      uncommonRange: [80, 143],
      santuarioList:[1, 2, 3, 4, 80, 81, 82, 83, 144, 145, 146, 147],
      imagePrefix: 'col',
      dropRates: { common: 6, uncommon: 4, rare: 1 }
    },
    avl: {
      numCards: 60,
      rareList: [1, 16, 31, 46],
      santuarioList:[1, 16, 31, 46],
      imagePrefix: 'avl',
      dropRates: { uncommon: 4, rare: 1 }
    },
    cal: {
      numCards: 120,
      rareRange: [1, 19],
      rareList: [28, 29, 38, 39, 48, 49, 62, 66, 70, 74, 78, 80, 81],
      santuarioRange:[6,17],
      imagePrefix: 'cal',
      dropRates: { uncommon: 4, rare: 1 }
    }
  };

  const { dropRates } = packConfigurations[packType] || {};

  const generateCardData = (packType) => {
    const config = packConfigurations[packType];
    if (!config) return [];

    const { numCards, rareRange, uncommonRange, rareList, santuarioList, santuarioRange, imagePrefix } = config;

    const cardData = [];
    for (let i = 1; i <= numCards; i++) {
      let rarity = 'common';

      if (rareList && rareList.includes(i)) {
        rarity = 'rare';
      } else if (rareRange && i >= rareRange[0] && i <= rareRange[1]) {
        rarity = 'rare';
      } else if (uncommonRange && i >= uncommonRange[0] && i <= uncommonRange[1]) {
        rarity = 'uncommon';
      } else if (rareList && !rareList.includes(i)) {
        rarity = 'uncommon';
      }

      let bg = 'back';

      if (santuarioList && santuarioList.includes(i)) {
        bg = 'back_white';
      } else if (santuarioRange && i >= santuarioRange[0] && i <= santuarioRange[1]) {
        bg = 'back_white';
      }

      let imageName = `${String(i).padStart(3, '0')}.jpg`;
      cardData.push({ id: i, image: `${imagePrefix}/${imageName}`,bg, rarity });
    }
    return cardData;
  };

  const shkCommonCards = generateCardData('shk').filter((card) => card.rarity === 'common');

  const openPack = () => {
    const cardData = generateCardData(packType);
    if (!cardData.length) return;

    const newPack = [];
    const rares = cardData.filter((card) => card.rarity === 'rare');
    const uncommons = cardData.filter((card) => card.rarity === 'uncommon');
    const commons = cardData.filter((card) => card.rarity === 'common');

    const rates = dropRates || { common: 0, uncommon: 0, rare: 0 };

    const getRandomCards = (cardsArray, count) => {
      const selectedCards = [];
      const cardIndexes = new Set();
      while (cardIndexes.size < count && cardIndexes.size < cardsArray.length) {
        const randomIndex = Math.floor(Math.random() * cardsArray.length);
        if (!cardIndexes.has(randomIndex)) {
          cardIndexes.add(randomIndex);
          selectedCards.push(cardsArray[randomIndex]);
        }
      }
      return selectedCards;
    };

    newPack.push(...getRandomCards(rares, rates.rare));
    newPack.push(...getRandomCards(uncommons, rates.uncommon));

    if ((packType === 'avl' || packType === 'cal') && shkCommonCards.length > 0) {
      newPack.push(...getRandomCards(shkCommonCards, 6));
    } else if (rates.common > 0 && commons.length > 0) {
      newPack.push(...getRandomCards(commons, rates.common));
    }

    setCards([]);
    setTimeout(() => {
      setCards(newPack);
    }, 0);
  };

  return (
    <div className="booster-pack">
      <div className="card-container">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            id={`card-${card.id}`}
            background={card.bg}
            image={card.image}
            rarity={card.rarity}
            flipDelay={(index+2) * 100} // Each card will flip one by one with a 100ms delay
          />
        ))}
      </div>
    </div>
  );
};

export default BoosterPack;

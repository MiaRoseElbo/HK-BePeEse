import React, { useState } from 'react';
import Card from './Card';
import './BoosterPack.css';

const BoosterPack = ({ packType }) => {
  const [cards, setCards] = useState([]);

  // Define configurations for each pack type
  const packConfigurations = {
    evo: {
      numCards: 255,
      rareRange: [1, 95],
      uncommonRange: [96, 175],
      imagePrefix: 'evo'
    },
    dev: {
      numCards: 280,
      rareRange: [1, 100],
      uncommonRange: [101, 190],
      imagePrefix: 'dev'
    },
    sub: {
      numCards: 200,
      rareRange: [1, 76],
      uncommonRange: [77, 139],
      imagePrefix: 'sub'
    },
    shk: {
      numCards: 250,
      rareRange: [1, 121],
      uncommonRange: [122, 190],
      imagePrefix: 'shk'
    },
    col: {
      numCards: 216,
      rareRange: [1, 79],
      uncommonRange: [80, 143],
      imagePrefix: 'col'
    },
    avl: {
      numCards: 60,
      rareRange: [1, 60],
      uncommonRange: [61, 130],
      imagePrefix: 'avl'
    },
    cal: {
      numCards: 120,
      rareRange: [1, 60],
      uncommonRange: [61, 120],
      imagePrefix: 'cal'
    },
    // Add more configurations for other booster packs if needed
  };

  // Extract configuration based on packType
  const { numCards, rareRange, uncommonRange } = packConfigurations[packType] || {};

  const generateCardData = () => {
    const cardData = [];
    for (let i = 1; i <= numCards; i++) {
      let rarity = 'common';
      if (i >= rareRange[0] && i <= rareRange[1]) rarity = 'rare';
      else if (i >= uncommonRange[0] && i <= uncommonRange[1]) rarity = 'uncommon';

      const imageName = `${String(i).padStart(3, '0')}.jpg`;
      
      cardData.push({ id: i, image: `${packType}/${imageName}`, rarity });
    }
    return cardData;
  };

  const cardData = generateCardData();

  const dropRates = {
    evo: { common: 6, uncommon: 4, rare: 1 },
    dev: { common: 6, uncommon: 4, rare: 1 },
    sub: { common: 6, uncommon: 4, rare: 1 },
    shk: { common: 6, uncommon: 4, rare: 1 },
    col: { common: 6, uncommon: 4, rare: 1 },
    avl: { common: 0, uncommon: 0, rare: 11 },
    cal: { common: 0, uncommon: 0, rare: 11 }
    // Add more configurations for other booster packs if needed
  };

  const openPack = () => {
    const newPack = [];
    const rares = cardData.filter((card) => card.rarity === 'rare');
    const uncommons = cardData.filter((card) => card.rarity === 'uncommon');
    const commons = cardData.filter((card) => card.rarity === 'common');

    const rates = dropRates[packType] || { common: 0, uncommon: 0, rare: 0 };

    const getRandomCards = (cardsArray, count) => {
      const selectedCards = [];
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * cardsArray.length);
        selectedCards.push(cardsArray[randomIndex]);
      }
      return selectedCards;
    };

    // Add rare cards
    newPack.push(...getRandomCards(rares, rates.rare));

    // Add uncommon cards
    newPack.push(...getRandomCards(uncommons, rates.uncommon));

    // Add common cards
    newPack.push(...getRandomCards(commons, rates.common));

    // Reset the cards before setting the new ones
    setCards([]);
    setTimeout(() => {
      setCards(newPack);
    }, 0);
  };

  return (
    <div className="booster-pack">
      <button onClick={openPack}>Abrir Sobre</button>
      <div className="card-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            image={card.image}
            rarity={card.rarity}
          />
        ))}
      </div>
    </div>
  );
};

export default BoosterPack;
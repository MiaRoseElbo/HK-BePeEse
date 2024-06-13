import React, { useState, useEffect } from 'react';
import Card from './Card';
import './BoosterPack.css';

const BoosterPack = ({ packType }) => {
  const [cards, setCards] = useState([]);
  
  // Define openPack inside useEffect
  useEffect(() => {
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

    openPack(); // Call openPack immediately when packType changes

    // Ensure openPack is included in the dependencies array to run when openPack changes
  }, [packType, openPack]);

  // Define packConfigurations and generateCardData functions as before

  const shkCommonCards = generateCardData('shk').filter((card) => card.rarity === 'common');

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

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Card from './Card';
import './BoosterPack.css';
import packConfigurations from './packConfigurations';
import { generateCardData, getRandomCards } from './utils';

const BoosterPack = ({ packType }) => {
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);

  const shkCommonCards = useMemo(
    () => generateCardData('shk', packConfigurations).filter((card) => card.rarity === 'common'),
    []
  );

  const openPack = useCallback(() => {
    const cardData = generateCardData(packType, packConfigurations);
    if (!cardData.length) return;

    const newPack = [];
    const rares = cardData.filter((card) => card.rarity === 'rare');
    const uncommons = cardData.filter((card) => card.rarity === 'uncommon');
    const commons = cardData.filter((card) => card.rarity === 'common');

    const dropRates = packConfigurations[packType]?.dropRates || { common: 0, uncommon: 0, rare: 0 };

    newPack.push(...getRandomCards(rares, dropRates.rare));
    newPack.push(...getRandomCards(uncommons, dropRates.uncommon));

    if ((packType === 'avl' || packType === 'cal') && shkCommonCards.length > 0) {
      newPack.push(...getRandomCards(shkCommonCards, 6));
    } else if (dropRates.common > 0 && commons.length > 0) {
      newPack.push(...getRandomCards(commons, dropRates.common));
    }

    setCards(newPack);
  }, [packType, shkCommonCards]);

  useEffect(() => {
    openPack();
  }, [packType, openPack]);

  const handleCardClick = (card) => {
    setSavedCards((prevSavedCards) => [...prevSavedCards, card]);
    openPack();
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
            flipDelay={(index + 2) * 100}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
      <div className="saved-cards">
        <h2>Cartas guardadas</h2>
        <div className="saved-card-container">
          {savedCards.map((card) => (
            <Card
              key={card.id}
              id={`saved-card-${card.id}`}
              image={card.image}
              rarity={card.rarity}
              flipDelay={0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoosterPack;

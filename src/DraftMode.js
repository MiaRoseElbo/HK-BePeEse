import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Card from './Card';
import './BoosterPack.css';
import packConfigurations from './packConfigurations';
import { generateCardData, getRandomCards } from './utils';

const DraftMode = () => {
  const [selectedPackTypes, setSelectedPackTypes] = useState({});
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [draftStep, setDraftStep] = useState(0);
  const [selectionCounts, setSelectionCounts] = useState({ rare: 0, uncommon: 0, common: 0 });

  const shkCommonCards = useMemo(
    () => generateCardData('shk', packConfigurations).filter((card) => card.rarity === 'common'),
    []
  );

  const generateDraftPack = useCallback((rarity) => {
    let cardData = [];
    Object.keys(selectedPackTypes).forEach((type) => {
      if (selectedPackTypes[type]) {
        cardData = cardData.concat(generateCardData(type, packConfigurations));
      }
    });
    if (!cardData.length) return [];

    const filteredCards = cardData.filter((card) => card.rarity === rarity);
    return getRandomCards(
      filteredCards,
      rarity === 'rare'
        ? 10 - selectionCounts.rare
        : rarity === 'uncommon'
        ? 15 - selectionCounts.uncommon
        : 16 - selectionCounts.common
    );
  }, [selectedPackTypes, selectionCounts]);

  const openPack = useCallback(() => {
    if (selectionCounts.rare < 10) {
      const draftPack = generateDraftPack('rare');
      setCards(draftPack);
    } else if (selectionCounts.uncommon < 15) {
      const draftPack = generateDraftPack('uncommon');
      setCards(draftPack);
    } else if (selectionCounts.common < 16) {
      const draftPack = generateDraftPack('common');
      setCards(draftPack);
    }
  }, [generateDraftPack, selectionCounts]);

  useEffect(() => {
    if (Object.values(selectedPackTypes).some((value) => value)) {
      openPack();
    } else {
      setCards([]);
    }
  }, [draftStep, selectionCounts, openPack, selectedPackTypes]);

  const handleCardClick = (card) => {
    if (card.rarity === 'rare' && selectionCounts.rare < 10) {
      setSelectionCounts((prevCounts) => ({ ...prevCounts, rare: prevCounts.rare + 1 }));
    } else if (card.rarity === 'uncommon' && selectionCounts.rare === 10 && selectionCounts.uncommon < 15) {
      setSelectionCounts((prevCounts) => ({ ...prevCounts, uncommon: prevCounts.uncommon + 1 }));
    } else if (card.rarity === 'common' && selectionCounts.rare === 10 && selectionCounts.uncommon === 15 && selectionCounts.common < 16) {
      setSelectionCounts((prevCounts) => ({ ...prevCounts, common: prevCounts.common + 1 }));
    } else {
      return; // Do nothing if the card is not needed in the current step
    }

    setSavedCards((prevSavedCards) => [...prevSavedCards, card]);
    setDraftStep((prevStep) => prevStep + 1);
  };

  const handlePackTypeChange = (event) => {
    const { value } = event.target;
    setSelectedPackTypes((prevTypes) => ({
      ...prevTypes,
      [value]: !prevTypes[value]
    }));
    setSelectionCounts({ rare: 0, uncommon: 0, common: 0 });
    setSavedCards([]);
    setDraftStep(0);
    setCards([]); // Clear the current pool when pack types are changed
  };

  return (
    <div className="draft-mode">
      <div className="pack-selector">
        <div className="packTypeSelector">
        {Object.keys(packConfigurations).map((type) => (
          <label key={type} className="pack-label">
            <input
              type="checkbox"
              value={type}
              checked={selectedPackTypes[type]}
              onChange={handlePackTypeChange}
              className="pack-checkbox"
            />
            <img
              src={`images/${type}.png`}
              alt={type}
              className={selectedPackTypes[type] ? 'pack-image selected' : 'pack-image'}
            />
          </label>
        ))}
        </div>
      </div>
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

export default DraftMode;

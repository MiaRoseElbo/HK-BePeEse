import React, { useState, useEffect } from 'react';
import Card from './Card';
import { generateCardData } from './utils';
import packConfigurations from './packConfigurations';
import './InspectMode.css';

const InspectMode = () => {
  const [packType, setPackType] = useState('evo');
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [error, setError] = useState(null);

  const [showRares, setShowRares] = useState(true);
  const [showUncommons, setShowUncommons] = useState(true);
  const [showCommons, setShowCommons] = useState(true);

  useEffect(() => {
    if (packConfigurations[packType]) {
      const cardData = generateCardData(packType, packConfigurations);
      setCards(cardData);
      setError(null);
    } else {
      setError(`Pack type "${packType}" not found in pack configurations.`);
    }
  }, [packType]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleOverlayClick = () => {
    setSelectedCard(null);
  };

  const handlePackTypeClick = (newPackType) => {
    setPackType(newPackType);
  };

  const toggleRares = () => setShowRares(!showRares);
  const toggleUncommons = () => setShowUncommons(!showUncommons);
  const toggleCommons = () => setShowCommons(!showCommons);

  const rareCards = cards.filter((card) => card.rarity === 'rare');
  const uncommonCards = cards.filter((card) => card.rarity === 'uncommon');
  const commonCards = cards.filter((card) => card.rarity === 'common');

  return (
    <div className="inspect-mode">
      <div className="pack-selector">
        {Object.keys(packConfigurations).map((type) => (
          <label key={type} className="pack-label">
            <input
              type="radio"
              value={type}
              checked={packType === type}
              onChange={() => handlePackTypeClick(type)}
            />
            <img
              src={`images/${type}.png`}
              alt={type}
              className={'pack-image'}
            />
          </label>
        ))}
      </div>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="card-container">
          <div className="rarity-section">
            <h2 onClick={toggleRares} className="rarity-header">Raras {showRares ? '▲' : '▼'}</h2>
            {showRares && (
              <div className="card-list">
                {rareCards.map((card) => (
                  <Card
                    key={card.id}
                    id={`card-${card.id}`}
                    background={card.bg}
                    image={card.image}
                    rarity={card.rarity}
                    onClick={() => handleCardClick(card)}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="rarity-section">
            <h2 onClick={toggleUncommons} className="rarity-header">Infrecuentes {showUncommons ? '▲' : '▼'}</h2>
            {showUncommons && (
              <div className="card-list">
                {uncommonCards.map((card) => (
                  <Card
                    key={card.id}
                    id={`card-${card.id}`}
                    background={card.bg}
                    image={card.image}
                    rarity={card.rarity}
                    onClick={() => handleCardClick(card)}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="rarity-section">
            <h2 onClick={toggleCommons} className="rarity-header">Comunes {showCommons ? '▲' : '▼'}</h2>
            {showCommons && (
              <div className="card-list">
                {commonCards.map((card) => (
                  <Card
                    key={card.id}
                    id={`card-${card.id}`}
                    background={card.bg}
                    image={card.image}
                    rarity={card.rarity}
                    onClick={() => handleCardClick(card)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {selectedCard && (
        <div className="overlay" onClick={handleOverlayClick}>
          <div className="overlay-content">
            <img src={`/images/${selectedCard.image}`} alt={`Card ${selectedCard.id}`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectMode;

// utils.js
export const generateCardData = (packType, packConfigurations) => {
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
      cardData.push({ id: i, image: `${imagePrefix}/${imageName}`, bg, rarity });
    }
    return cardData;
  };
  
  export const getRandomCards = (cardsArray, count) => {
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
  
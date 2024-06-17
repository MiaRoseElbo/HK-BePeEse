import React, { useRef, useState, useEffect } from 'react';
import './Card.css';

const Card = ({ id, image, rarity, background, flipDelay, onClick }) => {
  const cardRef = useRef(null);
  const holoRef = useRef(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const flipTimeout = setTimeout(() => {
      setFlipped(true);
    }, flipDelay);

    return () => clearTimeout(flipTimeout);
  }, [flipDelay]);

  const handleMouseMove = (event) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateZ = 0;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale3d(1.1, 1.1, 1.1)`;
    
    if (rarity === 'rare') {
      const bgPosX = (x / rect.width) * 100;
      const bgPosY = (y / rect.height) * 100;
      holoRef.current.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    
    if (rarity === 'rare') {
      holoRef.current.style.backgroundPosition = `50% 50%`;
    }
  };

  return (
    <div
      className={`card ${flipped ? 'flipped' : ''}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={`/images/${image}`} alt={image} className="card-image" />
          {rarity === 'rare' && <div ref={holoRef} className="holo-effect" />}
        </div>
        <div className="card-back">
          <img src={`/images/effects/${background}.png`} alt="Card Back" className="card-image" />
        </div>
      </div>
    </div>
  );
};

export default Card;

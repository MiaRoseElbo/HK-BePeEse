import React, { useRef } from 'react';
import './Card.css';

const Card = ({ image, rarity }) => {
  const cardRef = useRef(null);
  const holoRef = useRef(null);

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
      className="card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img src={`/images/${image}`} alt={image} className="card-image" />
      {rarity === 'rare' && <div ref={holoRef} className="holo-effect" />}
    </div>
  );
};

export default Card;
import React, { useState, useEffect } from 'react';
import './App.css';
import BoosterPack from './BoosterPack';

function App() {
  const [packType, setPackType] = useState('evo');
  const [rerenderKey, setRerenderKey] = useState(0);

  const handlePackTypeClick = (newPackType) => {
    if (newPackType === packType) {
      // If clicking on the same pack type again, increment rerenderKey to force re-render
      setRerenderKey(prevKey => prevKey + 1);
    } else {
      setPackType(newPackType);
      setRerenderKey(prevKey => prevKey + 1);
    }
  };

  useEffect(() => {
    // Reset rerenderKey to 0 whenever packType changes
    setRerenderKey(0);
  }, [packType]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={'/Site-logo.webp'} alt="Logo" />
        <h1>Simulador Sellado</h1>
      </header>
      <main>
        <div className="packTypeSelector">
          <img
            key={'evo'}
            src={'/images/evo.png'}
            alt="Evolución"
            onClick={() => handlePackTypeClick('evo')}
            className={packType === 'evo' ? 'active' : ''}
          />
          <img
            key={'dev'}
            src={process.env.PUBLIC_URL + '/images/dev.png'}
            alt="Desviantes"
            onClick={() => handlePackTypeClick('dev')}
            className={packType === 'dev' ? 'active' : ''}
          />
          <img
            key={'sub'}
            src={process.env.PUBLIC_URL + '/images/sub.png'}
            alt="Suburbia"
            onClick={() => handlePackTypeClick('sub')}
            className={packType === 'sub' ? 'active' : ''}
          />
          <img
            key={'shk'}
            src={process.env.PUBLIC_URL + '/images/shk.png'}
            alt="Selección Humankind"
            onClick={() => handlePackTypeClick('shk')}
            className={packType === 'shk' ? 'active' : ''}
          />
          <img
            key={'col'}
            src={process.env.PUBLIC_URL + '/images/col.png'}
            alt="Colosos"
            onClick={() => handlePackTypeClick('col')}
            className={packType === 'col' ? 'active' : ''}
          />
          <img
            key={'avl'}
            src={process.env.PUBLIC_URL + '/images/avl.png'}
            alt="Alto Voltaje"
            onClick={() => handlePackTypeClick('avl')}
            className={packType === 'avl' ? 'active' : ''}
          />
          <img
            key={'cal'}
            src={process.env.PUBLIC_URL + '/images/cal.png'}
            alt="Calixto"
            onClick={() => handlePackTypeClick('cal')}
            className={packType === 'cal' ? 'active' : ''}
          />
          {/* Add more images as needed */}
        </div>
        <BoosterPack key={rerenderKey} packType={packType} />
      </main>
    </div>
  );
}

export default App;

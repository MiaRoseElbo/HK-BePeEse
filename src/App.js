import React, { useState } from 'react';
import './App.css';
import BoosterPack from './BoosterPack';
import DraftMode from './DraftMode';
import InspectMode from './InspectMode';

function App() {
  const [packType, setPackType] = useState('evo');
  const [mode, setMode] = useState('Sellado');
  const [rerenderKey, setRerenderKey] = useState(0);

  const handlePackTypeClick = (newPackType) => {
    if (newPackType === packType) {
      setRerenderKey((prevKey) => prevKey + 1);
    } else {
      setPackType(newPackType);
      setRerenderKey((prevKey) => prevKey + 1);
    }
  };

  const handleModeChange = (event) => {
    setMode(event.target.value);
    setRerenderKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={'/Site-logo.webp'} alt="Logo" />
      </header>
      <main>
        <div className="mode-selector">
          <label key={"Sellado"} className="pack-label">
            <input
              type="radio"
              value="Sellado"
              checked={mode === 'Sellado'}
              onChange={handleModeChange}
            />
            <h1 className={mode === 'Sellado' ? 'mode-image selected' : 'mode-image'}>Sellado</h1>
          </label>
          <label key={"Draft"} className="pack-label">
            <input
              type="radio"
              value="Draft"
              checked={mode === 'Draft'}
              onChange={handleModeChange}
            />
            <h1 className={mode === 'Draft' ? 'mode-image selected' : 'mode-image'}>Draft</h1>
          </label>
          <label key={"Inspect"} className="pack-label">
            <input
              type="radio"
              value="Inspect"
              checked={mode === 'Inspect'}
              onChange={handleModeChange}
            />
            <h1 className={mode === 'Inspect' ? 'mode-image selected' : 'mode-image'}>Ver Cartas</h1>
          </label>
        </div>
        {mode === 'Sellado' ? (
          <div>
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
              <img
                key={'promos'}
                src={process.env.PUBLIC_URL + '/images/promos.png'}
                alt="Promos"
                onClick={() => handlePackTypeClick('promos')}
                className={packType === 'promos' ? 'active' : ''}
              />
              {/* Add more images as needed */}
            </div>
            <BoosterPack key={rerenderKey} packType={packType} />
          </div>
        ) : mode === 'Draft' ? (
          <DraftMode key={rerenderKey} />
        ) : (
          <InspectMode key={rerenderKey} />
        )}
      </main>
    </div>
  );
}

export default App;

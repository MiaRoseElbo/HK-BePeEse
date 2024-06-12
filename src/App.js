import React, { useState } from 'react';
import './App.css';
import BoosterPack from './BoosterPack';

function App() {
  const [packType, setPackType] = useState('evo');

  const handlePackTypeChange = (event) => {
    setPackType(event.target.value);
    console.log(event);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>HK Draft Sim</h1>
      </header>
      <main>
        <select onChange={handlePackTypeChange} value={packType}>
          <option value="evo">Evolución</option>
          <option value="dev">Desviantes</option>
          <option value="sub">Suburbia</option>
          <option value="shk">Selección Humankind</option>
          <option value="col">Colosos</option>
          <option value="avl">Alto Voltaje</option>
          <option value="cal">Calixto</option>
          {/* Add more options as needed */}
        </select>
        <BoosterPack packType={packType} />
      </main>
    </div>
  );
}

export default App;
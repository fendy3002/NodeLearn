import React, { useState } from 'react';

import './App.css';
import { Keylock } from './lib';

function App() {
  const [selectedNumber, setSelectedNumber] = useState('000001'); //943178
  return (
    <>
      <div style={{ marginTop: '400px' }}></div>
      <div style={{}}>
        <Keylock
          initialNumber={selectedNumber}
          readonly={selectedNumber == '000000'}
          onChange={setSelectedNumber}
        />
      </div>

      <div style={{ marginTop: '400px' }}></div>
    </>
  );
}

export default App;

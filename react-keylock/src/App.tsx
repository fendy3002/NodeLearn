import React, { useState } from 'react';

import './App.css';
import { Keylock } from './lib';

function App() {
  const [selectedNumber, setSelectedNumber] = useState('00000001'); //943178
  return (
    <>
      <div style={{ marginTop: '400px' }}></div>
      <div style={{}}>
        <Keylock
          selectedNumber={selectedNumber}
          readonly={selectedNumber == '00000000'}
          onChange={setSelectedNumber}
        />

        <Keylock
          size="small"
          selectedNumber={selectedNumber}
          readonly={selectedNumber == '00000000'}
          onChange={setSelectedNumber}
        />
      </div>

      <div style={{ marginTop: '400px' }}></div>
    </>
  );
}

export default App;

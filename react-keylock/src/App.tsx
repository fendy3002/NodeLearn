import React, { useState } from 'react';

import './App.css';
import { Keylock } from './lib';

function App() {
  const [appState, setAppState] = useState({
    sideBarOpen: false,
  });
  return (
    <>
      <div style={{ marginTop: '400px' }}></div>
      <div style={{}}>
        <Keylock />
      </div>

      <div style={{ marginTop: '400px' }}></div>
    </>
  );
}

export default App;

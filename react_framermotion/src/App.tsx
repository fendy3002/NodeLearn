import React, { useState } from 'react';

import './App.css';
import { AppBar } from './components/AppBar';
import { AppContextProvider } from './components/AppContextProvider';
import { ContactMe } from './components/ContactMe';
import { Introduction } from './components/Introduction';
import { Projects } from './components/Projects';
import { SideBar } from './components/SideBar';
import { Skills } from './components/Skills';
import { WorkExperiences } from './components/WorkExperiences';
import { FONT_COLOR_1 } from './constants/colors';

function App() {
  const [appState, setAppState] = useState({
    sideBarOpen: false,
  });
  return (
    <>
      <AppContextProvider>
        <div style={{ color: FONT_COLOR_1, fontFamily: 'Lato, Arial' }}>
          <SideBar
            open={appState.sideBarOpen}
            openSideBar={() =>
              setAppState((prev) => ({ ...prev, sideBarOpen: true }))
            }
            closeSideBar={() =>
              setAppState((prev) => ({ ...prev, sideBarOpen: false }))
            }
          />
          <AppBar />
          <Introduction />
          <Skills />
          <WorkExperiences />
          <Projects />
          <ContactMe />
        </div>

        <div style={{ marginTop: '280px' }}></div>
      </AppContextProvider>
    </>
  );
}

export default App;

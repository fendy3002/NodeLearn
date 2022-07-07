import React, { useState } from 'react';

import './App.css';
import { AppBar } from './components/AppBar';
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

      <div style={{ marginTop: '400px' }}></div>
      {/* 
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '100%' }}>
          <Card>
            <CardContent
              component={motion.div}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              sx={{ height: '40vh' }}
              viewport={{ once: true }}
            >
              <Button>Submit</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent
              component={motion.div}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              sx={{ height: '40vh' }}
              viewport={{ once: true }}
            >
              <Button>Submit</Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent
              component={motion.div}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              sx={{ height: '40vh' }}
              viewport={{ once: true }}
            >
              <Button>Submit</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent
              component={motion.div}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              sx={{ height: '40vh' }}
              viewport={{ once: true }}
            >
              <Button>Submit</Button>
            </CardContent>
          </Card>
        </Box>
      </Box> */}
    </>
  );
}

export default App;

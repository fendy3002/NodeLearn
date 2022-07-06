import { useState } from 'react';

import { Box, Card, CardContent } from '@mui/material';

import { motion } from 'framer-motion';

import './App.css';
import { AppBar } from './components/AppBar';
import { Button } from './components/Button';
import { SideBar } from './components/SideBar';

function App() {
  const [appState, setAppState] = useState({
    sideBarOpen: false,
  });
  return (
    <>
      <SideBar
        open={appState.sideBarOpen}
        openSideBar={() =>
          setAppState((prev) => ({ ...prev, sideBarOpen: true }))
        }
        closeSideBar={() =>
          setAppState((prev) => ({ ...prev, sideBarOpen: false }))
        }
      ></SideBar>
      <AppBar
        openSideBar={() => {
          setAppState((prev) => ({ ...prev, sideBarOpen: true }));
        }}
      />
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
      </Box>
    </>
  );
}

export default App;

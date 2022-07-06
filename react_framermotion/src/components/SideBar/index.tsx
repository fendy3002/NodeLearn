import React from 'react';

import { Close } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';

import { motion } from 'framer-motion';

import { SideBarProps } from '_/types/props/SideBarProps';

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const SideBar = (props: SideBarProps) => {
  return (
    <motion.nav initial={'closed'} animate={props.open ? 'open' : 'closed'}>
      <motion.div
        variants={{
          open: {
            clipPath: `circle(120vh at 40px 30px)`,
            background: '#DDDDDD',
            transition: {
              type: 'spring',
              stiffness: 20,
              restDelta: 2,
            },
          },
          closed: {
            clipPath: 'circle(25px at 36px 32px)',
            transition: {
              delay: 0.5,
              type: 'spring',
              stiffness: 400,
              damping: 40,
            },
          },
        }}
        style={{
          background: '#FFFFFF',
          position: 'absolute',
          width: '300px',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: 'relative',
            marginTop: '20px',
            marginLeft: '66px',
          }}
        >
          <h1
            style={{
              marginTop: '-3px',
            }}
          >
            APPTITLE
          </h1>
        </div>
        <Divider />
        <Box></Box>
      </motion.div>
      <button
        onClick={() =>
          props.open ? props.closeSideBar() : props.openSideBar()
        }
        style={{
          top: '20px',
          left: '21px',
          position: 'absolute',
          borderRadius: '50%',
          border: 0,
          background: 'transparent',
          cursor: 'pointer',
          zIndex: 11,
        }}
      >
        <svg width="23" height="23" viewBox="0 0 23 23">
          <Path
            variants={{
              closed: { d: 'M 2 2.5 L 20 2.5' },
              open: { d: 'M 3 16.5 L 17 2.5' },
            }}
          />
          <Path
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            transition={{ duration: 0.1 }}
          />
          <Path
            variants={{
              closed: { d: 'M 2 16.346 L 20 16.346' },
              open: { d: 'M 3 2.5 L 17 16.346' },
            }}
          />
        </svg>
      </button>
    </motion.nav>
    // <Drawer
    //   sx={{
    //     width: drawerWidth,
    //     flexShrink: 0,
    //     '& .MuiDrawer-paper': {
    //       width: drawerWidth,
    //       boxSizing: 'border-box',
    //     },
    //   }}
    //   variant="persistent"
    //   anchor="left"
    //   open={props.open}
    //   component={motion.nav}
    //   animate={{ x: 1000 }}
    // >
    //   <Box sx={{ display: 'flex' }}>
    //     <IconButton onClick={props.closeSideBar}>
    //       <Close></Close>
    //     </IconButton>
    //   </Box>
    // </Drawer>
  );
};

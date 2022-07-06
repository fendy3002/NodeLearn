import React from 'react';

import Drawer from '@mui/material/Drawer';

import { SideBarProps } from '_/types/props/SideBarProps';

const drawerWidth = 240;
export const SideBar = (props: SideBarProps) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
      open={props.open}
    >
      MENU
    </Drawer>
  );
};

import React from 'react';
import Drawer from '@mui/material/Drawer';

const drawerWidth = 240;
export interface SidebarProps {
  open: boolean;
}

export default function Sidebar(props: SidebarProps) {
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
}

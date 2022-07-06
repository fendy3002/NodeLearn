import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { motion } from 'framer-motion';

import { AppBarProps } from '_/types/props/AppBarProps';

export const AppBar = (props: AppBarProps) => {
  return (
    <MuiAppBar position="static">
      <Toolbar style={{ marginLeft: '140px' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Photos
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
};

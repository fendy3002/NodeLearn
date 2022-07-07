import React from 'react';

import MuiButton from '@mui/material/Button';

import { motion } from 'framer-motion';

export const Button = (props: any) => {
  return (
    <MuiButton
      {...props}
      variant={'contained'}
      component={motion.button}
      whileHover={{
        scale: 1.2,
      }}
      whileTap={{ scale: 0.9 }}
    >
      {props.children}
    </MuiButton>
  );
};

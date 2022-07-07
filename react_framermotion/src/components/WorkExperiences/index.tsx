import React, { useRef, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { motion } from 'framer-motion';

export const WorkExperiences = (props: any) => {
  return (
    <>
      <motion.div
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        viewport={{ once: true }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: '60px',
          }}
        >
          <Box
            sx={{
              width: '80%',
              display: 'block',
              textAlign: 'center',
            }}
          >
            <a id="work_experiences">
              <h1>Work Experiences</h1>
            </a>
          </Box>
        </Box>
      </motion.div>
    </>
  );
};

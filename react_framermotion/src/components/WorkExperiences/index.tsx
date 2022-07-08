import React, { useRef, useState } from 'react';

import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';

import { motion } from 'framer-motion';

import { BEIGE_800, BG_COLOR_1 } from '../../constants/colors';
import { WorkExperienceTimeline } from './WorkExperienceTimeline';

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

            <div
              style={{
                background: BEIGE_800,
                boxShadow: `inset 0px 0px 10px 10px ${BG_COLOR_1}`,
                paddingTop: '32px',
                paddingBottom: '32px',
                paddingLeft: '0px',
                paddingRight: '0px',

                borderRadius: '20px',
                width: '100%',
              }}
            >
              <WorkExperienceTimeline />
            </div>
          </Box>
        </Box>
      </motion.div>
    </>
  );
};

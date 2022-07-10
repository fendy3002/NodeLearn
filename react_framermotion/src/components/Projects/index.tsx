import React, { useRef, useState } from 'react';

import { Box, Divider, Typography } from '@mui/material';

import { motion } from 'framer-motion';

import { BEIGE_800, BG_COLOR_1 } from '../../constants/colors';
import { Keylocked } from './Keylocked';
import { QzCodeGenerator } from './QzCodeGenerator';
import { QzEvaluator } from './QzEvaluator';
import { QzPromise } from './QzPromise';
import { QzReactKeylock } from './QzReactKeylock';

export const Projects = (props: any) => {
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
            <a id="projects">
              <h1>Projects</h1>
            </a>
            <div
              style={{
                background: BEIGE_800,
                boxShadow: `inset 0px 0px 10px 10px ${BG_COLOR_1}`,
                paddingTop: '32px',
                paddingBottom: '32px',
                paddingLeft: '0px',
                paddingRight: '0px',

                fontSize: '1.2em',
                borderRadius: '20px',
                width: '100%',
              }}
            >
              <Keylocked>
                <div style={{ paddingLeft: '32px', paddingRight: '32px' }}>
                  <QzReactKeylock />
                  <Divider />
                  <QzPromise />
                  <Divider />
                  <QzCodeGenerator />
                  <Divider />
                  <QzEvaluator />
                </div>
              </Keylocked>
            </div>
          </Box>
        </Box>
      </motion.div>
    </>
  );
};

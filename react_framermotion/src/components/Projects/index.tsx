import React, { useRef, useState } from 'react';

import { Box, Divider, Typography } from '@mui/material';

import { motion } from 'framer-motion';

import { BEIGE_800, BG_COLOR_1 } from '../../constants/colors';
import { Section } from '../Section';
import { Keylocked } from './Keylocked';
import { QzCodeGenerator } from './QzCodeGenerator';
import { QzEvaluator } from './QzEvaluator';
import { QzPromise } from './QzPromise';
import { QzReactKeylock } from './QzReactKeylock';

export const Projects = (props: any) => {
  return (
    <>
      <Section id="projects" title="Projects">
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
      </Section>
    </>
  );
};

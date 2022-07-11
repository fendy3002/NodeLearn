import React, { useRef, useState } from 'react';

import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';

import { motion } from 'framer-motion';

import { BEIGE_800, BG_COLOR_1 } from '../../constants/colors';
import { Section } from '../Section';
import { WorkExperienceTimeline } from './WorkExperienceTimeline';

export const WorkExperiences = (props: any) => {
  return (
    <>
      <Section id="work_experiences" title="Work Experiences">
        <WorkExperienceTimeline />
      </Section>
    </>
  );
};

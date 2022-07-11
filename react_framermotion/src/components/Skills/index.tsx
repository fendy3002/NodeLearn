import React from 'react';

import { Box, List, ListItem, Typography } from '@mui/material';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import { SkillsProps } from '_/types/props/SkillsProps';

import { BEIGE_700, BEIGE_800, BG_COLOR_1 } from '../../constants/colors';
import { Section } from '../Section';
import { SkillPoints } from './SkillPoints';
import { Toolings } from './Toolings';

const SkillBox = styled(Box)`
  & .skill {
    margin: 24px auto 12px auto;
  }
`;

export const TextPopover = (props: { children: any }) => {
  return (
    <Box
      sx={{
        background: BEIGE_700,
        px: '8px',
        py: '4px',
      }}
    >
      <Typography>{props.children}</Typography>
    </Box>
  );
};

export const Skills = (props: SkillsProps) => {
  return (
    <>
      <Section id="skills" title="Skills">
        <SkillBox
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            paddingLeft: '50px',
            paddingRight: '50px',
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
        >
          <SkillPoints
            points={9}
            skillName="Node JS"
            skillDescription={
              <TextPopover>
                I have major experience with Typescript when using NodeJS.
                <br />
                As or the backend framework, I was using ExpressJS and also
                NestJS.
              </TextPopover>
            }
          />
          <SkillPoints
            points={8}
            skillName="React JS"
            skillDescription={
              <TextPopover>
                <p>
                  I was starting to use React with class-based components.
                  <br />
                  Lately I've been using functional components and hooks more.
                </p>
                <p>In our recent project, we are using NextJS as well.</p>
              </TextPopover>
            }
          />
          <SkillPoints points={7} skillName="PHP" />
          <SkillPoints points={7} skillName="C#" />
          <SkillPoints
            points={8}
            skillName="SQL"
            skillDescription={
              <TextPopover>
                <p>
                  For SQL, I have experiences with MySQL, MsSQL and PostgreSQL.
                  <br />I also have experience with MongoDB (NoSQL).
                </p>
                <p>
                  With SQL, I have decent experience with query performance
                  (also indexing), fluent with aggregate queries and data
                  migration.
                </p>
              </TextPopover>
            }
          />
        </SkillBox>
        <Toolings />
      </Section>
    </>
  );
};

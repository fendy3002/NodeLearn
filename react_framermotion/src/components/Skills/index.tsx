import React from 'react';

import { Box, List, ListItem, Typography } from '@mui/material';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import { SkillsProps } from '_/types/props/SkillsProps';

import { BEIGE_700, BEIGE_800, BG_COLOR_1 } from '../../constants/colors';
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
      <motion.div
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        viewport={{ once: true }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '60px',
          }}
        >
          <a id="skills">
            <h1>Skills</h1>
          </a>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              background: BEIGE_800,
              boxShadow: `inset 0px 0px 10px 10px ${BG_COLOR_1}`,
              padding: '32px',
              borderRadius: '20px',
              width: '75%',
            }}
          >
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
                    with Typescript
                    <br />
                    using ExpressJS and also NestJS
                  </TextPopover>
                }
              />
              <SkillPoints points={8} skillName="React JS" />
              <SkillPoints points={7} skillName="PHP" />
              <SkillPoints points={7} skillName="C#" />
              <SkillPoints
                points={8}
                skillName="SQL"
                skillDescription={
                  <TextPopover>
                    MySQL, MsSQL, PostgreSQL <br />
                    and NoSQL (MongoDB)
                  </TextPopover>
                }
              />
            </SkillBox>
            <Toolings />
          </Box>
        </Box>
      </motion.div>
    </>
  );
};

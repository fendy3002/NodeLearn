import React, { useRef, useState } from 'react';

import { Circle, Info } from '@mui/icons-material';
import {
  Box,
  ClickAwayListener,
  IconButton,
  Popover,
  Rating,
  Typography,
} from '@mui/material';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import { SkillsProps } from '_/types/props/SkillsProps';

import { BEIGE_900, BG_COLOR_1 } from '../../constants/colors';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#FCD10C',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});
const SkillBox = styled(Box)`
  & .skill {
    margin: 24px auto 12px auto;
  }
`;

export const SkillPoints = (props: {
  skillName: string;
  points: number;
  skillDescription?: any;
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const popoverAnchorEl = useRef(null);
  return (
    <Box
      sx={{
        textAlign: 'center',
        flexBasis: '32%',
      }}
      className="skill"
    >
      <StyledRating
        icon={<Circle></Circle>}
        emptyIcon={<Circle></Circle>}
        readOnly
        size={'large'}
        value={props.points}
        max={10}
      ></StyledRating>
      <Typography>
        {props.skillName}
        {props.skillDescription && (
          <>
            <Popover
              anchorEl={popoverAnchorEl.current}
              onClose={() => setIsTooltipOpen(false)}
              open={isTooltipOpen}
            >
              {props.skillDescription}
            </Popover>

            <ClickAwayListener onClickAway={() => setIsTooltipOpen(false)}>
              <IconButton
                onClick={() => setIsTooltipOpen(true)}
                ref={popoverAnchorEl}
                size={'small'}
              >
                <Info></Info>
              </IconButton>
            </ClickAwayListener>
          </>
        )}
      </Typography>
    </Box>
  );
};

export const Skills = (props: SkillsProps) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '60px',
        }}
      >
        <SkillBox
          sx={{
            background: BEIGE_900,
            boxShadow: `inset 0px 0px 10px 10px ${BG_COLOR_1}`,
            padding: '32px',
            borderRadius: '20px',
            width: '75%',

            display: 'flex',
            flexWrap: 'wrap',
            paddingLeft: '50px',
            paddingRight: '50px',
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
        >
          <SkillPoints points={9} skillName="Node JS" />
          <SkillPoints points={8} skillName="React JS" />
          <SkillPoints points={7} skillName="PHP" />
          <SkillPoints points={7} skillName="C#" />
          <SkillPoints
            points={8}
            skillName="SQL"
            skillDescription={'MySQL, MsSQL, PostgreSQL'}
          />
        </SkillBox>
      </Box>
    </>
  );
};

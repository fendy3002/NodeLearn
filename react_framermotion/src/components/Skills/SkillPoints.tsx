import React, { useRef, useState } from 'react';

import { Circle, CircleTwoTone, Info } from '@mui/icons-material';
import {
  Box,
  ClickAwayListener,
  IconButton,
  Popover,
  Rating,
  Typography,
} from '@mui/material';

import styled from 'styled-components';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#FCD10C',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

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
        emptyIcon={<CircleTwoTone></CircleTwoTone>}
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
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              {props.skillDescription}
            </Popover>

            <ClickAwayListener onClickAway={() => setIsTooltipOpen(false)}>
              <IconButton
                onClick={() => setIsTooltipOpen(true)}
                ref={popoverAnchorEl}
                size={'small'}
                sx={{ paddingY: 0 }}
              >
                <Info fontSize="small"></Info>
              </IconButton>
            </ClickAwayListener>
          </>
        )}
      </Typography>
    </Box>
  );
};

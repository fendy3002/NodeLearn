import React from 'react';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import { AppBarProps } from '_/types/props/AppBarProps';

import { GREY_900 } from '../../constants/colors';

const StyledAppBarContainer = styled.div`
  text-align: center;
  color: ${GREY_900};
  padding-top: 10px;
  text-transform: uppercase;
  padding-bottom: 20px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  & a:not(:last-child) {
    margin-right: 32px;
  }
`;

const StyledMotionA = styled(motion.a)`
  font-size: 1.2em;
  color: inherit;
  text-decoration: none;
  text-shadow: 2px 2px 4px #000;

  @media (min-width: 900px) {
    font-size: 2em;
  }
  @media (min-width: 600px) and (max-width: 800px) {
    font-size: 1.4em;
  }
`;

const A = (props: { href: string; children?: any }) => {
  return (
    <StyledMotionA
      whileHover={{
        filter: [
          'brightness(100%)',
          'brightness(90%)',
          'brightness(80%)',
          'brightness(90%)',
        ],
        textDecoration: 'underline',
        transition: {
          duration: 0.4,
          type: 'keyframes',
        },
      }}
      initial={{
        marginTop: '10px',
        filter: 'brightness(100%)',
      }}
      href={props.href}
    >
      {props.children}
    </StyledMotionA>
  );
};

export const AppBar = (props: AppBarProps) => {
  return (
    <StyledAppBarContainer>
      <A href={'#introduction'}>Introduction</A>&nbsp;&nbsp;
      <A href={'#skills'}>Skills</A>&nbsp;&nbsp;
      <A href={'#work_experiences'}>Work Experiences</A>&nbsp;&nbsp;
      <A href={'#projects'}>Projects</A>&nbsp;&nbsp;
      <A href={'#contact_me'}>Contact me</A>
    </StyledAppBarContainer>
  );
};

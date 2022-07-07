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
  padding-bottom: 10px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );

  & a:not(:last-child) {
    margin-right: 32px;
  }
`;

const A = (props: { href: string; children?: any }) => {
  return (
    <motion.a
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
        filter: 'brightness(100%)',
        fontSize: '2em',
      }}
      style={{
        fontSize: '2em',
        color: 'inherit',
        textDecoration: 'none',
        textShadow: '2px 2px 4px #000',
      }}
      href={props.href}
    >
      {props.children}
    </motion.a>
  );
};

export const AppBar = (props: AppBarProps) => {
  return (
    <StyledAppBarContainer>
      <A href={'#'}>Skills</A>&nbsp;&nbsp;
      <A href={'#'}>Projects</A>&nbsp;&nbsp;
      <A href={'#'}>Contact me</A>
    </StyledAppBarContainer>
  );
};

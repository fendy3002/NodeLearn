import React from 'react';

import { motion } from 'framer-motion';

import { AppBarProps } from '_/types/props/AppBarProps';

import { GREY_900 } from '../../constants/colors';

const A = (props: { href: string; children?: any }) => {
  return (
    <motion.a
      whileHover={{
        scale: 1.6,
        filter: 'brightness(90%)',
        textDecoration: 'underline',
        transition: {
          duration: 0.3,
        },
      }}
      style={{
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
    <div
      style={{
        textAlign: 'center',
        fontSize: '2em',
        color: GREY_900,
        paddingTop: '10px',
        textTransform: 'uppercase',
        paddingBottom: '10px',
        background:
          'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(255,255,255,0) 100%)',
      }}
    >
      <A href={'#'}>Skills</A>&nbsp;&nbsp;
      <A href={'#'}>Projects</A>&nbsp;&nbsp;
      <A href={'#'}>Contact me</A>
    </div>
  );
};

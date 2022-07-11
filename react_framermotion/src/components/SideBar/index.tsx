import React, { useContext, useEffect, useState } from 'react';

import {
  Box,
  ClickAwayListener,
  Divider,
  Link,
  ListItem,
  ListItemButton,
} from '@mui/material';

import { motion } from 'framer-motion';

import { SideBarProps } from '_/types/props/SideBarProps';

import { FONT_COLOR_1 } from '../../constants/colors';
import { MENU_CUTOFF_Y } from '../../constants/positions';
import { AppContext } from '../AppContextProvider';

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke={FONT_COLOR_1}
    strokeLinecap="round"
    {...props}
  />
);

export const SideBarMenu = () => {
  const { selectedMenuId } = useContext(AppContext);
  const menuList = [
    ['introduction', 'INTRODUCTION'],
    ['skills', 'SKILLS'],
    ['work_experiences', 'WORK EXPERIENCES'],
    ['projects', 'PROJECTS'],
    ['contact_me', 'CONTACT ME'],
  ];
  return (
    <Box>
      {menuList.map(([id, label]) => {
        return (
          <ListItem key={id}>
            <ListItemButton
              selected={selectedMenuId == id}
              component={Link}
              href={`#${id}`}
            >
              {label}
            </ListItemButton>
          </ListItem>
        );
      })}
    </Box>
  );
};

export const SideBar = (props: SideBarProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    if (position < MENU_CUTOFF_Y) {
      props.closeSideBar();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ClickAwayListener onClickAway={() => props.closeSideBar()}>
      <motion.div
        initial={{
          visibility: 'collapse',
          opacity: 0,
        }}
        animate={{
          ...(scrollPosition > MENU_CUTOFF_Y
            ? {
                visibility: 'visible',
                opacity: 1,
                transition: {
                  duration: 0.7,
                },
              }
            : {
                opacity: 0,
                transition: {
                  duration: 0.3,
                },
                transitionEnd: {
                  visibility: 'collapse',
                },
              }),
        }}
      >
        <motion.nav initial={'closed'} animate={props.open ? 'open' : 'closed'}>
          <motion.div
            variants={{
              open: {
                clipPath: `circle(120vh at 40px 30px)`,
                transition: {
                  type: 'spring',
                  stiffness: 20,
                  restDelta: 2,
                },
              },
              closed: {
                clipPath: 'circle(25px at 36px 36px)',
                transition: {
                  delay: 0.5,
                  type: 'spring',
                  stiffness: 400,
                  damping: 40,
                },
              },
            }}
            style={{
              position: 'fixed',
              background:
                'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 85%, rgba(255,255,255,0) 100%)',

              paddingRight: '50px',
              width: '360px',
              top: 0,
              left: 0,
              bottom: 0,
              zIndex: 10,
            }}
          >
            <button
              onClick={() =>
                props.open ? props.closeSideBar() : props.openSideBar()
              }
              style={{
                top: '25px',
                left: '21px',
                position: 'absolute',
                borderRadius: '50%',
                border: 0,
                marginTop: '-4px',
                padding: '5px',
                background: 'transparent',
                cursor: 'pointer',
                zIndex: 11,
              }}
            >
              <svg width="23" height="23" viewBox="0 0 23 23">
                <Path
                  variants={{
                    closed: { d: 'M 2 2.5 L 20 2.5' },
                    open: { d: 'M 3 16.5 L 17 2.5' },
                  }}
                />
                <Path
                  d="M 2 9.423 L 20 9.423"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.1 }}
                />
                <Path
                  variants={{
                    closed: { d: 'M 2 16.346 L 20 16.346' },
                    open: { d: 'M 3 2.5 L 17 16.346' },
                  }}
                />
              </svg>
            </button>

            <div
              style={{
                position: 'relative',
                marginTop: '20px',
                marginLeft: '72px',
              }}
            >
              <h1
                style={{
                  marginTop: '-3px',
                }}
              >
                APPTITLE
              </h1>
            </div>
            <Divider />
            <SideBarMenu />
          </motion.div>
        </motion.nav>
      </motion.div>
    </ClickAwayListener>
  );
};

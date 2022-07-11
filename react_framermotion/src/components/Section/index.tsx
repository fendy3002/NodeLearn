import React, { useContext, useEffect, useRef } from 'react';

import { Box, Typography } from '@mui/material';

import { motion } from 'framer-motion';

import { SectionProps } from '_/types/props/SectionProps';

import { BEIGE_800, BG_COLOR_1 } from '../../constants/colors';
import { ROLE_SECTION_ANCHOR } from '../../constants/roles';
import { getMenuPoint } from '../../elemUtils/getMenuPoint';
import { AppContext } from '../AppContextProvider';

export const Section = (props: SectionProps) => {
  const { addMenuPoints } = useContext(AppContext);
  const menuTitleRef = useRef(null);
  useEffect(() => {
    if (menuTitleRef.current) {
      addMenuPoints(props.id, getMenuPoint(menuTitleRef.current));
    }
  }, [props.id, menuTitleRef.current]);
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
            alignContent: 'center',
            marginTop: '60px',
          }}
        >
          <Box
            sx={{
              width: '80%',
              display: 'block',
              textAlign: 'center',
            }}
          >
            <a id={props.id} ref={menuTitleRef} data-role={ROLE_SECTION_ANCHOR}>
              <h1>{props.title}</h1>
            </a>
            <div
              style={{
                background: BEIGE_800,
                boxShadow: `inset 0px 0px 10px 10px ${BG_COLOR_1}`,
                paddingTop: '32px',
                paddingBottom: '32px',
                paddingLeft: '32px',
                paddingRight: '32px',

                borderRadius: '20px',
              }}
            >
              {props.children}
            </div>
          </Box>
        </Box>
      </motion.div>
    </>
  );
};

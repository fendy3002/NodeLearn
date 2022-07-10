import React, { useRef, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { motion } from 'framer-motion';

import { BEIGE_800, BG_COLOR_1 } from '../../constants/colors';
import { GithubSVG } from '../SVG/GithubSVG';
import { LinkedInSVG } from '../SVG/LinkedInSVG';

export const ContactMe = (props: any) => {
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
            <a id="contact_me">
              <h1>Contact Me</h1>
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
                fontSize: '1.2em',
              }}
            >
              See my Linked In profile and send me a DM:
              <br />
              <div
                style={{
                  display: 'flex',
                  marginTop: '4px',
                  marginBottom: '16px',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
              >
                <a
                  href="https://www.linkedin.com/in/fendyheryanto"
                  target={'_blank'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  <LinkedInSVG size={24} />
                  <span style={{ marginLeft: '6px' }}>
                    https://www.linkedin.com/in/fendyheryanto
                  </span>
                </a>
              </div>
              Or look around my github profile:
              <div
                style={{
                  display: 'flex',
                  marginTop: '4px',
                  marginBottom: '16px',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
              >
                <a
                  href="https://github.com/fendy3002"
                  target={'_blank'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  <GithubSVG size={24} />
                  <span style={{ marginLeft: '6px' }}>
                    https://github.com/fendy3002
                  </span>
                </a>
              </div>
            </div>
          </Box>
        </Box>
      </motion.div>
    </>
  );
};

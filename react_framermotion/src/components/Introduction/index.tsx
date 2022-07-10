import React, { useRef, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { motion } from 'framer-motion';

import { BEIGE_800, BG_COLOR_1 } from '../../constants/colors';

export const Introduction = (props: any) => {
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
            <a id="introduction">
              <h1>Introduction</h1>
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
              <Typography fontStyle={'italic'} fontSize={'1.2em'}>
                After graduated at 2012, I've begun working as software
                developer. I was starting with .Net C#, for around 4 years. Then
                I change to both PHP with Laravel, and finally to NodeJS up to
                present time. During my time with PHP and NodeJS, I also
                applicate ReactJS and typescript for my work projects.
              </Typography>
              <Typography
                fontStyle={'italic'}
                fontSize={'1.2em'}
                sx={{ mt: 2 }}
              >
                During my 10 years of working, I've handled many databases, from
                MS SQL Server, MySQL, PostgreSQL to NoSQL with MongoDB. I am
                also experienced at handling decently sized data and indexing,
                up to tens of millions rows of SQL data.
              </Typography>
              <Typography
                fontStyle={'italic'}
                fontSize={'1.2em'}
                sx={{ mt: 2 }}
              >
                I've used many programming tools, such as using git as version
                control, containerization with docker, messaging with rabbitmq
                and memory caching with redis. I am also excel at designing
                database and gathering requirements, talking directly to
                stakeholders, planning and proposing the application design.
              </Typography>
            </div>
          </Box>
        </Box>
      </motion.div>
    </>
  );
};

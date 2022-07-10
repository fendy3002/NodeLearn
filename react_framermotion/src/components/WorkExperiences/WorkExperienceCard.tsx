import { useState } from 'react';

import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
} from '@mui/material';

import { motion } from 'framer-motion';

export const WorkExperienceCard = (props: {
  company: string;
  location: string;
  when: string;
  detail?: any;
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card style={{ marginBottom: '16px', background: 'rgba(255,255,255,0.3)' }}>
      <CardActionArea onClick={() => setExpanded(!expanded)}>
        <CardContent
          style={{
            padding: '0px',
            textAlign: 'left',
            background: 'transparent',
          }}
        >
          <div
            style={{
              paddingTop: '16px',
              paddingRight: '16px',
              paddingLeft: '16px',
              paddingBottom: '16px',
            }}
          >
            <h3 style={{ marginTop: '0px', marginBottom: '4px' }}>
              {props.company}
            </h3>
            <div
              style={{
                display: 'flex',
              }}
            >
              {props.location}
              <small style={{ marginLeft: 'auto' }}>{props.when}</small>
            </div>
            {expanded && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {props.detail}
              </motion.div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {!expanded && <ArrowDropDown />}
            {expanded && <ArrowDropUp />}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

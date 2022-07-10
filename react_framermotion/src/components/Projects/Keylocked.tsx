import React, { useState } from 'react';

import { Lock } from '@mui/icons-material';
import { Button } from '@mui/material';

import { Keylock } from '@fendy3002/qz-react-keylock';
import { motion } from 'framer-motion';

export const Keylocked = (props: { children: any }) => {
  const [selectedNumber, setSelectedNumber] = useState('789');
  // debug to true
  const isUnlocked = selectedNumber == '777';
  return (
    <>
      <div style={{ marginBottom: '20px' }}>Set to "777" to unlock</div>
      <div>
        <Keylock
          selectedNumber={selectedNumber}
          onChange={setSelectedNumber}
          readonly={isUnlocked}
        />
      </div>
      {isUnlocked && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 1.5,
            },
          }}
        >
          <div
            style={{
              marginTop: '10px',
              marginBottom: '40px',
            }}
          >
            <Button
              onClick={() => {
                setSelectedNumber('789');
              }}
              variant={'outlined'}
              startIcon={<Lock></Lock>}
            >
              Lock again
            </Button>
          </div>
          {props.children}
        </motion.div>
      )}
    </>
  );
};

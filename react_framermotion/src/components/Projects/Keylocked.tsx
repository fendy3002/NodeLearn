import React, { useState } from 'react';

import { Keylock } from '@fendy3002/qz-react-keylock';
import { motion } from 'framer-motion';

export const Keylocked = (props: { children: any }) => {
  const [selectedNumber, setSelectedNumber] = useState('789');
  const isUnlocked = selectedNumber == '777';
  return (
    <>
      <div style={{ fontSize: '1.2em', marginBottom: '20px' }}>
        Set to "777" to unlock
      </div>
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
          {props.children}
        </motion.div>
      )}
    </>
  );
};

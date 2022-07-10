import React from 'react';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { GithubSVG } from '../SVG/GithubSVG';

export const QzEvaluator = () => {
  return (
    <>
      <h2>qz-evaluator</h2>
      <div style={{ marginBottom: '8px' }}>
        <GithubSVG size={24} />{' '}
        <a
          href="https://github.com/fendy3002/qz-evaluator"
          target={'_blank'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          https://github.com/fendy3002/qz-evaluator&nbsp;
          <OpenInNewIcon fontSize="small" />
        </a>
      </div>
      <div style={{ marginBottom: '16px' }}>
        Utilizing{' '}
        <a href="https://developers.google.com/blockly" target={'_blank'}>
          Blockly
        </a>{' '}
        library to compose logic and evaluate given JSON values. A working
        example can be found at:{' '}
        <a href="https://fendy3002.github.io/qz-evaluator" target={'_blank'}>
          https://fendy3002.github.io/qz-evaluator
        </a>
        .
      </div>
    </>
  );
};

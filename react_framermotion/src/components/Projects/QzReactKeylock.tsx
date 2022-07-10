import React from 'react';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { GithubSVG } from '../SVG/GithubSVG';

export const QzReactKeylock = () => {
  return (
    <>
      <h2>qz-react-keylock</h2>
      <div style={{ marginBottom: '8px' }}>
        <GithubSVG size={24} />{' '}
        <a
          href="https://github.com/fendy3002/qz-react-keylock"
          target={'_blank'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          https://github.com/fendy3002/qz-react-keylock&nbsp;
          <OpenInNewIcon fontSize="small" />
        </a>
      </div>
      <div style={{ marginBottom: '16px' }}>
        Padlock-styled number combination input component made with react. The
        padlock numbers above is a working example.
      </div>
    </>
  );
};

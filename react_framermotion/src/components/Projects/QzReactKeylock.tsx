import React from 'react';

import { GithubSVG } from '../SVG/GithubSVG';

export const QzReactKeylock = () => {
  return (
    <>
      <h2>qz-react-keylock</h2>
      <div style={{ marginBottom: '8px' }}>
        <GithubSVG size={24} />{' '}
        <a href="https://github.com/fendy3002/qz-react-keylock">
          https://github.com/fendy3002/qz-react-keylock
        </a>
      </div>
      <div>
        Padlock-styled number combination input component made with react. The
        padlock numbers above is a working example.
      </div>
    </>
  );
};

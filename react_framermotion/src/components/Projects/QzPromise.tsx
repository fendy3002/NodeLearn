import React from 'react';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { GithubSVG } from '../SVG/GithubSVG';

export const QzPromise = () => {
  return (
    <>
      <h2>qz-promise</h2>
      <div style={{ marginBottom: '8px' }}>
        <GithubSVG size={24} />{' '}
        <a
          href="https://github.com/fendy3002/qz-promise"
          target={'_blank'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          https://github.com/fendy3002/qz-promise&nbsp;
          <OpenInNewIcon fontSize="small" />
        </a>
      </div>
      <div style={{ marginBottom: '16px' }}>
        A collection of utilities to handle javascript promise. As for now it
        consist of utilities to:
        <ul>
          <li>make a class instance awaitable / promise resolved</li>
          <li>make a promise retryable when throwing error</li>
          <li>
            make a bunch of promises to be processed simultaneously in batches
          </li>
          <li>delay a process by milliseconds</li>
        </ul>
      </div>
    </>
  );
};

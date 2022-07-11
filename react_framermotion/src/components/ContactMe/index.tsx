import React from 'react';

import { GithubSVG } from '../SVG/GithubSVG';
import { LinkedInSVG } from '../SVG/LinkedInSVG';
import { Section } from '../Section';

export const ContactMe = (props: any) => {
  return (
    <>
      <Section id="contact_me" title="Contact Me">
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
      </Section>
    </>
  );
};

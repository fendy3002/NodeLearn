import React, { useContext } from 'react';

import { CircleTwoTone } from '@mui/icons-material';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';

import { BREAKPOINT_SM } from '../../constants/positions';
import { AppContext } from '../AppContextProvider';
import { WorkExperienceCard } from './WorkExperienceCard';

export const WorkExperienceTimeline = () => {
  const { windowWidth } = useContext(AppContext);
  const WorkExperienceCards = [
    <WorkExperienceCard
      key={'0'}
      company="FWD Insurance"
      location="Singapore office (remote from Indonesia)"
      when="Mar 2022 - Jul 2022"
      detail={
        <div>
          <p>Responsibilities:</p>
          <ul>
            <li>Develop frontend react application pages with NextJS</li>
            <li>
              Develop rest API microservice with NestJS and PostgresSql database
            </li>
            <li>
              Develop with and utilizing other development tools, such as
              docker, git and rabbitmq{' '}
            </li>
          </ul>
          <p>Contributions:</p>
          <ul>
            <li>
              Design and brainstorm application features and best practices
            </li>
            <li>Design and brainstorm git branching strategy</li>
            <li>Design and brainstorm payment application interface</li>
            <li>
              Develop react libraries and utilities for development purpose
            </li>
            <li>
              Develop NestJS libraries and utilities for development purpose
            </li>
            <li>Maintain code quality through reviewing pull requests</li>
          </ul>
          <p>Projects:</p>
          <ul>
            <li>Backoffice rest api with NestJS</li>
            <li>Insurance promotion api with NestJS</li>
            <li>Backoffice frontend with react NextJS</li>
            <li>
              Backoffice scheduler with NestJS cron, and queue consumer with
              RabbitMq
            </li>
          </ul>
        </div>
      }
    />,
    <WorkExperienceCard
      key={'1'}
      company="PT. Anadana Kode Nontunai"
      location="Jakarta, Indonesia"
      when="Oct 2019 - Mar 2022"
      detail={
        <div>
          <p>Responsibilities:</p>
          <ul>
            <li>
              Develop and maintain e-wallet bank connection and automated
              transaction simulator
            </li>
            <li>Develop e-wallet back-office administration tools</li>
            <li>
              Develop and maintain other in-house projects, such as POS API and
              project management
            </li>
          </ul>

          <p>Projects:</p>
          <ul>
            <li>Back office administration application for e-wallet</li>
            <li>Automated transaction simulator</li>
            <li>
              Other in-house applications such as POS API and project management
            </li>
          </ul>
        </div>
      }
    />,
    <WorkExperienceCard
      key={'2'}
      company="PT. Panorama Langit Teknologi"
      location="Jakarta, Indonesia"
      when="Dec 2015 - Oct 2019"
      detail={
        <div>
          <p>Responsibility:</p>
          <ul>
            <li>Develop backend api usable and suitable for front-end needs</li>
            <li>Develop application suitable for corporate needs</li>
            <li>
              Manage, coach and assign tasks to a team of 3 other programmers
            </li>
            <li>Sharing knowledge with other developers</li>
          </ul>

          <p>Projects:</p>
          <ul>
            <li>
              Content Service as Senior Developer - develop system to manage
              contents for hotels
            </li>
            <li>
              Lalalaway.com as Senior Developer - develop frontend and backend
              modules{' '}
            </li>
            <li>
              Corporate Room Deal as Team Leader - develop and manage team for
              backend api in microservice architecture
            </li>
          </ul>
        </div>
      }
    />,
    <WorkExperienceCard
      key={'3'}
      company="PT. Bach Multi Global"
      location="Jakarta, Indonesia"
      when="Jan 2014 - Sep 2015"
      detail={
        <div>
          <p>Responsibility:</p>
          <ul>
            <li>Establish development version control</li>
            <li>Establish database version control</li>
            <li>Establish publishing flow</li>
            <li>Develop integrated framework</li>
            <li>Develop integrated workflow</li>
            <li>Develop 3 tier web application</li>
          </ul>
        </div>
      }
    />,
    <WorkExperienceCard
      key={'4'}
      company="PT. Kuala Kamoro"
      location="Jakarta, Indonesia"
      when="Jun 2012 - Feb 2014"
      detail={
        <div>
          <p>Responsibility:</p>
          <ul>
            <li>bug fix</li>
            <li>enhance features</li>
            <li>maintain application architecture</li>
            <li>maintain application interaction with other system</li>
            <li>
              analyze and prevent possible system error during functional design
            </li>
            <li>optimize database and application performance</li>
          </ul>

          <p>Application:</p>
          <ul>
            <li>
              Material Requisition
              <br />
              An application used for material requisition. Has medium
              transaction volume. Has high interaction with other in-corporate
              system such as SAP and ETL
            </li>
            <li>
              Issue Tracking System Dashboard
              <br />
              An application used to view summary of tickets handled by ITS. Has
              interactive UI elements with multi browser support and complex
              database query.
            </li>
          </ul>
        </div>
      }
    />,
  ];

  const renderSm = (experienceCards: JSX.Element[]) => {
    return (
      <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
        {experienceCards.map((card: any, index) => {
          return (
            <React.Fragment key={index}>
              {card}
              {index < experienceCards.length - 1 && (
                <>
                  <div
                    key={index}
                    style={{
                      display: 'block',
                      height: '16px',
                      marginTop: '-6px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        minWidth: '2px',
                        height: '16px',
                        backgroundColor: '#AAA',
                      }}
                    ></span>
                  </div>
                  <CircleTwoTone fontSize="small" />
                  <div
                    style={{
                      display: 'block',
                      height: '16px',
                      marginTop: '-4px',
                      marginBottom: '6px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        minWidth: '2px',
                        height: '16px',
                        backgroundColor: '#AAA',
                      }}
                    ></span>
                  </div>
                </>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };
  const renderMd = (experienceCards: JSX.Element[]) => {
    return (
      <Timeline position="alternate">
        {experienceCards.map((card: any, index: number) => {
          return (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot />
                {index < experienceCards.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>{card}</TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    );
  };

  return (
    <>
      {windowWidth < BREAKPOINT_SM && renderSm(WorkExperienceCards)}
      {windowWidth >= BREAKPOINT_SM && renderMd(WorkExperienceCards)}
    </>
  );
};

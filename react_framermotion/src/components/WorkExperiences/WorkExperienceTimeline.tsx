import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';

import { WorkExperienceCard } from './WorkExperienceCard';

export const WorkExperienceTimeline = () => {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <WorkExperienceCard
            company="FWD Insurance"
            location="Singapore office (remote from Indonesia)"
            when="Mar 2022 - Jul 2022"
          />
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <WorkExperienceCard
            company="PT. Anadana Kode Nontunai"
            location="Jakarta, Indonesia"
            when="Oct 2019 - Mar 2022"
          />
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <WorkExperienceCard
            company="PT. Panorama Langit Teknologi"
            location="Jakarta, Indonesia"
            when="Dec 2015 - Oct 2019"
          />
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <WorkExperienceCard
            company="PT. Bach Multi Global"
            location="Jakarta, Indonesia"
            when="Jan 2014 - Sep 2015"
          />
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>
          <WorkExperienceCard
            company="PT. Kuala Kamoro"
            location="Jakarta, Indonesia"
            when="Jun 2012 - Feb 2014"
          />
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

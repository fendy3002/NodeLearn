import { Card, CardContent } from '@mui/material';

export const WorkExperienceCard = (props: {
  company: string;
  location: string;
  when: string;
}) => {
  return (
    <Card style={{ marginBottom: '16px', background: 'rgba(255,255,255,0.3)' }}>
      <CardContent
        style={{
          paddingBottom: '16px',
          textAlign: 'left',
          background: 'transparent',
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
      </CardContent>
    </Card>
  );
};

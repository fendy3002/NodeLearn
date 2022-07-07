import React, { useRef, useState } from 'react';

import { Circle, CircleTwoTone, Info } from '@mui/icons-material';
import {
  Box,
  ClickAwayListener,
  IconButton,
  List,
  ListItem,
  Popover,
  Rating,
  Typography,
} from '@mui/material';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import { SkillsProps } from '_/types/props/SkillsProps';

import {
  BEIGE_700,
  BEIGE_800,
  BEIGE_900,
  BG_COLOR_1,
} from '../../constants/colors';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#FCD10C',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});
const SkillBox = styled(Box)`
  & .skill {
    margin: 24px auto 12px auto;
  }
`;

export const TextPopover = (props: { children: any }) => {
  return (
    <Box
      sx={{
        background: BEIGE_700,
        px: '8px',
        py: '4px',
      }}
    >
      <Typography>{props.children}</Typography>
    </Box>
  );
};

export const SkillPoints = (props: {
  skillName: string;
  points: number;
  skillDescription?: any;
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const popoverAnchorEl = useRef(null);
  return (
    <Box
      sx={{
        textAlign: 'center',
        flexBasis: '32%',
      }}
      className="skill"
    >
      <StyledRating
        icon={<Circle></Circle>}
        emptyIcon={<CircleTwoTone></CircleTwoTone>}
        readOnly
        size={'large'}
        value={props.points}
        max={10}
      ></StyledRating>
      <Typography>
        {props.skillName}
        {props.skillDescription && (
          <>
            <Popover
              anchorEl={popoverAnchorEl.current}
              onClose={() => setIsTooltipOpen(false)}
              open={isTooltipOpen}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              {props.skillDescription}
            </Popover>

            <ClickAwayListener onClickAway={() => setIsTooltipOpen(false)}>
              <IconButton
                onClick={() => setIsTooltipOpen(true)}
                ref={popoverAnchorEl}
                size={'small'}
                sx={{ paddingY: 0 }}
              >
                <Info fontSize="small"></Info>
              </IconButton>
            </ClickAwayListener>
          </>
        )}
      </Typography>
    </Box>
  );
};

export const Skills = (props: SkillsProps) => {
  return (
    <>
      <motion.div
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        viewport={{ once: true }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '60px',
          }}
        >
          <a id="skills">
            <h1>Skills</h1>
          </a>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <SkillBox
            sx={{
              background: BEIGE_800,
              boxShadow: `inset 0px 0px 10px 10px ${BG_COLOR_1}`,
              padding: '32px',
              borderRadius: '20px',
              width: '75%',

              display: 'flex',
              flexWrap: 'wrap',
              paddingLeft: '50px',
              paddingRight: '50px',
              alignItems: 'stretch',
              justifyContent: 'center',
            }}
          >
            <SkillPoints
              points={9}
              skillName="Node JS"
              skillDescription={
                <TextPopover>
                  with Typescript
                  <br />
                  using ExpressJS and also NestJS
                </TextPopover>
              }
            />
            <SkillPoints points={8} skillName="React JS" />
            <SkillPoints points={7} skillName="PHP" />
            <SkillPoints points={7} skillName="C#" />
            <SkillPoints
              points={8}
              skillName="SQL"
              skillDescription={
                <TextPopover>
                  MySQL, MsSQL, PostgreSQL <br />
                  and NoSQL (MongoDB)
                </TextPopover>
              }
            />
          </SkillBox>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <h2>Toolings</h2>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <SkillBox
            sx={{
              fontSize: '1.2em',
            }}
          >
            <List style={{ display: 'flex' }}>
              <ListItem>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32px"
                  height="32px"
                  aria-label="Git"
                  role="img"
                  viewBox="0 0 512 512"
                >
                  <rect width="512" height="512" rx="15%" fill="#fff" />
                  <path
                    fill="#f05133"
                    d="M440.8 238.9L273 71.2a24.7 24.7 0 00-35 0l-34.8 34.9l44.2 44.1a29.4 29.4 0 0137.2 37.5l42.5 42.5a29.4 29.4 0 11-17.6 16.6l-39.7-39.7v104.5a29.4 29.4 0 11-24.2-.9V205.3a29.4 29.4 0 01-16-38.6l-43.5-43.5l-115 115a24.7 24.7 0 000 34.9L239 440.8a24.7 24.7 0 0035 0l166.9-167a24.7 24.7 0 000-34.9"
                  />
                </svg>
                <span style={{ width: '10px' }}></span>
                git
              </ListItem>
              <ListItem>
                <svg
                  width="32px"
                  height="32px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#0DB7ED"
                    fill-rule="evenodd"
                    d="M6.94221099,14.9002344 C6.9980621,14.9002344 7.05128211,14.9107588 7.10043586,14.9297745 C7.04721586,14.9606302 7.01109801,15.018335 7.01109801,15.0842919 C7.01109801,15.1828984 7.09098782,15.2626686 7.18959432,15.2626686 C7.25710599,15.2626686 7.31570779,15.2251754 7.34608506,15.1698027 C7.36743286,15.2214082 7.37939241,15.2780367 7.37939241,15.3374756 C7.37939241,15.578939 7.18361455,15.774657 6.94221099,15.774657 C6.70080744,15.774657 6.50496978,15.578939 6.50496978,15.3374756 C6.50496978,15.0959525 6.70080744,14.9002344 6.94221099,14.9002344 L6.94221099,14.9002344 Z M6.94221099,16.0853662 C6.52978585,16.0853662 6.19420083,15.7499008 6.19420083,15.3374756 C6.19420083,14.9250505 6.52978585,14.5895253 6.94221099,14.5895253 C7.35457634,14.5895253 7.69010156,14.9250505 7.69010156,15.3374756 C7.69010156,15.7499008 7.35457634,16.0853662 6.94221099,16.0853662 L6.94221099,16.0853662 Z M20.3859431,11.1838037 C18.2619865,16.8117894 13.4653093,19.318631 7.81023526,19.318631 C5.13823222,19.318631 3.00656172,18.3995992 1.64323262,16.8672219 L1.65327865,16.8605843 C2.04609012,16.880497 2.39758135,16.8872541 2.75439457,16.8872541 C3.08065114,16.8872541 3.39979178,16.8838457 3.6953721,16.8672219 C3.72108514,16.8657867 3.75325633,16.8621989 3.77878997,16.8605843 C3.77902916,16.8605245 3.86998155,16.8546046 3.82549202,16.853887 C4.57667146,16.8075437 5.15892224,16.7031368 5.70188589,16.5482008 C5.70200548,16.548141 5.70212508,16.548141 5.70224467,16.5480812 C5.80091098,16.5198567 5.89658739,16.4901372 5.98825735,16.4583846 C6.09081051,16.4228049 6.14510687,16.3108635 6.109587,16.2083104 C6.07406714,16.1056974 5.96218553,16.0512815 5.85957258,16.0869807 C5.16992503,16.3259326 4.26010213,16.4574876 3.14505333,16.4821841 L3.14475434,16.4821841 C2.57739321,16.4947416 1.95717085,16.4797922 1.28450587,16.4365584 L1.28444607,16.4365584 C1.14529669,16.2507668 1.01649231,16.0576798 0.89869073,15.8577161 L0.71248051,15.5172277 C0.149903198,14.4112083 -0.0964037696,13.1191582 0.0343141305,11.7160038 L16.3965356,11.7160038 C17.7407294,11.7160038 19.0534696,11.2143604 19.6764427,10.6609919 C18.5601381,9.75332174 18.670764,7.59731356 19.3822377,6.774616 C19.9997093,7.270758 20.9954018,8.31584342 20.824141,9.64622396 C21.6011531,9.255625 22.9506091,9.06259783 24,9.66816973 C23.3411483,10.9541803 21.8929064,11.3383809 20.3859431,11.1838037 L20.3859431,11.1838037 Z M2.25508329,11.3188869 L4.46771995,11.3188869 L4.46771995,9.1061306 L2.25508329,9.1061306 L2.25508329,11.3188869 Z M4.80808879,11.3188869 L7.02096464,11.3188869 L7.02096464,9.1061306 L4.80808879,9.1061306 L4.80808879,11.3188869 Z M4.80808879,8.76576176 L7.02096464,8.76576176 L7.02096464,6.5530653 L4.80808879,6.5530653 L4.80808879,8.76576176 Z M7.36127369,11.3188869 L9.57402994,11.3188869 L9.57402994,9.1061306 L7.36127369,9.1061306 L7.36127369,11.3188869 Z M7.36127369,8.76576176 L9.57402994,8.76576176 L9.57402994,6.5530653 L7.36127369,6.5530653 L7.36127369,8.76576176 Z M9.91433899,11.3188869 L12.1270952,11.3188869 L12.1270952,9.1061306 L9.91433899,9.1061306 L9.91433899,11.3188869 Z M9.91433899,8.76576176 L12.1270952,8.76576176 L12.1270952,6.5530653 L9.91433899,6.5530653 L9.91433899,8.76576176 Z M9.91433899,6.21275626 L12.1270952,6.21275626 L12.1270952,4 L9.91433899,4 L9.91433899,6.21275626 Z M12.4674043,11.3188869 L14.6801605,11.3188869 L14.6801605,9.1061306 L12.4674043,9.1061306 L12.4674043,11.3188869 Z"
                  />
                </svg>
                <span style={{ width: '10px' }}></span>
                docker
              </ListItem>
              <ListItem>
                <svg
                  width="32px"
                  height="32px"
                  viewBox="0 -18 256 256"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                >
                  <g>
                    <path
                      d="M245.969687,168.943256 C232.308259,176.064479 161.536048,205.163388 146.468577,213.017633 C131.402107,220.873879 123.031844,220.797876 111.129473,215.107699 C99.2271007,209.417521 23.9127473,178.99557 10.3463234,172.511368 C3.56511141,169.270267 0,166.535181 0,163.9511 L0,138.075292 C0,138.075292 98.0490639,116.729625 113.878559,111.051447 C129.707053,105.372269 135.199225,105.167264 148.669646,110.101418 C162.141067,115.036572 242.686583,129.569026 256,134.445178 C256,134.445178 255.993999,157.5559 255.993999,159.954975 C255.996,162.513055 252.923904,165.319143 245.969687,168.943256"
                      fill="#912626"
                    ></path>
                    <path
                      d="M245.964922,143.220067 C232.303935,150.33806 161.534003,179.438032 146.467017,187.292024 C131.401031,195.149018 123.031039,195.072017 111.12905,189.382023 C99.2260618,183.696028 23.9151336,153.269057 10.3491466,146.788063 C-3.21684053,140.303069 -3.50184026,135.840074 9.82514705,130.622079 C23.1511343,125.402084 98.0490629,96.0171117 113.880047,90.3381172 C129.708033,84.6611226 135.199028,84.4541228 148.669014,89.3901181 C162.140002,94.3241134 232.487935,122.325087 245.799922,127.200082 C259.11491,132.081078 259.625908,136.099073 245.964922,143.220067"
                      fill="#C6302B"
                    ></path>
                    <path
                      d="M245.969687,127.074354 C232.308259,134.195577 161.536048,163.294486 146.468577,171.151732 C131.402107,179.004977 123.031844,178.928975 111.129473,173.238797 C99.2261007,167.551619 23.9127473,137.126668 10.3463234,130.642465 C3.56511141,127.401364 0,124.669279 0,122.085199 L0,96.2063895 C0,96.2063895 98.0490639,74.8617226 113.878559,69.182545 C129.707053,63.5043676 135.199225,63.2983612 148.669646,68.2325154 C162.141067,73.1676697 242.686583,87.6971237 256,92.5742761 C256,92.5742761 255.993999,115.684998 255.993999,118.087073 C255.996,120.644153 252.923904,123.450241 245.969687,127.074354"
                      fill="#912626"
                    ></path>
                    <path
                      d="M245.964922,101.351164 C232.303935,108.471157 161.534003,137.569129 146.467017,145.426122 C131.401031,153.280114 123.031039,153.203114 111.12905,147.51312 C99.2260618,141.827125 23.9151336,111.401154 10.3491466,104.91916 C-3.21684053,98.4361664 -3.50184026,93.9721706 9.82514705,88.7521756 C23.1511343,83.5351806 98.0490629,54.1482087 113.880047,48.4702141 C129.708033,42.7922195 135.199028,42.5862197 148.669014,47.521215 C162.140002,52.4552102 232.487935,80.4541835 245.799922,85.3311789 C259.11491,90.2101742 259.625908,94.2301704 245.964922,101.350163 L245.964922,101.351164"
                      fill="#C6302B"
                    ></path>
                    <path
                      d="M245.969687,83.6525661 C232.308259,90.7737887 161.536048,119.873698 146.468577,127.730944 C131.402107,135.585189 123.031844,135.508187 111.129473,129.818008 C99.2261007,124.130831 23.9127473,93.7048802 10.3463234,87.2226777 C3.56511141,83.9805764 0,81.2474909 0,78.6654102 L0,52.7856015 C0,52.7856015 98.0490639,31.4419345 113.878559,25.7637571 C129.707053,20.0845797 135.199225,19.8795733 148.669646,24.8137275 C162.141067,29.7488817 242.686583,44.2783357 256,49.1554881 C256,49.1554881 255.993999,72.2662103 255.993999,74.6672853 C255.996,77.2223652 252.923904,80.0284528 245.969687,83.6525661"
                      fill="#912626"
                    ></path>
                    <path
                      d="M245.964922,57.929387 C232.303935,65.0493802 161.534003,94.1493524 146.467017,102.004345 C131.401031,109.858338 123.031039,109.781338 111.12905,104.093343 C99.2270617,98.4053484 23.9151336,67.9813773 10.3491466,61.4983836 C-3.21684053,55.0153898 -3.50184026,50.550394 9.82514705,45.331399 C23.1511343,40.113404 98.0490629,10.729432 113.880047,5.04943744 C129.708033,-0.629557148 135.199028,-0.833556953 148.669014,4.10143834 C162.140002,9.03643363 232.487935,37.0354069 245.799922,41.9124022 C259.11491,46.7883976 259.625908,50.8093938 245.964922,57.929387"
                      fill="#C6302B"
                    ></path>
                    <path
                      d="M159.282977,32.7570853 L137.273922,35.0422326 L132.346419,46.8976124 L124.387597,33.667969 L98.973147,31.383814 L117.936992,24.5452403 L112.247442,14.0472558 L130.001736,20.9910078 L146.739969,15.5108217 L142.21631,26.3660155 L159.282977,32.7570853"
                      fill="#FFFFFF"
                    ></path>
                    <path
                      d="M131.03169,90.2747287 L89.9546047,73.2378295 L148.815752,64.2034109 L131.03169,90.2747287"
                      fill="#FFFFFF"
                    ></path>
                    <path
                      d="M74.0816124,39.3466047 C91.4568682,39.3466047 105.541829,44.8069457 105.541829,51.5413333 C105.541829,58.2767132 91.4568682,63.736062 74.0816124,63.736062 C56.7073488,63.736062 42.6213953,58.2767132 42.6213953,51.5413333 C42.6213953,44.8069457 56.7073488,39.3466047 74.0816124,39.3466047"
                      fill="#FFFFFF"
                    ></path>
                    <path
                      d="M185.29476,35.9977674 L220.130605,49.7642171 L185.324527,63.5167752 L185.29476,35.9977674"
                      fill="#621B1C"
                    ></path>
                    <path
                      d="M146.754853,51.2426667 L185.29476,35.9977674 L185.324527,63.5167752 L181.546047,64.9952248 L146.754853,51.2426667"
                      fill="#9A2928"
                    ></path>
                  </g>
                </svg>
                <span style={{ width: '10px' }}></span>
                redis
              </ListItem>
              <ListItem>
                <svg
                  width="32px"
                  height="32px"
                  viewBox="-7.5 0 271 271"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                >
                  <path
                    d="M245.44 108.308h-85.09a7.738 7.738 0 0 1-7.735-7.734v-88.68C152.615 5.327 147.29 0 140.726 0h-30.375c-6.568 0-11.89 5.327-11.89 11.894v88.143c0 4.573-3.697 8.29-8.27 8.31l-27.885.133c-4.612.025-8.359-3.717-8.35-8.325l.173-88.241C54.144 5.337 48.817 0 42.24 0H11.89C5.321 0 0 5.327 0 11.894V260.21c0 5.834 4.726 10.56 10.555 10.56H245.44c5.834 0 10.56-4.726 10.56-10.56V118.868c0-5.834-4.726-10.56-10.56-10.56zm-39.902 93.233c0 7.645-6.198 13.844-13.843 13.844H167.69c-7.646 0-13.844-6.199-13.844-13.844v-24.005c0-7.646 6.198-13.844 13.844-13.844h24.005c7.645 0 13.843 6.198 13.843 13.844v24.005z"
                    fill="#F60"
                  />
                </svg>
                <span style={{ width: '10px' }}></span>
                rabbitmq
              </ListItem>
            </List>
          </SkillBox>
        </Box>
      </motion.div>
    </>
  );
};

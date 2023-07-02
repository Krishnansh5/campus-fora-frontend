import React from 'react';
import { Card, CardContent, Container, Grid } from '@mui/material';
// import Divider from '@mui/material/Divider';
// import { max } from 'date-fns';

import Pfp from './components/profilepage/Pfp';
import Details from './components/profilepage/Details';
// import Bio from './components/profilepage/Bio';
import Questionstab from './components/profilepage/Questionstab';

const ProfilePage: React.FC = () => {
  return (
    <div>
      <Container
        sx={{
          marginTop: '2vh'
        }}
      >
        <Card sx={{ maxWidth: '1500px' }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={4} xl={3}>
                <Pfp />
              </Grid>
              <Grid item xs={12} sm={6} md={8} xl={9}>
                <Details />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <h2
          className="bio-heading"
          style={{
            marginTop: '2vh'
          }}
        >
          Bio
        </h2>
        <Card
          sx={{
            backgroundColor: 'rgb(11, 6, 87)',
            color: 'azure',
            padding: '0.5%'
          }}
        >
          <CardContent>
            <p className="bio-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              dolor ipsum, cumque, omnis, dolore esse odit accusamus pariatur
              illo accusantium id architecto!
            </p>
          </CardContent>
        </Card>
      </Container>
      <Container sx={{ marginTop: '10vh' }}>
        <Card sx={{ maxWidth: '1500px' }}>
          <CardContent>
            <Questionstab />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default ProfilePage;

import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';

import Pfp from './components/profilepage/Pfp';
import Details from './components/profilepage/Details';
import Bio from './components/profilepage/Bio';
import Questionstab from './components/profilepage/Questionstab';

const ProfilePage: React.FC = () => {
  return (
    <div>
      <div
        className="profhead"
        style={{
          marginLeft: '650px',
          marginTop: '50px',
          marginBottom: '100px',
          fontSize: '75px',
          fontFamily: 'cursive',
          fontStyle: 'inherit',
          color: 'white',
          fontWeight: 'bolder'
        }}
      >
        Profile
      </div>
      <Container sx={{ marginTop: '50px' }}>
        <Grid container spacing={0} alignItems="center">
          <Grid item xs={4} sm={4} md={4} xl={4}>
            <Pfp />
          </Grid>
          <Grid item xs={8}>
            <Details />
            {/* Add more profile details as needed */}
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          marginTop: '100px',
          marginRight: '200px',
          marginLeft: '200px',
          marginBottom: '100px'
        }}
      >
        <Bio />
      </Box>
      <Box sx={{ paddingLeft: '220px', paddingRight: '220px' }}>
        <Divider variant="middle" style={{ backgroundColor: '#01579b' }} />
      </Box>
      <Box
        sx={{
          marginLeft: '200px',
          marginRight: '200px',
          marginTop: '100px',
          backgroundColor: 'white',
          borderRadius: '10px'
        }}
      >
        <Questionstab />
      </Box>
    </div>
  );
};

export default ProfilePage;

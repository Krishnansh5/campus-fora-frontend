import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Tab,
  Typography
} from '@mui/material';
import React from 'react';
import { useState } from 'react';

export default function Questionstab() {
  const [value, setValue] = useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList aria-label="Tabs exxample" onChange={handleChange} centered>
            <Tab label="My Questions" value="1" />
            <Tab label="Starred Questions" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box sx={{ maxWidth: '100%', padding: '10px' }}>
            <Card>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  sx={{ fontSize: { xs: '18px', sm: '20px', md: '24px' } }}
                >
                  Question 1:
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Velit, doloribus?
                </Typography>
                <Typography
                  gutterBottom
                  color="textSecondary"
                  sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem
                  enim distinctio itaque, iure dolor harum sapiente dolorem
                  accusantium soluta sunt........
                </Typography>
                <Stack direction="row" spacing={1} sx={{ marginTop: '15px' }}>
                  <Chip
                    label="lorem1"
                    variant="outlined"
                    clickable
                    sx={{ fontSize: { xs: '10px', sm: '12px', md: '14px' } }}
                  />
                  <Chip
                    label="lorem2"
                    variant="outlined"
                    clickable
                    sx={{ fontSize: { xs: '10px', sm: '12px', md: '14px' } }}
                  />
                  <Chip
                    label="lorem2"
                    variant="outlined"
                    clickable
                    sx={{ fontSize: { xs: '10px', sm: '12px', md: '14px' } }}
                  />
                </Stack>
                <Typography
                  sx={{
                    fontSize: { xs: '10px', sm: '12px', md: '14px' },
                    marginTop: '20px',
                    textAlign: 'right'
                  }}
                  color="textSecondary"
                >
                  5 answers | Asked 15 days ago
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ maxWidth: '100%', padding: '10px' }}>
            <Card>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  sx={{ fontSize: { xs: '18px', sm: '20px', md: '24px' } }}
                >
                  Question 2:
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Velit, doloribus?
                </Typography>
                <Typography
                  gutterBottom
                  color="textSecondary"
                  sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem
                  enim distinctio itaque, iure dolor harum sapiente dolorem
                  accusantium soluta sunt........
                </Typography>
                <Stack direction="row" spacing={1} sx={{ marginTop: '15px' }}>
                  <Chip
                    label="lorem1"
                    variant="outlined"
                    clickable
                    sx={{ fontSize: { xs: '10px', sm: '12px', md: '14px' } }}
                  />
                  <Chip
                    label="lorem2"
                    variant="outlined"
                    clickable
                    sx={{ fontSize: { xs: '10px', sm: '12px', md: '14px' } }}
                  />
                  <Chip
                    label="lorem2"
                    variant="outlined"
                    clickable
                    sx={{ fontSize: { xs: '10px', sm: '12px', md: '14px' } }}
                  />
                </Stack>
                <Typography
                  sx={{
                    fontSize: { xs: '10px', sm: '12px', md: '14px' },
                    marginTop: '20px',
                    textAlign: 'right'
                  }}
                  color="textSecondary"
                >
                  5 answers | Asked 15 days ago
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Box sx={{ maxWidth: '100%', padding: '10px' }}>
            <Card>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  sx={{ fontSize: { xs: '18px', sm: '20px', md: '24px' } }}
                >
                  Question 1:
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Velit, doloribus?
                </Typography>
                <Typography
                  gutterBottom
                  color="textSecondary"
                  sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem
                  enim distinctio itaque, iure dolor harum sapiente dolorem
                  accusantium soluta sunt........
                </Typography>
                <Stack direction="row" spacing={1} sx={{ marginTop: '15px' }}>
                  <Chip
                    label="lorem1"
                    variant="outlined"
                    clickable
                    sx={{ fontSize: { xs: '10px', sm: '12px', md: '14px' } }}
                  />
                  <Chip
                    label="lorem2"
                    variant="outlined"
                    clickable
                    sx={{ fontSize: { xs: '10px', sm: '12px', md: '14px' } }}
                  />
                  <Chip
                    label="lorem2"
                    variant="outlined"
                    clickable
                    sx={{ fontSize: { xs: '10px', sm: '12px', md: '14px' } }}
                  />
                </Stack>
                <Typography
                  sx={{
                    fontSize: { xs: '10px', sm: '12px', md: '14px' },
                    marginTop: '20px',
                    textAlign: 'right'
                  }}
                  color="textSecondary"
                >
                  5 answers | Asked 15 days ago
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </TabPanel>
      </TabContext>
    </div>
  );
}

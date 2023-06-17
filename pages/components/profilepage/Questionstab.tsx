import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, CardContent, NoSsr } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const handleDelete = () => {
  console.info('You clicked the delete icon.');
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <NoSsr>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="My Questions" {...a11yProps(0)} />
            <Tab label="Starred Questions" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box>
            <Card>
              <CardContent>
                <Typography gutterBottom>Question 1:</Typography>
                <Typography gutterBottom sx={{ fontSize: '24px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Velit, doloribus?
                </Typography>
                <Typography gutterBottom color="gray">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Rem enim distinctio itaque, iure dolor harum sapiente dolorem
                  accusantium soluta sunt........
                </Typography>
                <Stack direction="row" spacing={1} sx={{ marginTop: '15px' }}>
                  <Chip
                    label="lorem1"
                    variant="outlined"
                    onDelete={handleDelete}
                    clickable
                  />
                  <Chip
                    label="lorem2"
                    variant="outlined"
                    onDelete={handleDelete}
                    clickable
                  />
                  <Chip
                    label="lorem2"
                    variant="outlined"
                    onDelete={handleDelete}
                    clickable
                  />
                </Stack>
                <Typography
                  sx={{
                    fontSize: '10px',
                    marginTop: '20px',
                  }}
                >
                  5 answers | Asked 15 days ago
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box>
            <Card>
              <CardContent>
                <Typography gutterBottom>Question 1:</Typography>
                <Typography gutterBottom sx={{ fontSize: '24px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Velit, doloribus?
                </Typography>
                <Typography gutterBottom color="gray">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Rem enim distinctio itaque, iure dolor harum sapiente dolorem
                  accusantium soluta sunt........
                </Typography>
                <Stack direction="row" spacing={1} sx={{ marginTop: '15px' }}>
                  <Chip
                    label="lorem1"
                    variant="outlined"
                    clickable
                  />
                  <Chip
                    label="lorem2"
                    variant="outlined"
                    clickable
                  />
                  <Chip
                    label="lorem2"
                    variant="outlined"
                    clickable
                  />
                </Stack>
                <Typography
                  sx={{
                    fontSize: '10px',
                    marginTop: '20px',
                  }}
                >
                  5 answers | Asked 15 days ago
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box>
            <Card sx={{ marginTop: '5px' }}>
              <CardContent>
                <Typography gutterBottom>Question 2:</Typography>
                <Typography gutterBottom sx={{ fontSize: '24px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Velit, doloribus?
                </Typography>
                <Typography gutterBottom color="gray">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Rem enim distinctio itaque, iure dolor harum sapiente dolorem
                  accusantium soluta sunt........
                </Typography>
                <Stack direction="row" spacing={1} sx={{ marginTop: '15px' }}>
                  <Chip
                    label="lorem1"
                    variant="outlined"
                    clickable
                  />
                  <Chip
                    label="lorem2"
                    variant="outlined"
                    clickable
                  />
                  <Chip
                    label="lorem2"
                    variant="outlined"
                    clickable
                  />
                </Stack>
                <Typography
                  sx={{
                    fontSize: '10px',
                    marginTop: '20px',
                  }}
                >
                  5 answers | Asked 15 days ago
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </TabPanel>
      </Box>
    </NoSsr>
  );
}

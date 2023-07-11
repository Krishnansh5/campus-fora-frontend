import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField
} from '@mui/material';
import Fuse from 'fuse.js';
import * as React from 'react';
import { useState } from 'react';

import characters from './characters.json';
import SlateTextEditor from '@components/text-editor/slateTextEditor';
import { BorderAll, Margin } from '@mui/icons-material';
import { green } from '@mui/material/colors';

// const tags = ['EE792', 'ESC201', 'ESO210/MSO212', 'John Smith'];

export default function Question() {
  const [topic, setTopic] = useState('');

  function handleChange(event: SelectChangeEvent) {
    setTopic(event.target.value as string);
  }

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  // const fuseOptions = {
  //   keys: ['tag'],
  //   threshold: 0.3 // Adjust this value to control the fuzzy search sensitivity
  // };
  // const fuse = new Fuse(
  //   tags.map((tag) => ({ tag })),
  //   fuseOptions
  // );

  const [query, setQuery] = useState('');
  const fuse = new Fuse(characters, {
    keys: ['name']
  });

  const results = fuse.search('');
  const characterResults = query
    ? results.map((result) => result.item)
    : characters;

  function handleOnSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    setQuery(value);
  }

  // type Tag = {
  //   id: number;
  //   label: string;
  // };

  // type TopicWiseTags = {
  //   topicTags: Tag[];
  // };

  return (
    <div>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Card
          sx={{
            width: { xs: '280px', sm: '450px', md: '1200px' },
            minHeight: { xs: '400px', sm: '400px', md: '600px' },
            marginLeft: { xs: '25px', sm: '25px', md: '0' },
            marginRight: { xs: '25px', sm: '25px', md: '0' }
          }}
        >
          <CardContent>
            <Grid container alignItems="center">
              <Grid item xs={8} md={4}>
                <Box sx={{ minWidth: 120, marginBottom: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={topic}
                      label="Select Topic"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>SnT</MenuItem>
                      <MenuItem value={20}>Academics</MenuItem>
                      <MenuItem value={30}>Games and Sports</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  fullWidth
                  multiline
                  variant="outlined"
                  minRows={6}
                  placeholder="Type Your Question Here"
                /> */}
                <Box
                  sx={{
                    margin: 1,
                    border: '1px solid grey',
                    borderRadius: 0.5,
                    minHeight: { xs: '200px', sm: '450px', md: '500px' }
                  }}
                >
                  <SlateTextEditor />
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 2
              }}
            >
              <Box>
                <Chip label="EE210" size="small" onDelete={handleDelete}></Chip>
                <Chip
                  label="ESC201"
                  size="small"
                  onDelete={handleDelete}
                ></Chip>
                <Chip
                  label="MSO202"
                  size="small"
                  onDelete={handleDelete}
                ></Chip>
              </Box>
              <Box sx={{ marginLeft: '10px' }}>
                {/* <Stack maxWidth="250px">
                  <Autocomplete
                    options={tags}
                    renderInput={(params) => (
                      <TextField {...params} label="Tags" />
                    )}
                  />
                </Stack> */}
                <Stack maxWidth="250px">
                  <Autocomplete
                    options={characterResults} // Use the characterResults instead of tags
                    getOptionLabel={(option) => option.name} // Set the label field according to your character object structure
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tags"
                        onChange={handleOnSearch}
                      /> // Add onChange event handler to capture the input value
                    )}
                  />
                </Stack>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 2
              }}
            >
              <Box sx={{ marginTop: 1 }}>
                <Button variant="contained">Post</Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </div>
  );
}

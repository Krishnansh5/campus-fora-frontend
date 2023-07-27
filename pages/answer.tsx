import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  TextField
} from '@mui/material';
import Fuse from 'fuse.js';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';

import { createQuestionRequests } from '@callbacks/createQuestion/createQuestion';
import { Tags } from '@callbacks/posts/type';
import useStore from '@/store/store';
import TextEditor from '@components/text-editor/postsTextEditor';

export default function CreateQuestion() {
  const { topicID } = useStore();

  const [tags, setTags] = useState<Tags[]>([]);
  const [tagList, setTagList] = useState<Tags[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);

  const [query, setQuery] = useState('');
  const fuse = useMemo(
    () =>
      new Fuse(tags, {
        keys: ['name']
      }),
    [tags]
  );

  const fuzzySearch = useCallback(
    (newQuery: string) => {
      const res = fuse?.search(newQuery);
      const results = newQuery?.length
        ? res?.map((result) => result.item)
        : tags;
      const filteredResults = results.filter(
        (tag) => !selectedTags.includes(tag)
      );
      setTagList(filteredResults);
    },
    [fuse, selectedTags, tags]
  );

  function handleOnSelect(value: string) {
    setQuery(value);
    fuzzySearch(value);
  }

  function handleOnChange(e, value: Tags) {
    e.preventDefault();
    setQuery('');
    setSelectedTags([...selectedTags, value]);
  }

  function handleRemoveTag(tag: Tags) {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  }

  useEffect(() => {
    const getAllTags = async () => {
      const res = await createQuestionRequests.getAllTags(topicID);
      setTags(res);
      setTagList(res);
    };
    getAllTags();
  }, [topicID]);

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
              <Grid item xs={12}>
                <TextEditor />
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
                {selectedTags.map((tag) => (
                  <Chip
                    key={tag.id}
                    label={tag.name}
                    size="small"
                    onDelete={() => handleRemoveTag(tag)}
                  ></Chip>
                ))}
              </Box>
              <Box sx={{ marginLeft: '10px' }}>
                <Stack maxWidth="250px">
                  <Autocomplete
                    options={tagList}
                    getOptionLabel={(option) => option.name}
                    filterOptions={(x) => x}
                    value={null}
                    renderInput={(params) => (
                      <TextField {...params} label="Tags" value={query} />
                    )}
                    filterSelectedOptions
                    clearOnEscape
                    onChange={handleOnChange}
                    onSelect={(e) => {
                      e.preventDefault();
                      handleOnSelect((e.target as HTMLInputElement).value);
                    }}
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

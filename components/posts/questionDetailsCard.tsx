import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import React from 'react';

import { Question } from '@callbacks/posts/type';

export default function questionDetailsCard({
  question
}: {
  question: Question;
}) {
  return (
    <Card>
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          sx={{ fontSize: { xs: '18px', sm: '20px', md: '24px' } }}
        >
          {question?.title}
        </Typography>
        <Typography
          gutterBottom
          sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }}
        >
          {question?.content}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ marginTop: '15px' }}>
          {question?.tags?.map((tag) => (
            <Chip
              key={tag.id}
              label={tag?.name}
              variant="outlined"
              clickable
              sx={{ fontSize: { xs: '10px', sm: '12px', md: '14px' } }}
            />
          ))}
        </Stack>
        <Typography
          sx={{
            fontSize: { xs: '10px', sm: '12px', md: '14px' },
            marginTop: '20px',
            textAlign: 'right'
          }}
          color="textSecondary"
        >
          {question?.answers?.length} answers | Asked 15 days ago
        </Typography>
      </CardContent>
    </Card>
  );
}

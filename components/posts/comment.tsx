import React from 'react';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import { CardActions, Typography } from '@mui/material';
import { formatDistance, subDays } from 'date-fns';

import UserAvatar from '@components/avatar/userAvatar';
import { Comment } from '@callbacks/types';

export default function CommentDisplay({ comment }: { comment: Comment }) {
  return (
    <CardActions
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pt: 2
      }}
    >
      <UserAvatar userName="" />
      <Typography
        display="flex"
        alignItems="center"
        variant="subtitle2"
        sx={{ pl: 1.5 }}
      >
        {comment.content}
      </Typography>
      <Typography display="flex" alignItems="center" variant="subtitle2">
        <TodayTwoToneIcon
          sx={{
            mr: 1
          }}
        />
        {formatDistance(subDays(new Date(), 24), new Date(), {
          addSuffix: true
        })}
      </Typography>
    </CardActions>
  );
}

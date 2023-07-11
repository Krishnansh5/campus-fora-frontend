import React from 'react';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import { CardActions, Typography } from '@mui/material';

import UserAvatar from '@components/avatar/userAvatar';
import { Comment } from '@callbacks/posts/type';
import { getTimeDifference } from 'utils/time-utils';

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
        {getTimeDifference(comment?.CreatedAt)}
      </Typography>
    </CardActions>
  );
}

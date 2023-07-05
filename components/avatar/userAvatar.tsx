import { Avatar, AvatarGroup, Link, Tooltip, Typography } from '@mui/material';
import React from 'react';

export default function UserAvatar({ userName }: { userName: string }) {
  return (
    <AvatarGroup>
      <Tooltip arrow title={userName}>
        <Avatar
          sx={{
            width: 40,
            height: 40
          }}
          component={Link}
          href="#"
          alt="Remy Sharp"
          src="/static/images/avatars/3.jpg"
        />
      </Tooltip>
      <Typography
        display="flex"
        alignItems="center"
        variant="subtitle2"
        sx={{ pl: 1.5 }}
      >
        {userName}
      </Typography>
    </AvatarGroup>
  );
}

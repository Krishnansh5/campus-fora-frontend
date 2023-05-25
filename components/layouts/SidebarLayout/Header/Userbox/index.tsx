import React from 'react';
import { useRef, useState } from 'react';
import NextLink from 'next/link';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
  lighten
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';

import { userInfo } from '@/layouts/SidebarLayout/index';
import useStore from '@/store/store';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox({ userInfo: userDetail }: { userInfo: userInfo }) {
  const { role } = useStore();
  const user = {
    name: userDetail.name,
    avatar: userDetail.avatar
  };

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  if (!userDetail.signedIn) {
    return <div>Login</div>;
  } else {
    return (
      <>
        <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
          <Avatar variant="rounded" alt={user.name} src={user.avatar} />
          <Hidden mdDown>
            <UserBoxText>
              <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
              <UserBoxDescription variant="body2">
                {role == 100 && 'Admin'}
                {role == 101 && 'Moderator'}
              </UserBoxDescription>
            </UserBoxText>
          </Hidden>
          <Hidden smDown>
            <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
          </Hidden>
        </UserBoxButton>
        <Popover
          anchorEl={ref.current}
          onClose={handleClose}
          open={isOpen}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuUserBox sx={{ minWidth: 210 }} display="flex">
            <Avatar variant="rounded" alt={user.name} src={user.avatar} />
            <UserBoxText>
              <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
              <UserBoxDescription variant="body2">
                {role == 100 && 'Admin'}
                {role == 101 && 'Moderator'}
              </UserBoxDescription>
            </UserBoxText>
          </MenuUserBox>
          <Divider sx={{ mb: 0 }} />
          <List sx={{ p: 1 }} component="nav">
            <NextLink href="/management/profile" passHref>
              <ListItem button>
                <AccountBoxTwoToneIcon fontSize="small" />
                <ListItemText primary="My Profile" />
              </ListItem>
            </NextLink>
          </List>
          <Divider />
          <Box sx={{ m: 1 }}>
            <Button color="primary" fullWidth>
              <LockOpenTwoToneIcon sx={{ mr: 1 }} />
              Sign out
            </Button>
          </Box>
        </Popover>
      </>
    );
  }
}

export default HeaderUserbox;

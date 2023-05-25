import { FC, ReactNode, useEffect } from 'react';
import { Box, alpha, lighten, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import TopicIcon from '@mui/icons-material/Topic';

import useStore from '@/store/store';
import { SidebarContext } from '@/contexts/SidebarContext';

import Header from './Header';
import Sidebar from './Sidebar';

interface SidebarLayoutProps {
  children?: ReactNode;
}

export interface userInfo {
  signedIn: boolean;
  avatar: string;
  name: string;
}
export interface fields {
  route: string;
  section: {
    title: string;
    items: items[];
  }[];
}

interface items {
  avatar: JSX.Element;
  name: string;
  callback: () => void;
}

interface layoutings {
  [key: string]: React.ComponentType<{
    items?: fields;
  }>;
}

interface iding {
  [key: string]: number;
}

const ids: iding = {
  mainPage: 0
};

const SidebarLayout: FC<SidebarLayoutProps> = ({
  children
}: {
  children: JSX.Element;
}) => {
  const theme = useTheme();
  const { setCurrentTopic } = useContext(SidebarContext);
  let layoutType: string = children.type.layout;
  if (!layoutType) {
    layoutType = 'none';
  }
  const id = ids[layoutType];

  const { role, name } = useStore();

  useEffect(() => {
    // fetch user profile data that needs to be in header
  }, []);

  const userInfo: userInfo = {
    signedIn: true,
    avatar: '', //change this to the user's avatar
    name: name
  };

  const sideBarItems: fields[] = [
    {
      route: '/main',
      section: [
        {
          title: 'Topics',
          items: [
            {
              avatar: <TopicIcon />,
              name: 'Topic X',
              callback: () => {
                setCurrentTopic('Topic X');
              } // fetch data from the correct endpoint and then cache it with a small expiration time
              // this callback only sets the current topic in the context and then data fetching occours in main.tsx
            },
            {
              avatar: <TopicIcon />,
              name: 'Topic Y',
              callback: () => {
                setCurrentTopic('Topic Y');
              }
            },
            {
              avatar: <TopicIcon />,
              name: 'Topic Z',
              callback: () => {
                setCurrentTopic('Topic Z');
              }
            }
          ]
        }
      ]
    }
  ];

  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: '100%',

          '.MuiPageTitle-wrapper': {
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 1px 0 ${alpha(
                  lighten(theme.colors.primary.main, 0.7),
                  0.15
                )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                  theme.colors.alpha.black[100],
                  0.1
                )}, 0px 5px 12px -4px ${alpha(
                  theme.colors.alpha.black[100],
                  0.05
                )}`
          }
        }}
      >
        <Header user={userInfo} />
        <Sidebar items={sideBarItems[id]} />
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            pt: `${theme.header.height}`,
            [theme.breakpoints.up('lg')]: {
              ml: `${theme.sidebar.width}`
            }
          }}
        >
          <Box display="block">{children}</Box>
        </Box>
      </Box>
    </>
  );
};

SidebarLayout.propTypes = {
  children: PropTypes.node
};

export default SidebarLayout;

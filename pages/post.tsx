import React, { useState } from 'react';
import {
  Box,
  Card,
  Toolbar,
  Tooltip,
  Typography,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Collapse,
  IconButton,
  TextField,
  useTheme,
  styled,
  Grid,
  Avatar,
  AvatarGroup,
  Chip,
  Divider,
  Link
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon, Person as PersonIcon } from '@mui/icons-material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ReportIcon from '@mui/icons-material/Report';
import StarIcon from '@mui/icons-material/Star';
import AddCommentIcon from '@mui/icons-material/AddComment';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { formatDistance, subDays } from 'date-fns';

import SidebarLayout from '@/layouts/SidebarLayout';

const drawerWidth = 240;

//const theme = createTheme();

/*const StyledAppBar = styled(AppBar)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;

const StyledDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;
`;*/

const StyledContent = styled('main')`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing(3)};
`;

const StyledQuestionContainer = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const StyledLine = styled('div')`
  border-bottom: 1px solid;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledAnswerContainer = styled('div')`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledAnswerCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

/*const StyledExpandIcon = styled(ExpandMoreIcon)`
  margin-left: auto;
`;*/

const StyledExpandedContent = styled('div')`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

/*const StyledAvatar = styled(Avatar)`
  margin-right: ${({ theme }) => theme.spacing(2)};
`;*/

const Home = () => {
  const theme = useTheme();

  const [follow, setFollow] = useState(false);
    const handleFollowClick = () => {
        setFollow(!follow);
    };

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const handleCommentsExpandClick = () => {
    setCommentsExpanded(!commentsExpanded);
  };

  const [likes, setLikes] = useState(10);
  const [isLiked, setLiked] = useState(false);
  const handleLikeClick = () => {
    if (!isLiked) {
      setLiked(true);
      setLikes(likes + 1);
    } else {
      setLiked(false);
      setLikes(likes - 1);
    }
  };

  const [votes, setVotes] = useState(0);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const handleUpvoteClick = () => {
    if (upvoted) {
      setUpvoted(false);
      setVotes(prevVotes => prevVotes - 1);
    } else if (downvoted) {
      setUpvoted(true);
      setDownvoted(false);
      setVotes(prevVotes => prevVotes + 2);
    } else {
      setUpvoted(true);
      setVotes(prevVotes => prevVotes + 1);
    }
  };
  const handleDownvoteClick = () => {
    if (downvoted) {
      setDownvoted(false);
      setVotes(prevVotes => prevVotes + 1);
    } else if (upvoted) {
      setUpvoted(false);
      setDownvoted(true);
      setVotes(prevVotes => prevVotes - 2);
    } else {
      setDownvoted(true);
      setVotes(prevVotes => prevVotes - 1);
    }
  };

  const handleClick = () => {};

  return (
    <Box sx={{ display: 'flex' }}>      
      <StyledContent>
        <Toolbar />
        <StyledQuestionContainer>
        <Card 
          variant="outlined"
          sx={{
            p: 3,
            background: `${theme.colors.alpha.black[5]}`,
                }}
        >
          <Grid container
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
          <Typography variant="h2">First Post of campus fora</Typography>
          { follow ?
            (<Tooltip title="Following">
            <IconButton color="secondary" aria-label="report" onClick={handleFollowClick} >
              <StarIcon />
            </IconButton>
        </Tooltip>) :
        (<Tooltip title="Follow">
            <IconButton color="secondary" aria-label="report" onClick={handleFollowClick} >
              <StarBorderIcon />
            </IconButton>
        </Tooltip>)}
          </Grid>
          <CardActions
        sx={{
                  display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
                  pt: 2,
                }}
      >
        <AvatarGroup>
          <Tooltip arrow title={'Krishnansh'}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
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
            Krishnansh Agarwal
          </Typography>
        </AvatarGroup>
        <Typography display="flex" alignItems="center" variant="subtitle2">
          <TodayTwoToneIcon
            sx={{
              mr: 1,
                        }} />
          {formatDistance(subDays(new Date(), 24), new Date(), {
            addSuffix: true,
                    })}
        </Typography>
      </CardActions>
      <Box
        sx={{
          pt: 1,
                }}
      >
        <Chip
          sx={{
                      mr: 0.5,
                    }}
          size="small"
          label="Website"
          color="secondary"
          onClick={handleClick}
        />
        <Chip
          sx={{
            mr: 0.5,
                    }}
          size="small"
          label="Integrations"
          color="secondary"
          onClick={handleClick}
        />
      </Box>
      <Divider
        sx={{
          my: 2,
                }} />
            <CardContent>
            <Typography sx={{ py: 0, pl: 1, }} color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              iaculis felis in ligula eleifend scelerisque. Donec vel commodo
              odio. Sed gravida ipsum vel ligula pharetra, vel fringilla urna
              lobortis. Proin sagittis venenatis sollicitudin. Sed ullamcorper
              neque sit amet sagittis lacinia. Nulla in elit eget tortor
              sollicitudin luctus. Fusce iaculis ipsum ac tortor eleifend, sit
              amet eleifend lacus lacinia. Suspendisse id volutpat purus. Donec
              pellentesque lacus non sapien commodo, eget faucibus velit
              placerat.
            </Typography>
            <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pl: 1,
          py: 2,
                }}
      >
        {isLiked && (
          <Button size="small" variant="contained" onClick={handleLikeClick}>
            <FavoriteIcon />
            <Typography
              sx={{
                              ml: 1,
                            }}
              variant="button"
            >
              {likes}
            </Typography>
          </Button>
        )}
        {!isLiked && (
          <Button size="small" variant="outlined" onClick={handleLikeClick}>
            <FavoriteBorderOutlinedIcon />
            <Typography
              sx={{
                ml: 1,}}
              variant="button"
            >
              {likes}
            </Typography>
          </Button>
        )}
        <Tooltip title="Report This Topic">
            <IconButton color="secondary" aria-label="report">
              <ReportIcon />
            </IconButton>
        </Tooltip>
      </Box>
            <Typography variant="subtitle1">Number of Answers: 5</Typography>
          </CardContent>
        </Card>
        </StyledQuestionContainer>
        <StyledLine />
        <StyledAnswerContainer>
          <StyledAnswerCard variant="outlined">
            <CardHeader
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pt: 1,
                    pb: 0,
                  }}
              avatar={
                <Grid container alignItems="center">
                  <Grid item>
                    <div>
                      <IconButton onClick={handleUpvoteClick}>
                        {upvoted ? (
                          <ArrowDropUpIcon
                            color="primary"
                          />
                        ) : (
                          <ArrowDropUpIcon />
                        )}
                      </IconButton>
                      <Typography variant="subtitle2" style={{ marginLeft: '14px' }}>{votes}</Typography>
                      <IconButton onClick={handleDownvoteClick}>
                        {downvoted ? (
                          <ArrowDropDownIcon
                            color="primary"
                          />
                        ) : (
                          <ArrowDropDownIcon />
                        )}
                      </IconButton>
                    </div>
                  </Grid>
                  <Grid item>
                    <Avatar
                      alt="First Person"
                      src="first-person-image.jpg"
                    >
                      <PersonIcon />
                    </Avatar>
                  </Grid>
                </Grid>
              }
              title="First Person"
              subheader="When Answered: May 30, 2023"
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
            <StyledExpandedContent
                sx={{
                    p: 2,
                    pt: 0,
                    //background: `${theme.colors.alpha.black[5]}`,
                        }}
                >
                <Typography variant="body1" color="text.secondary">
                Morbi vulputate maximus ligula, nec sollicitudin nibh
                  fermentum et. Nullam dapibus consectetur massa in varius. Nunc
                  vestibulum turpis ipsum, at varius sapien congue et. Sed
                  venenatis tincidunt est, in elementum urna varius nec. Quisque
                  feugiat, urna et hendrerit elementum, odio urna commodo
                  ligula, ut efficitur velit orci ac tortor. Suspendisse
                  efficitur erat in massa iaculis, sit amet lacinia sapien
                  lacinia. Morbi lacinia massa non bibendum aliquam. Nulla in
                  ipsum sed nisi volutpat pellentesque. Suspendisse cursus velit
                  id bibendum feugiat. Aliquam sed odio vitae libero consectetur
                  volutpat. Nullam venenatis semper eleifend. Donec fringilla,
                  sem et facilisis congue, metus ligula suscipit nisi, ut
                  tincidunt tortor turpis sit amet mauris.
                </Typography>
                <Box
                    sx={{
                    width: 500,
                    maxWidth: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    }}
                >
                    <AddCommentIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField fullWidth id="filled-basic" label="Add a comment" variant="standard" />
                </Box>
                <Typography variant="h4" style={{ marginTop: '16px' }}>Comments</Typography>
                <Collapse in={commentsExpanded} timeout="auto" unmountOnExit>
                    <CardActions
                        sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        pt: 2,
                        }}
                    >
                    <AvatarGroup>
                        <Tooltip arrow title={'Krishnansh'}>
                        <Avatar
                        sx={{
                        width: 40,
                        height: 40,
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
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta nihil quasi nesciunt, tempora dolores porro rerum inventore illum repellat architecto necessitatibus rem dolorum asperiores quas quod, quidem minus in aperiam.
                    </Typography>
                    </AvatarGroup>
                    <Typography display="flex" alignItems="center" variant="subtitle2">
                    <TodayTwoToneIcon
                        sx={{
                        mr: 1,
                        }} />
                    {formatDistance(subDays(new Date(), 24), new Date(), {
                        addSuffix: true,
                    })}
                    </Typography>
                </CardActions>
                </Collapse>
                <IconButton
                onClick={handleCommentsExpandClick}
                aria-expanded={commentsExpanded}
                aria-label="show more"
              >
                { commentsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </StyledExpandedContent>
            </CardContent>
            </Collapse>
            <CardActions disableSpacing>
              <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                { expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </CardActions>
          </StyledAnswerCard>
        </StyledAnswerContainer>
      </StyledContent>
    </Box>
  );
};

Home.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Home;

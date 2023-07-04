import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ReportIcon from '@mui/icons-material/Report';
import StarIcon from '@mui/icons-material/Star';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { formatDistance, subDays } from 'date-fns';

import { Question } from '@callbacks/types';
import UserAvatar from '@components/avatar/userAvatar';

const StyledQuestionContainer = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export default function QuestionCard({ question }: { question: Question }) {
  const theme = useTheme();

  const [follow, setFollow] = useState(false);
  const handleFollowClick = () => {
    setFollow(!follow);
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

  return (
    <StyledQuestionContainer>
      <Card
        variant="outlined"
        sx={{
          p: 3,
          background: `${theme.colors.alpha.black[5]}`
        }}
      >
        <Grid
          container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h2">{question?.title}</Typography>
          <Tooltip title={follow ? 'unfollow' : 'follow'}>
            <IconButton
              color="secondary"
              aria-label="report"
              onClick={handleFollowClick}
            >
              {follow ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Tooltip>
        </Grid>
        <CardActions
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pt: 2
          }}
        >
          <UserAvatar userName={question?.createdByUserName} />
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
        <Box
          sx={{
            pt: 1
          }}
        >
          {question?.tags.map((tag) => (
            <Chip
              key={tag.id}
              sx={{
                mr: 0.5
              }}
              size="small"
              label={tag.name}
              color="secondary"
              onClick={() => {}}
            />
          ))}
        </Box>
        <Divider
          sx={{
            my: 2
          }}
        />
        <CardContent>
          <Typography sx={{ py: 0, pl: 1 }} color="text.secondary">
            {question?.content}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pl: 1,
              py: 2
            }}
          >
            <Button size="small" variant="contained" onClick={handleLikeClick}>
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
              <Typography
                sx={{
                  ml: 1
                }}
                variant="button"
              >
                {likes}
              </Typography>
            </Button>
            <Tooltip title="Report This Topic">
              <IconButton color="secondary" aria-label="report">
                <ReportIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="subtitle1">
            Number of Answers: {question?.answers.length}
          </Typography>
        </CardContent>
      </Card>
    </StyledQuestionContainer>
  );
}

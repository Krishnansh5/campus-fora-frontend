import React, { useEffect, useState } from 'react';
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
  Stack,
  Tooltip,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import StarIcon from '@mui/icons-material/Star';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import StarBorderIcon from '@mui/icons-material/StarBorder';
// import { formatDistance, subDays } from 'date-fns';
// import Snackbar from '@mui/material/Snackbar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import { Answer, Question } from '@callbacks/posts/type';
import UserAvatar from '@components/avatar/userAvatar';
import { getTimeDifference } from 'utils/time-utils';
import { QuestionPageRequests } from '@callbacks/posts/question';
import { votingRequests } from '@callbacks/likes/voting';

const StyledQuestionContainer = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

interface LikeCount {
  likes: number;
  dislikes: number;
}

interface LikeStatus {
  liked: boolean;
  disliked: boolean;
}

export default function QuestionCard({
  question,
  ansCount
}: {
  question: Question;
  ansCount: number;
}) {
  const theme = useTheme();
  const [follow, setFollow] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(
    question
  );
  const updateFollowStatus = async () => {
    const res = await QuestionPageRequests.updateQuestionFollowStatus(
      question?.uuid
    );
    if (res !== null) {
      setFollow(res);
    } else {
      setFollow(!follow);
    }
  };
  const handleFollowClick = () => {
    setFollow(!follow);
    updateFollowStatus();
  };

  const [likes, setLikes] = useState<LikeCount>({
    likes: 0,
    dislikes: 0
  });
  const [likeStatus, setLikeStatus] = useState<LikeStatus>({
    liked: false,
    disliked: false
  });
  const handleLike = () => {
    if (likeStatus.liked) {
      setLikeStatus({ liked: false, disliked: false });
      setLikes((prevlikes) => ({
        likes: prevlikes.likes - 1,
        dislikes: prevlikes.dislikes
      }));
      votingRequests.updateLikeStatus(0, question.uuid);
    } else if (likeStatus.disliked) {
      setLikeStatus({ liked: true, disliked: false });
      setLikes((prevlikes) => ({
        likes: prevlikes.likes + 1,
        dislikes: prevlikes.dislikes - 1
      }));
      votingRequests.updateLikeStatus(1, question.uuid);
    } else {
      setLikeStatus({ liked: true, disliked: false });
      setLikes((prevlikes) => ({
        likes: prevlikes.likes + 1,
        dislikes: prevlikes.dislikes
      }));
      votingRequests.updateLikeStatus(1, question.uuid);
    }
  };
  const handleDislike = () => {
    if (likeStatus.disliked) {
      setLikeStatus({ liked: false, disliked: false });
      setLikes((prevlikes) => ({
        likes: prevlikes.likes,
        dislikes: prevlikes.dislikes - 1
      }));
      votingRequests.updateLikeStatus(0, question.uuid);
    } else if (likeStatus.liked) {
      setLikeStatus({ liked: false, disliked: true });
      setLikes((prevlikes) => ({
        likes: prevlikes.likes - 1,
        dislikes: prevlikes.dislikes + 1
      }));
      votingRequests.updateLikeStatus(-1, question.uuid);
    } else {
      setLikeStatus({ liked: false, disliked: true });
      setLikes((prevlikes) => ({
        likes: prevlikes.likes,
        dislikes: prevlikes.dislikes + 1
      }));
      votingRequests.updateLikeStatus(-1, question.uuid);
    }
  };

  useEffect(() => {
    const fetchFollowStatus = async () => {
      const res = await QuestionPageRequests.getQuestionFollowStatus(
        question?.uuid
      );
      setFollow(res);
    };
    const getLikeStatus = async () => {
      const res = await votingRequests.getUserLikeStatus(question?.uuid);
      if (res != null) {
        setLikeStatus({
          liked: res === 1,
          disliked: res === -1
        });
      }
    };
    const getLikeCount = async () => {
      const res = await votingRequests.getLikeCount(question?.uuid);
      if (res != null) {
        setLikes({
          likes: res.likeCount,
          dislikes: res.dislikeCount
        });
      }
    };
    getLikeCount();
    getLikeStatus();
    fetchFollowStatus();
  }, [question?.uuid]);

  const [showAnswerWindow, setShowAnswerWindow] = useState(false);
  const [answerContent, setAnswerContent] = useState('');
  const [reqPending, setReqPending] = useState(false);
  // const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleAnswerClick = async () => {
    setShowAnswerWindow(!showAnswerWindow);
  };

  const submitAnswer = async () => {
    console.log('submitAnswer function called');
    if (!question) return;
    if (answerContent === '' || reqPending) return;
    const reqBody: Answer = {
      parentId: question.uuid,
      content: answerContent,
      uuid: '',
      CreatedAt: '',
      UpdatedAt: '',
      isAnswer: true,
      createdByUserId: 0,
      createdByUserName: '',
      comments: []
    };
    console.log(question.uuid);
    console.log(reqBody);
    try {
      const res = await QuestionPageRequests.createNewAnswer(reqBody);
      if (res != null) {
        const updatedQuestion = { ...currentQuestion };
        updatedQuestion.answers = updatedQuestion.answers || [];
        updatedQuestion.answers.push(res);
        setCurrentQuestion(updatedQuestion);
        setAnswerContent('');
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
    setReqPending(false);
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
            {getTimeDifference(question?.CreatedAt)}
          </Typography>
        </CardActions>
        <Box
          sx={{
            pt: 1
          }}
        >
          {question?.tags?.map((tag) => (
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
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="contained" onClick={handleLike}>
                {likeStatus.liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                <Typography
                  sx={{
                    ml: 1
                  }}
                  variant="button"
                >
                  {likes.likes}
                </Typography>
              </Button>
              <Button size="small" variant="contained" onClick={handleDislike}>
                {likeStatus.disliked ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOffAltIcon />
                )}
                <Typography
                  sx={{
                    ml: 1
                  }}
                  variant="button"
                >
                  {likes.dislikes}
                </Typography>
              </Button>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="contained"
                onClick={handleAnswerClick}
              >
                <Typography variant="button">
                  {showAnswerWindow ? 'Cancel Answer' : 'Create Answer'}
                </Typography>
              </Button>
              <Tooltip title="Report This Question">
                <IconButton color="secondary" aria-label="report">
                  <ReportIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
          {showAnswerWindow && (
            <div
              style={{
                background: theme.palette.background.paper,
                padding: '10px'
              }}
            >
              <textarea
                rows={4}
                cols={50}
                placeholder="Write your answer here..."
                style={{
                  background: theme.palette.background.paper,
                  width: '100%',
                  border: '0px solid',
                  borderColor: theme.palette.divider,
                  padding: '5px',
                  outline: 'none'
                }}
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={submitAnswer}
              >
                Submit Answer
              </Button>
            </div>
          )}

          <Typography variant="subtitle1">
            Number of Answers: {ansCount}
          </Typography>
        </CardContent>
      </Card>
    </StyledQuestionContainer>
  );
}

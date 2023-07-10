import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  styled
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddCommentIcon from '@mui/icons-material/AddComment';

import UserAvatar from '@components/avatar/userAvatar';
import { Answer } from '@callbacks/posts/type';
import { Comment } from '@callbacks/posts/type';
import { QuestionPageRequests } from '@callbacks/posts/question';
import useStore from '@/store/store';
import { getTimeDifference } from 'utils/time-utils';
import { votingRequests } from '@callbacks/likes/voting';

import CommentDisplay from './comment';

const StyledAnswerContainer = styled('div')`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledAnswerCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledExpandedContent = styled('div')`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

interface VoteCount {
  upvotes: number;
  downvotes: number;
}

interface VoteStatus {
  upvoted: boolean;
  downvoted: boolean;
}

export default function AnswerCard({ answer }: { answer: Answer }) {
  const { name, userID } = useStore();
  const [commentValue, setCommentValue] = useState('');
  const [reqPending, setReqPending] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const handleCommentsExpandClick = () => {
    setCommentsExpanded(!commentsExpanded);
  };

  const [votes, setVotes] = useState<VoteCount>({
    upvotes: 0,
    downvotes: 0
  });
  const [voteStatus, setVoteStatus] = useState<VoteStatus>({
    upvoted: false,
    downvoted: false
  });
  const handleUpvoteClick = () => {
    if (voteStatus.upvoted) {
      setVoteStatus({ upvoted: false, downvoted: false });
      setVotes((prevVotes) => ({
        upvotes: prevVotes.upvotes - 1,
        downvotes: prevVotes.downvotes
      }));
      votingRequests.updateLikeStatus(0, answer.uuid);
    } else if (voteStatus.downvoted) {
      setVoteStatus({ upvoted: true, downvoted: false });
      setVotes((prevVotes) => ({
        upvotes: prevVotes.upvotes + 1,
        downvotes: prevVotes.downvotes - 1
      }));
      votingRequests.updateLikeStatus(1, answer.uuid);
    } else {
      setVoteStatus({ upvoted: true, downvoted: false });
      setVotes((prevVotes) => ({
        upvotes: prevVotes.upvotes + 1,
        downvotes: prevVotes.downvotes
      }));
      votingRequests.updateLikeStatus(1, answer.uuid);
    }
  };
  const handleDownvoteClick = () => {
    if (voteStatus.downvoted) {
      setVoteStatus({ upvoted: false, downvoted: false });
      setVotes((prevVotes) => ({
        upvotes: prevVotes.upvotes,
        downvotes: prevVotes.downvotes - 1
      }));
      votingRequests.updateLikeStatus(0, answer.uuid);
    } else if (voteStatus.upvoted) {
      setVoteStatus({ upvoted: false, downvoted: true });
      setVotes((prevVotes) => ({
        upvotes: prevVotes.upvotes - 1,
        downvotes: prevVotes.downvotes + 1
      }));
      votingRequests.updateLikeStatus(-1, answer.uuid);
    } else {
      setVoteStatus({ upvoted: false, downvoted: true });
      setVotes((prevVotes) => ({
        upvotes: prevVotes.upvotes,
        downvotes: prevVotes.downvotes + 1
      }));
      votingRequests.updateLikeStatus(-1, answer.uuid);
    }
  };

  useEffect(() => {
    const getVoteStatus = async () => {
      const res = await votingRequests.getUserLikeStatus(answer.uuid);
      if (res != null) {
        setVoteStatus({
          upvoted: res === 1,
          downvoted: res === -1
        });
      }
    };
    const getVoteCount = async () => {
      const res = await votingRequests.getLikeCount(answer.uuid);
      if (res != null) {
        setVotes({
          upvotes: res.likeCount,
          downvotes: res.dislikeCount
        });
      }
    };
    getVoteCount();
    getVoteStatus();
  }, [answer?.uuid]);

  const addComment = async () => {
    if (commentValue === '' || reqPending) return;
    const reqBody: Comment = {
      content: commentValue,
      createdByUserId: userID,
      createdByUserName: name,
      parentID: answer.uuid,
      uuid: '',
      CreatedAt: '',
      UpdatedAt: ''
    };
    const res = await QuestionPageRequests.createNewComment(reqBody);
    if (res != null) {
      answer.comments.push(res);
      setCommentValue('');
    }
    setReqPending(false);
  };

  return (
    <StyledAnswerContainer>
      <StyledAnswerCard variant="outlined">
        <CardHeader
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pt: 1,
            pb: 0
          }}
          avatar={
            <Grid container alignItems="center">
              <Grid item>
                <div>
                  <IconButton onClick={handleUpvoteClick}>
                    {voteStatus.upvoted ? (
                      <ArrowDropUpIcon color="primary" />
                    ) : (
                      <ArrowDropUpIcon />
                    )}
                  </IconButton>
                  <Typography
                    variant="subtitle2"
                    style={{ marginLeft: '14px', color: '#009900' }}
                  >
                    {votes.upvotes}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ marginLeft: '14px', color: '#ff0066' }}
                  >
                    {votes.downvotes}
                  </Typography>
                  <IconButton onClick={handleDownvoteClick}>
                    {voteStatus.downvoted ? (
                      <ArrowDropDownIcon color="primary" />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                  </IconButton>
                </div>
              </Grid>
              <Grid item>
                <UserAvatar userName={answer?.createdByUserName} />
              </Grid>
            </Grid>
          }
          title={answer?.createdByUserName}
          subheader={`Answered ${getTimeDifference(answer.CreatedAt)}`}
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <StyledExpandedContent
              sx={{
                p: 2,
                pt: 0
                //background: `${theme.colors.alpha.black[5]}`,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                {answer?.content}
              </Typography>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                  display: 'flex',
                  alignItems: 'flex-end'
                }}
              >
                <IconButton
                  onClick={() => {
                    setReqPending(true);
                    addComment();
                  }}
                >
                  <AddCommentIcon
                    sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                  />
                </IconButton>
                <TextField
                  fullWidth
                  id="filled-basic"
                  label="Add a comment"
                  variant="standard"
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                />
              </Box>
              <Typography variant="h4" style={{ marginTop: '16px' }}>
                Comments
              </Typography>
              <Collapse in={commentsExpanded} timeout="auto" unmountOnExit>
                {answer?.comments?.map((comment) => (
                  <CommentDisplay comment={comment} />
                ))}
              </Collapse>
              <Tooltip
                arrow
                title={commentsExpanded ? 'Hide Comments' : 'Show Comments'}
              >
                <IconButton
                  onClick={handleCommentsExpandClick}
                  aria-expanded={commentsExpanded}
                  aria-label="comments"
                >
                  {commentsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Tooltip>
            </StyledExpandedContent>
          </CardContent>
        </Collapse>
        <CardActions disableSpacing style={{ justifyContent: 'right' }}>
          <Tooltip arrow title={expanded ? 'Show Less' : 'Show More'}>
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Tooltip>
        </CardActions>
      </StyledAnswerCard>
    </StyledAnswerContainer>
  );
}

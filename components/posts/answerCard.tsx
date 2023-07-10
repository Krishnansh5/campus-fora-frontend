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
import React, { useState } from 'react';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddCommentIcon from '@mui/icons-material/AddComment';

import UserAvatar from '@components/avatar/userAvatar';
import { Answer } from '@callbacks/types';

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

export default function AnswerCard({ answer }: { answer: Answer }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const handleCommentsExpandClick = () => {
    setCommentsExpanded(!commentsExpanded);
  };

  const [votes, setVotes] = useState(0);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const handleUpvoteClick = () => {
    if (upvoted) {
      setUpvoted(false);
      setVotes((prevVotes) => prevVotes - 1);
    } else if (downvoted) {
      setUpvoted(true);
      setDownvoted(false);
      setVotes((prevVotes) => prevVotes + 2);
    } else {
      setUpvoted(true);
      setVotes((prevVotes) => prevVotes + 1);
    }
  };
  const handleDownvoteClick = () => {
    if (downvoted) {
      setDownvoted(false);
      setVotes((prevVotes) => prevVotes + 1);
    } else if (upvoted) {
      setUpvoted(false);
      setDownvoted(true);
      setVotes((prevVotes) => prevVotes - 2);
    } else {
      setDownvoted(true);
      setVotes((prevVotes) => prevVotes - 1);
    }
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
                    {upvoted ? (
                      <ArrowDropUpIcon color="primary" />
                    ) : (
                      <ArrowDropUpIcon />
                    )}
                  </IconButton>
                  <Typography
                    variant="subtitle2"
                    style={{ marginLeft: '14px' }}
                  >
                    {votes}
                  </Typography>
                  <IconButton onClick={handleDownvoteClick}>
                    {downvoted ? (
                      <ArrowDropDownIcon color="primary" />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                  </IconButton>
                </div>
              </Grid>
              <Grid item>
                <UserAvatar userName={answer.createdByUserName} />
              </Grid>
            </Grid>
          }
          title={answer.createdByUserName}
          subheader="Answered at: May 30, 2023" //get proper date from utiliity function
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
                {answer.content}
              </Typography>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                  display: 'flex',
                  alignItems: 'flex-end'
                }}
              >
                <AddCommentIcon
                  sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                />
                <TextField
                  fullWidth
                  id="filled-basic"
                  label="Add a comment"
                  variant="standard"
                />
              </Box>
              <Typography variant="h4" style={{ marginTop: '16px' }}>
                Comments
              </Typography>
              <Collapse in={commentsExpanded} timeout="auto" unmountOnExit>
                {answer.comments.map((comment) => (
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

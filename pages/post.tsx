import React, { useState } from 'react';
import { Box, Toolbar, styled } from '@mui/material';

import SidebarLayout from '@/layouts/SidebarLayout';
import { Question } from '@callbacks/types';
import AnswerCard from '@components/posts/answerCard';
import QuestionCard from '@components/posts/questionCard';

const StyledContent = styled('main')`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing(3)};
`;

const StyledLine = styled('div')`
  border-bottom: 1px solid;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;
const Home = () => {
  const [question] = useState<Question>();
  return (
    <Box sx={{ display: 'flex' }}>
      <StyledContent>
        <Toolbar />
        <QuestionCard question={question} />
        <StyledLine />
        {question?.answers.map((answer) => (
          <AnswerCard answer={answer} />
        ))}
      </StyledContent>
    </Box>
  );
};

Home.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Home;

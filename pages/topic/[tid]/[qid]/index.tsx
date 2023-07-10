import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, styled } from '@mui/material';
import { useRouter } from 'next/router';

import SidebarLayout from '@/layouts/SidebarLayout';
import { Answer, Question } from '@callbacks/posts/type';
import AnswerCard from '@components/posts/answerCard';
import QuestionCard from '@components/posts/questionCard';
import { QuestionPageRequests } from '@callbacks/posts/question';

const StyledContent = styled('main')`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing(3)};
`;

const StyledLine = styled('div')`
  border-bottom: 1px solid;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;
const Discussion = () => {
  const router = useRouter();
  const { qid, ansIds } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const [question, setQuestion] = useState<Question>();
  const [answers, setAnswers] = useState<Answer[]>();

  useEffect(() => {
    async function getQuestion() {
      const res = await QuestionPageRequests.getQuestionById(qid as string);
      setQuestion(res);
    }
    async function getAnswers() {
      const res = await QuestionPageRequests.getAllAnswersWithIds(
        ansIds as string[]
      );
      setAnswers(res);
    }
    getQuestion();
    getAnswers();
    setLoading(false);
  }, [ansIds, qid]);

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <QuestionCard question={question} ansCount={ansIds?.length} />
            <StyledLine />
            {answers?.map((answer) => (
              <AnswerCard answer={answer} />
            ))}
          </>
        )}
      </StyledContent>
    </Box>
  );
};

Discussion.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Discussion;

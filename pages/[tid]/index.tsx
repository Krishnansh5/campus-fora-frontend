import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Card, Grid, Pagination, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

import SidebarLayout from '@components/layouts/SidebarLayout';
import Q_Card from '@components/landing/QuestionCard';

function Home() {
  const router = useRouter();
  const { tid } = router;
  const [loading, setLoading] = useState(true);
  const [paginationNum, setPaginationNum] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      //fetch new topics
      setLoading(false);
    })();
  }, []);
  const theme = useTheme();

  const posts = [
    {
      question: 'What does the fox say?',
      answer: `${'lol '.repeat(20)}`,
      author: 'Joe Mama',
      upvotes: 1337,
      comments: 420,
      timePosted: 69
    }
  ];

  const topUsers = Array(...new Array(5)).map(() => ({
    username: 'Joe Mama',
    answers: 69
  }));

  const postsRepeated = [...Array(50).keys()].map((el) => ({
    ...posts[0],
    author: `Joe Mama ${el}`
  })); //first element of post repeated 20 times but with different user

  return (
    <Box sx={{ p: 3 }}>
      <Grid
        container
        spacing={0}
        sx={{
          width: '100%'
        }}
      >
        <Grid
          item
          xs={12}
          lg={8}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '10px',
            alignItems: 'center'
          }}
        >
          {postsRepeated
            .map((el) => <Q_Card {...el} />)
            .slice(5 * (paginationNum - 1), 5 * paginationNum)}
          <Pagination
            count={Math.round(postsRepeated.length / 5)}
            page={paginationNum}
            onChange={(event, value) => {
              setPaginationNum(value);
            }}
          />
        </Grid>
        <Grid
          item
          xs={0}
          lg={4}
          sx={{
            paddingLeft: '0px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: '20px'
          }}
        >
          <Button variant="contained">Ask a Question</Button>
          <Card
            variant="outlined"
            sx={{
              width: '80%',
              padding: '10px',
              backgroundColor: `${theme.colors.primary.light}`
            }}
          >
            <h2>Top Users</h2>
            <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
              {topUsers.map((el) => (
                <li
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '10px'
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>{el.username}</span>
                  <span>Questions Answered: {el.answers}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

Home.layout = 'mainPage';
Home.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Home;

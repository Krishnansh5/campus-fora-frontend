import React from 'react';
import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  Button,
  styled,
  useTheme,
  Pagination
} from '@mui/material';
import { keyframes } from "@emotion/css"

import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Dashboards/Tasks/PageHeader';
import Footer from '@/components/Footer';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import TeamOverview from '@/content/Dashboards/Tasks/TeamOverview';
import TasksAnalytics from '@/content/Dashboards/Tasks/TasksAnalytics';
import Performance from '@/content/Dashboards/Tasks/Performance';
import Projects from '@/content/Dashboards/Tasks/Projects';
import Checklist from '@/content/Dashboards/Tasks/Checklist';
import Profile from '@/content/Dashboards/Tasks/Profile';
import TaskSearch from '@/content/Dashboards/Tasks/TaskSearch';
import Q_Card from "@/components/QuestionCard";
import {SidebarContext} from "@/contexts/SidebarContext"

const loadingAnimation = keyframes`
	0% {
		transform: rotate(0deg);	
	}
	100% {
		transform: rotate(360deg);
	}
`;

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
      padding: 0 ${theme.spacing(2)};
      position: relative;
      bottom: -1px;

      .MuiTabs-root {
        height: 44px;
        min-height: 44px;
      }

      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }

      .MuiTabs-indicator {
          min-height: 4px;
          height: 4px;
          box-shadow: none;
          bottom: -4px;
          background: none;
          border: 0;

          &:after {
            position: absolute;
            left: 50%;
            width: 28px;
            content: ' ';
            margin-left: -14px;
            background: ${theme.colors.primary.main};
            border-radius: inherit;
            height: 100%;
          }
      }

      .MuiTab-root {
          &.MuiButtonBase-root {
              height: 44px;
              min-height: 44px;
              background: ${theme.colors.alpha.white[50]};
              border: 1px solid ${theme.colors.alpha.black[10]};
              border-bottom: 0;
              position: relative;
              margin-right: ${theme.spacing(1)};
              font-size: ${theme.typography.pxToRem(14)};
              color: ${theme.colors.alpha.black[80]};
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;

              .MuiTouchRipple-root {
                opacity: .1;
              }

              &:after {
                position: absolute;
                left: 0;
                right: 0;
                width: 100%;
                bottom: 0;
                height: 1px;
                content: '';
                background: ${theme.colors.alpha.black[10]};
              }

              &:hover {
                color: ${theme.colors.alpha.black[100]};
              }
          }

          &.Mui-selected {
              color: ${theme.colors.alpha.black[100]};
              background: ${theme.colors.alpha.white[100]};
              border-bottom-color: ${theme.colors.alpha.white[100]};

              &:after {
                height: 0;
              }
          }
      }
  `
);

function Home() {
	const {currentTopic} = useContext(SidebarContext);
	const [loading, setLoading] = useState(true);
	const [paginationNum, setPaginationNum] = useState(1);
	
	useEffect(() => {
		(async () => {
		console.log(currentTopic);
		setLoading(true);
		//fetch new topics
		setLoading(false);
		})();
	},[currentTopic])
  const theme = useTheme();

	const posts = [{
		question: "What does the fox say?",
		answer: `${"lol ".repeat(20)}`,
		author: "Joe Mama",
		upvotes: 1337,
		comments: 420,
		timePosted: 69
	}]
	
	const topUsers = Array(...new Array(5)).map(el => ({
		username: "Joe Mama",
		answers: 69,
	}));
	
	const postsRepeated = [...Array(50).keys()].map(el => ({...posts[0], author: `Joe Mama ${el}`})); //first element of post repeated 20 times but with different user
 
	return (
		<Box sx={{p: 3}}>
		<h1>{currentTopic === "" ? "Showing All Questions" : `Showing ${currentTopic} Questions`}</h1>
		<Grid container spacing={0} sx={{
			width: "100%"
		}}>
			<Grid item xs={12} lg={8} sx={{
				display:"flex",
				flexDirection: "column",
				rowGap: "10px",
				alignItems: "center",
			}}>
				{postsRepeated.map(el => <Q_Card {...el}/>).slice(5*(paginationNum - 1), 5*paginationNum)}
				<Pagination count={Math.round(postsRepeated.length/5)} page={paginationNum} onChange={(event, value) => {
					setPaginationNum(value);
				}} />
			</Grid>
			<Grid item xs={0} lg={4} sx={{
				paddingLeft: "0px",
				display:"flex",
				flexDirection: "column",
				alignItems:"center",
				rowGap: "20px",
			}}>
				<Button variant="contained">Ask a Question</Button>
				<Card variant="outlined" sx={{
					width:"80%",
					maxWidth: "400px",
					padding:"10px",
					backgroundColor:`${theme.colors.primary.light}`,
				}}>
					<h2>Top Users</h2>
					<ul style={{listStyle:"none", paddingLeft:"0"}}>
					{topUsers.map(el =>
						(<li style={{display:"flex", justifyContent:"space-between", margin:"10px"}}><span style={{fontWeight:"bold"}}>{el.username}</span><span>Questions Answered: {el.answers}</span></li>)
					)}
					</ul>
				</Card>
			</Grid>
		</Grid>
		</Box>
	);


	//template return    v
//   return (
//     <>
//       <Head>
//         <title>Tasks Dashboard</title>
//       </Head>
//       <PageTitleWrapper>
//         <PageHeader />
//       </PageTitleWrapper>
//       <Container maxWidth="lg">
//         <TabsContainerWrapper>
//           <Tabs
//             onChange={handleTabsChange}
//             value={currentTab}
//             variant="scrollable"
//             scrollButtons="auto"
//             textColor="primary"
//             indicatorColor="primary"
//           >
//             {tabs.map((tab) => (
//               <Tab key={tab.value} label={tab.label} value={tab.value} />
//             ))}
//           </Tabs>
//         </TabsContainerWrapper>
//         <Card variant="outlined">
//           <Grid
//             container
//             direction="row"
//             justifyContent="center"
//             alignItems="stretch"
//             spacing={0}
//           >
//             {currentTab === 'analytics' && (
//               <>
//                 <Grid item xs={12}>
//                   <Box p={4}>
//                     <TeamOverview />
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Divider />
//                   <Box
//                     p={4}
//                     sx={{
//                       background: `${theme.colors.alpha.black[5]}`
//                     }}
//                   >
//                     <Grid container spacing={4}>
//                       <Grid item xs={12} sm={6} md={8}>
//                         <TasksAnalytics />
//                       </Grid>
//                       <Grid item xs={12} sm={6} md={4}>
//                         <Performance />
//                       </Grid>
//                     </Grid>
//                   </Box>
//                   <Divider />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Box p={4}>
//                     <Projects />
//                   </Box>
//                   <Divider />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Box
//                     sx={{
//                       background: `${theme.colors.alpha.black[5]}`
//                     }}
//                   >
//                     <Grid container spacing={0}>
//                       <Grid item xs={12} md={6}>
//                         <Box
//                           p={4}
//                           sx={{
//                             background: `${theme.colors.alpha.white[70]}`
//                           }}
//                         >
//                           <Checklist />
//                         </Box>
//                       </Grid>
//                       <Grid item xs={12} md={6}>
//                         <Box p={4}>
//                           <Profile />
//                         </Box>
//                       </Grid>
//                     </Grid>
//                   </Box>
//                 </Grid>
//               </>
//             )}
//             {currentTab === 'taskSearch' && (
//               <Grid item xs={12}>
//                 <Box p={4}>
//                   <TaskSearch />
//                 </Box>
//               </Grid>
//             )}
//           </Grid>
//         </Card>
//       </Container>
//       <Footer />
//     </>
//   );
}

Home.layout = 'mainPage';
Home.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Home;

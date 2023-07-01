import React, { useState } from 'react';
import { Box, IconButton, Card, useTheme } from '@mui/material';
import { ArrowUpward as ArrowUpwardIcon, ArrowDownward as ArrowDownwardIcon, ChatBubbleOutlineOutlined as ChatBubbleOutlineOutlinedIcon} from '@mui/icons-material';
import VotesCounter from '@/components/Upvotes';

//note: timePosted should be unix epoch time - calcTime turns this into relative time
const QuestionCard = ({
    question,
    answer,
    author,
    upvotes,
    comments,
    authorImage,
    timePosted,
}: QuestionCardProps) => {

	const theme = useTheme();

    // const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
    // const [activeButton, setActiveButton] = useState('');

    // const handleUpvote = () => {
    //     if (activeButton === 'downvote') {
    //         setCurrentUpvotes(currentUpvotes + 2);
    //         setActiveButton('upvote');
    //     } else if (activeButton === 'upvote') {
    //         setCurrentUpvotes(currentUpvotes - 1);
    //         setActiveButton('');
    //     } else {
    //         setCurrentUpvotes(currentUpvotes + 1);
    //         setActiveButton('upvote');
    //     }
    // };

    // const handleDownvote = () => {
    //     if (activeButton === 'upvote') {
    //         setCurrentUpvotes(currentUpvotes - 2);
    //         setActiveButton('downvote');
    //     } else if (activeButton === 'downvote') {
    //         setCurrentUpvotes(currentUpvotes + 1);
    //         setActiveButton('');
    //     } else {
    //         setCurrentUpvotes(currentUpvotes - 1);
    //         setActiveButton('downvote');
    //     }
    // };

    return (
        <Card className="question-card" variant="outlined" sx={{
            width: "90%",
            minWidth: "400px",
            p: 1.5,
            backgroundColor: `${theme.colors.primary.lighter}`,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'left',
        }}>
            <VotesCounter apiLink="lol" upvotes={upvotes} />
            <Box className="divider" sx={{
                // p: 1,
                marginLeft: 1,
                marginRight: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'left',
            }}>
                <Box className="content" sx={{
                    marginBottom: 2,
                    borderBottom: 1.5,
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <h2 className="question">{question}</h2>
                    <p className="answer">{answer}</p>
                </Box>
                <Box className="stats" sx={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}>
                    <span className="author-info">
                        {authorImage ? <img className="author-image" src={authorImage} alt="Author" /> : ""}
                        <p className="author-name">{author}</p>
                    </span>
                    <span className="time-posted">{timePosted} hours ago</span>
                    <span className="comments"><ChatBubbleOutlineOutlinedIcon />{comments}</span>  
                </Box>
            </Box>
        </Card>
    );
};

export default QuestionCard;
export type {QuestionCardProps};

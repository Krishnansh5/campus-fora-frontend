import React, {useState, useEffect} from "react";
import {
	IconButton,
	Box,
    useTheme
} from "@mui/material";
import { 
	ArrowUpward, 
	ArrowDownward , 
} from '@mui/icons-material';

export default function VotesCounter({apiLink, upvotes}) {
	const theme = useTheme();

	const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
    const [activeButton, setActiveButton] = useState('');

    const handleUpvote = () => {
        if (activeButton === 'downvote') {
            setCurrentUpvotes(currentUpvotes + 2);
            setActiveButton('upvote');
        } else if (activeButton === 'upvote') {
            setCurrentUpvotes(currentUpvotes - 1);
            setActiveButton('');
        } else {
            setCurrentUpvotes(currentUpvotes + 1);
            setActiveButton('upvote');
        }
    };

    const handleDownvote = () => {
        if (activeButton === 'upvote') {
            setCurrentUpvotes(currentUpvotes - 2);
            setActiveButton('downvote');
        } else if (activeButton === 'downvote') {
            setCurrentUpvotes(currentUpvotes + 1);
            setActiveButton('');
        } else {
            setCurrentUpvotes(currentUpvotes - 1);
            setActiveButton('downvote');
        }
    };

    return (
    	<Box className="votes" sx={{
                p: 1,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'left',
            }}>
		    <IconButton aria-label="up" className={`upvote-button`} sx={{color: `${activeButton === "upvote" ? "#11dd33" : ""}`}} onClick={handleUpvote}><ArrowUpward /></IconButton>
		    <span className="upvotes">{currentUpvotes}</span>
		    <IconButton aria-label="down" className={`downvote-button`} sx={{color: `${activeButton === "downvote" ? "#dd1133" : ""}`}} onClick={handleDownvote}><ArrowDownward /></IconButton>
		</Box>
    );
}
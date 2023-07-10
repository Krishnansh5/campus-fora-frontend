import React, {useState, useEffect} from 'react';
import {
  Box,
  Card,
  useTheme,

} from "@mui/material";
import SidebarLayout from '@/layouts/SidebarLayout';
import QuestionCard, { QuestionCardProps } from '@/components/QuestionCard';
import VotesCounter from '@/components/Upvotes';

function CommentCard({ID, author, content, upvotes, parentID, timePosted, timeEdited, children}) {
  const theme = useTheme();
  return(
    <Card sx={{p: 1, m: 1}}>
    <Box sx={{p: 0.5}}>
    <Box sx={{display: "flex", justifyContent:"left", height:"90%", position: "relative"}}>
    <VotesCounter apiLink="" upvotes={upvotes}/>
    <Box sx={{alignSelf:"stretch"}}><p>{content}</p></Box>
    </Box>
    <div>Author: {author}</div>
    </Box>
    {children.length > 0 ? children.map(el => <CommentCard {...el} />) : ""}
    </Card>
  );
}

function Topic() {
  const [question, setQuestion] : [QuestionCardProps | undefined, any] = useState(undefined);
  const [comments, setComments] = useState(undefined);

  useEffect(() => {
    setQuestion({
      question: "What does the fox say?",
      answer: `${"lol ".repeat(20)}`,
      author: "Joe Mama",
      upvotes: 1337,
      comments: 420,
      timePosted: 69
  });
    let fetched_comments = [...Array(10).keys()].map(el => ({ID: el, author: `Joe Mama ${el}`, content:("Lol ".repeat(el*20 + 20)), upvotes:(el + 69), parentID: (Math.round(el/3)), timePosted: 0, timeEdited: 0, children: []}));
    //comments fetched as an array - we turn this into a tree of objects - assumed: parentID is the ID of another comment in the array
    //important note: extra children property here that won't be present in fetched results - will write code to add that property once API is up
    let comments_tree : any = {};
    fetched_comments.forEach((comment) => {
      if (comment.ID === comment.parentID) comment.parentID = -1;
      comments_tree[String(comment.ID)] = comment;
    }); //add all comments to comment tree
    fetched_comments.forEach((comment) => {
      if (comment.parentID === -1) return;
      comments_tree[String(comment.parentID)].children.push(comment);
    }); //fill children array of each comment - objects in array are references to the actual object, not copies - so this is fine
    for (const key in comments_tree) {
      if (comments_tree[key].parentID !== -1) {
        delete comments_tree[key];
      }
    } //remove non-root comments from top-level of tree
    console.log(comments_tree);
    comments_tree = Object.keys(comments_tree).map(el => comments_tree[el]); //convert comments_tree to an array
    setComments(comments_tree);
  }, []); //fetch question, comments on opening
  return (
    <Box sx={{m : 1}}>
      {question 
      ? (<>
        <Box sx={{m:1}}><QuestionCard {...question} /></Box>
        <Box sx={{m:1}}><Card>
          <h1 style={{margin: "10px"}}>Comments</h1>
          {comments.map(el => (<CommentCard {...el} />))}
        </Card></Box>
        </>)
      :<div>Loading...</div>}
    </Box>
  );
}

Topic.layout = "mainPage";
Topic.getLayout = page => <SidebarLayout>{page}</SidebarLayout>;

export default Topic;

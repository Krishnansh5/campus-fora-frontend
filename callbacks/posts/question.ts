import axios from 'axios';

import { POST_URL, SERVER_ERROR, responseBody } from '@callbacks/constants';
import { Answer, Comment, Question, Tags } from '@callbacks/posts/type';

const instance = axios.create({
  baseURL: POST_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR
});

export const QuestionPageRequests = {
  getQuestionById: (qid: string) =>
    instance
      .get<Question>(`/question/${qid}`)
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching the question with id : ' + qid, error);
        return {} as Question;
      }),
  postQuestion: (body: Question) =>
    instance
      .post('/question', body)
      .then(responseBody)
      .catch((error) => {
        console.log('error in posting the question', error);
        return {} as Question;
      }),
  deleteQuestionById: (id: string) =>
    instance
      .delete('/question:' + id)
      .then(responseBody)
      .catch((error) => {
        console.log('error in deleting the question with id : ' + id, error);
        return null;
      }),
  updateQuestionById: (id: string, body: Question) =>
    instance
      .put<Question>(`/question/${id}`, body)
      .then(responseBody)
      .catch((error) => {
        console.log('error in updating the question with id : ' + id, error);
        return {} as Question;
      }),
  getAllAnswersWithIds: (ids: string[]) =>
    instance
      .get<Answer[]>(`/answer?${ids?.map((id) => `aid=${id}`).join('&')}`)
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching answers with ids : ' + ids, error);
        return [] as Answer[];
      }),
  createNewAnswer: (body: Answer) =>
    instance
      .post<Answer>('/answer', body)
      .then(responseBody)
      .catch((error) => {
        console.log('error in answering the question', error);
        return {} as Answer;
      }),
  getAnswerById: (id: string) =>
    instance
      .get<Answer>('/answer/' + id)
      .then(responseBody)
      .catch((error) => {
        console.log('error in getting the post with id: ' + id, error);
        return {} as Answer;
      }),
  updateAnswerById: (id: string, body: Answer) =>
    instance
      .put<Answer>(`/answer/${id}`, body)
      .then(responseBody)
      .catch((error) => {
        console.log('error in updating post with id : ' + id, error);
        return {} as Answer;
      }),
  deleteAnswerById: (id: string) =>
    instance
      .delete<Answer>('/answer:' + id)
      .then(responseBody)
      .catch((error) => {
        console.log('error in deleting post with id : ' + id, error);
      }),
  createNewComment: (body: Comment) =>
    instance
      .post<Comment>('/comment', body)
      .then(responseBody)
      .catch((error) => {
        console.log('error in creating a comment in the question', error);
        return null;
      }),
  updateCommentById: (id: number) =>
    instance
      .put<Comment>(`/comment/${id}`)
      .then(responseBody)
      .catch((error) => {
        console.log('error in updating comment with id : ' + id, error);
        return {} as Comment;
      }),
  deleteCommentById: (id: number) =>
    instance
      .delete(`/comment/${id}`)
      .then(responseBody)
      .catch((error) => {
        console.log('error in deleting comment with id : ' + id, error);
        return null;
      }),
  updateTagsForQuestion: (id: number, body: Tags[]) =>
    instance
      .put<Tags[]>(`/question/${id}/tags`, body)
      .then(responseBody)
      .catch((error) => {
        console.log(
          'error in updating tags for question and id : ' + id,
          error
        );
        return [] as Tags[];
      }),
  getQuestionFollowStatus: (qid: string) =>
    instance
      .get<boolean>(`/follow/${qid}`)
      .then(responseBody)
      .catch((error) => {
        console.log('error in getting follow status for question', error);
        return null;
      }),
  updateQuestionFollowStatus: (qid: string) =>
    instance
      .put<boolean>(`/follow/${qid}`)
      .then(responseBody)
      .catch((error) => {
        console.log('error in updating follow status for question', error);
        return null;
      })
};

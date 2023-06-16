import axios from 'axios';

import { SERVER_ERROR, TOPIC_X_URL, responseBody } from '@callbacks/constants';
import { Post, Thread } from '@callbacks/types';

const instance = axios.create({
  baseURL: TOPIC_X_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR
});

export const TopicXLandingRequests = {
  getAll: () =>
    instance
      .get<Thread[]>('/landing')
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching questions for topic X', error);
        return [] as Thread[];
      }),
  getLimited: (limit: number) =>
    instance
      .get<Thread[]>(`/landing?limit=${limit}`)
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching questions for topic X', error);
        return [] as Thread[];
      })
};

export const createQuestion = {
  post: () =>
    instance
      .post('/question')
      .then(responseBody)
      .catch((error) => {
        console.log('error in posting the question', error);
      })
};

export const getThreadById = {
  get: (id: number) =>
    instance
      .get<Thread>('/question:'+id)
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching the question with id : '+ id, error);
        return {} as Thread;
      }),
};

export const getAllThreads = {
  getAll: () =>
    instance
      .get<Thread[]>('/question')
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching questions', error);
        return [] as Thread[];
      }),
  getLimited: (limit: number) =>
    instance
      .get<Thread[]>(`/question?limit=${limit}`)
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching questions', error);
        return [] as Thread[];
      })
};

export const deleteThread = {
  delete: (id: number) =>
    instance
      .delete<Thread>('/question:'+id)
      .then(responseBody)
      .catch((error) => {
        console.log('error in deleting the question with id : '+ id, error);
      }),
};

export const updateThread = {
  update: (id: number) =>
    instance
      .put<Thread>('/question:'+id)
      .then(responseBody)
      .catch((error) => {
        console.log('error in updating the question with id : '+ id, error);
      }),
};

export const createNewAnswer = {
  createNewAnswer: () =>
    instance
      .post<Post>('/answer')
      .then(responseBody)
      .catch((error) => {
        console.log('error in answering the question', error);
      }),
};

export const getAllPostsForThread  = {
  getAll: () =>
    instance
      .get<Post>('/answer')
      .then(responseBody)
      .catch((error) => {
        console.log('error in getting the answers', error);
        return [] as Post[];
      }),
  getLimited: (limit: number) =>
    instance
      .get<Post[]>(`/answer?limit=${limit}`)
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching posts', error);
        return [] as Post[];
      })
};

export const getPostById  = {
  get: (id: number) =>
    instance
      .get<Post>('/answer:'+id)
      .then(responseBody)
      .catch((error) => {
        console.log('error in getting the post with id: '+id, error);
        return {} as Post;
      }),
};

export const updatePostById  = {
  update: (id: number) =>
    instance
      .put<Post>('/answer:'+id)
      .then(responseBody)
      .catch((error) => {
        console.log('error in updating post with id : '+id, error);
      }),
};

export const deletePost  = {
  delete: (id: number) =>
    instance
      .delete<Post>('/answer:'+id)
      .then(responseBody)
      .catch((error) => {
        console.log('error in deleting post with id : '+id, error);
      }),
};

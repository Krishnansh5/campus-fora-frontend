export interface QuestionDetails {
  ID: number;
  title: string;
  content: string;
  tags: Tags[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface Question {
  topicId: number;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  createdByUserId: number;
  createdByUserName: string;
  answers: Answer[];
  tags: Tags[];
}

export interface Answer {
  parentId: number;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  isAnswer: boolean;
  createdByUserId: number;
  createdByUserName: string;
  comments: Comment[];
}

export interface Comment {
  parentID: number;
  uuid: string;
  content: string;
  createdByUser: number;
  createdByUserName: string;
}

export interface Tags {
  id: number;
  name: string;
}
export interface UserDetails {
  userID: number;
  name: string;
  department: string;
  program: string;
  year: string;
  gender: string;
  hall: string;
  hometown: string;
  userBio: string;
}

export interface ToggleStatus {
  status: boolean;
  id: number;
}

export interface Notification {
  title: string;
  body: string;
}

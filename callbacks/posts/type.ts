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
  CreatedAt: string;
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
  CreatedAt: string;
  UpdatedAt: string;
  content: string;
  isAnswer: boolean;
  createdByUserId: number;
  createdByUserName: string;
  comments: Comment[];
}

export interface Comment {
  parentID: string;
  uuid: string;
  content: string;
  createdByUserId: number;
  createdByUserName: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface Tags {
  id: number;
  name: string;
}

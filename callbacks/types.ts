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
  id : number;
  createdAt : number;
  updatedAt : number;
  title : string;
  content : string;
  createdByUser : string;
  posts : Answer[];
  tags : Tags[];
}

export interface Answer {
  parent_id : number;
  id : number;
  createdAt : number;
  updatedAt : number;
  content : string;
  isAnswer : boolean;
  createdByUser : string;
  comments : Comment[];
}

export interface Comment {
  parentID: number;
  content: string;
  createdByUser: string
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
  userBio: string
}

export interface ToggleStatus {
  status: boolean;
  id: number
}

export interface Notification {
  title: string;
  body: string
}
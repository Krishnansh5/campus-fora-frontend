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

}

export interface Tags {
  ID: number;
  name: string;
}

export interface QuestionDetails {
    ID: number;
    title: string;
    content: string;
    tags: Tags[];
    createdAt: string;
    updatedAt: string;
    createdBy: string;
}

export interface Tags {
    ID: number;
    name: string;
}
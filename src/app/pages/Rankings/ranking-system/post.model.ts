// src/app/models/post.model.ts
export interface Post {
    _id?: string;
    users_id: string;
    file: string;
    title: string;
    description: string;
    category: string;
    likesCount: number;
    Created_At: Date;
}

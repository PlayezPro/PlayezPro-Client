import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentUrl:string = 'http://localhost:3000/comment'
  constructor() { }

  async getCommentsPost(postId:string){
    try {
      const response = await axios.get(`${this.commentUrl}/${postId}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener comentarios del post:', error);
      throw error;
    }
   
  }

  async writeComment(postsID:string, userID:string,comments:string){
    try {
      const data = {posts_id:postsID, users_id:userID, comments};
      const response = await axios.post(this.commentUrl, data)
    } catch (error) {
      console.error("no se ha añadido el comentario")
    }
  }
}

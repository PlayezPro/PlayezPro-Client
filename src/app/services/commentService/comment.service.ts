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
}

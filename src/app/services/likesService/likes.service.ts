import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private likesUrl: string = 'http://localhost:3000/likes'
  constructor() { }
  
  async addLike(postId: string, userId: string): Promise<void> {
    try {
      const data = { posts_id: postId, users_id: userId };
      const response = await axios.post(this.likesUrl, data);
      console.log('Like añadido correctamente');
    } catch (error:any) {
      if (error.response && error.response.status === 400) {
        console.error('El usuario ya ha dado like a este post');
        await this.deleteLike(postId, userId);
        console.log("el like ha sido borrado")
      } else {
        console.error('Error al añadir el like:', error);
      }
    }
  }

  async deleteLike(postId: string, userId: string): Promise<void> {
    try {
      const data = { posts_id: postId, users_id: userId };
      await axios.delete(this.likesUrl, { data });
      console.log('Like eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el like:', error);
    }
  }

  async checkLikes(postId: string, userId: string): Promise<boolean> {
    try {
        const data = { posts_id: postId, users_id: userId };
        const response = await axios.post(`${this.likesUrl}/likecheck`, data );
        const isLiked = response.data.isLiked as boolean;
        console.log(`El usuario dio like al post? ${isLiked ? 'Sí' : 'No'}`); // Mostrar en consola
        return isLiked; 
    } catch (error) {
        console.error('Error al verificar si el usuario dio like al post:', error);
        return false; // En caso de error, devolvemos false
    }
}
  }



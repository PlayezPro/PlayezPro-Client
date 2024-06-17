import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  // private likesUrl: string = 'https://playezpro-server.onrender.com/likes'
  private likesUrl: string = 'http://localhost:3000/likes'
  private token :string | null= localStorage.getItem('Token')
  constructor() { }
  
  async addLike(postId: string): Promise<void> {
    try {
      const data = { posts_id: postId };
      const response = await axios.post(this.likesUrl, data,{
        headers:{
          'Authorization': `Bearer ${this.token}`
        }
      });
      console.log('Like añadido correctamente');
    } catch (error:any) {
      if (error.response && error.response.status === 400) {
        console.error('El usuario ya ha dado like a este post');
        await this.deleteLike(postId);
        console.log("el like ha sido borrado")
      } else {
        console.error('Error al añadir el like:', error);
      }
    }
  }

  async deleteLike(postId: string): Promise<void> {
    try {
      const data = { posts_id: postId };
      await axios.delete(this.likesUrl, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        },
        data: data
      });
      console.log('Like eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el like:', error);
    }
  }

  async checkLikes(postId: string): Promise<boolean> {
    try {
        console.log(this.token)
        const data = { posts_id: postId };
        const response = await axios.post(`${this.likesUrl}/likecheck`, data , {
          headers:{
            'Authorization': `Bearer ${this.token}`
          }
        });
        const isLiked = response.data.isLiked as boolean;
        return isLiked; 
    } catch (error) {
        console.error('Error al verificar si el usuario dio like al post:', error);
        return false; // En caso de error, devolvemos false
    }
}
  
  async totalLikes(postId:string):Promise<any> {
    try {
      const response = await axios.get(`${this.likesUrl}/totallikes/${postId}`)
      if(response.data.totalLikes !== 0){
      return response.data.totalLikes;  
      }else {
        return 0;
      }
      
    } catch (error) {
      console.error("Error al obtener el total de likes:", error);
    }
  }
  
}



// async getRankedPosts(): Promise<any[]> {
//   try {
//     const response = await axios.get(`${this.likesUrl}/rankedLikes`);
//     return response.data.ranking;
//   } catch (error) {
//     console.error("Error al obtener el ranking de posts:", error);
//     return [];
//   }
// }
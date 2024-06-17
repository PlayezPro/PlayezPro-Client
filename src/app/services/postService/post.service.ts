import { Injectable } from '@angular/core';
import axios from 'axios';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  // private apiUrl: string = 'https://playezpro-server.onrender.com/posts'
  private apiUrl: string = 'http://localhost:3000/posts/'
  private token :string | null= localStorage.getItem('Token')
  constructor() { }

  async CreatePost(newPost: any, file: File): Promise<any> {
    const formData = new FormData();
    formData.append('users_id', newPost.users_id);
    formData.append('title', newPost.title);
    formData.append('description', newPost.description);
    formData.append('category', newPost.category);
    formData.append('file', file);
  
    try {
      const response = await axios.post('http://localhost:3000/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
        return error;
      }
    }
  }
  
  
  
  async getAllPost()  {
    return axios.get(this.apiUrl, {
      headers:{
        'Authorization': `Bearer ${this.token}`
      }
    });
    
  }

  async getUserPosts(users_id:any):Promise<any> {
    return axios.get(`${this.apiUrl}/users/${users_id}`)
  }

  async getAllPostsOrderedByLikes(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/rankedLikes`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los posts ordenados por likes:', error);
      throw error;
    }
  }

  
}

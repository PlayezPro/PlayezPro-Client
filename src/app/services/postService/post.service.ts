import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  // private apiUrl: string = 'https://playezpro-server.onrender.com/posts'
  private apiUrl: string = 'http://localhost:3000/posts/'

  constructor() { }

  async CreatePost(newPost: any): Promise<any>{
    const formData = new FormData();
    formData.append('users_id', newPost.users_id);
    formData.append('title', newPost.title);
    formData.append('description', newPost.description);
    formData.append('category', newPost.category);
    
    // Obtén el primer archivo seleccionado
    const fileInput = (<HTMLInputElement>document.querySelector('input[type="file"]'));
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileReader = new FileReader();
      
      // Lee el contenido del archivo como un búfer de datos
      fileReader.onload = async (event: any) => { // Marca la función como async
        const fileBuffer = event.target.result;
        const blob = new Blob([fileBuffer]);
        formData.append('file', blob, file.name);
        
        console.log('FormData enviado al servidor:');
        formData.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });
  
        try {
          const response = await axios.post(this.apiUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data' // Asegúrate de establecer el encabezado adecuado para FormData
            }
          });
          return response.data;
        } catch (error:any) {
          if (error.response) {
            console.log(error.response)
          return error          
          }
        }
      };
      
      fileReader.readAsArrayBuffer(file);
    }
  }
  
  async getAllPost()  {
    return axios.get(this.apiUrl);
    
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

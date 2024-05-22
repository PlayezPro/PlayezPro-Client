import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private userUri:string = `http://localhost:3000/user`
  constructor() {}

  async getUserById(userId: string) {
    try {
      const response = await axios.get(`${this.userUri}/${userId}`);
      return response.data // Retorna los detalles del usuario
    } catch (error) {
      console.error('Error al obtener los detalles del usuario:', error);
      throw error; // Puedes manejar este error según tus necesidades
    }
  }
}

import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private skillUrl = "http://localhost:3000/skill"
  constructor() { }

  async getUserSkill(userId:string){
    try {
      const response = await axios.get(`${this.skillUrl}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener las skills del usuario:', error);
    }
  }
}
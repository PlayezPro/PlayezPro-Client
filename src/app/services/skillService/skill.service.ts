import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private skillUrl = "https://playezpro-server.onrender.com/skill";
  // private skillUrl = "http://localhost:3000/skill"
  constructor() { }

  async getUserSkill(userId: string) {
    try {
      const response = await axios.get(`${this.skillUrl}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener las skills del usuario:', error);
    }
  }

  async getAllUserSkill() {
    try {
      const response = await axios.get(`${this.skillUrl}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener las skills del usuario:', error);
    }
  }

  async createUserSkill(skillData: any): Promise<any> {
    try {
      const response = await axios.post(this.skillUrl, skillData);
      return response.data;
    } catch (error) {
      console.error('Error al crear la skill del usuario:', error);
      throw error;
    }
  }
  

  async updateUserSkill(skillId: string, skillData: any) {
    try {
      const response = await axios.put(`${this.skillUrl}/${skillId}`, skillData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar la skill del usuario:', error);
    }
  }
}

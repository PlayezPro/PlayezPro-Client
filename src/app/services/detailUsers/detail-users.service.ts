import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class DetailUsersService {
  private detailURL: string = "https://playezpro-server.onrender.com/details"

  constructor() { }


  async getAllDetails() {
    return axios.get(this.detailURL);

  }

  async createDetailUser(detailUserData: any): Promise<any> {
    try {
      const response = await axios.post(this.detailURL, detailUserData);
      return response.data;
    } catch (error) {
      console.error('There was an error creating the detail user:', error);
      throw error;
    }
  }
}
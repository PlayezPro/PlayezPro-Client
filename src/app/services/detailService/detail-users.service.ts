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

  async getDetailById(userId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.detailURL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`There was an error fetching details for user with ID ${userId}:`, error);
      throw error;
    }
  }

  async updateDetailById(_id: string, updatedDetailData: any): Promise<any> {
    try {
      const response = await axios.put(`${this.detailURL}/${_id}`, updatedDetailData);
      return response.data;
    } catch (error) {
      console.error(`There was an error updating details for user with ID ${_id}:`, error);
      throw error;
    }
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
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class DetailUsersService {
  private detailURL: string = "http://localhost:3000/details"

  constructor() { }

  async getAllDetails() {
    return axios.get(this.detailURL);
  }

  async createDetails(detail: any) {
    try {
      const response = await axios.post(this.detailURL, detail);
      return response;
    } catch (error) {
      console.error('Error al crear el detalle:', error);
      throw error;
    }
  }
}
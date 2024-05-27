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
}
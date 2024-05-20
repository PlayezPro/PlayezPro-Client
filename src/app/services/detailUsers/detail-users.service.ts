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
}
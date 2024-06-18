import { Component, OnInit } from '@angular/core';
import { DetailUsersService } from 'src/app/services/detailService/detail-users.service';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class ListsComponent implements OnInit {
  details: any[] = [];
  filteredDetails: any[] = [];
  searchTerm: string = '';
  constructor(private DetailService: DetailUsersService, private userService: UserService) { }

  ngOnInit() {
    this.userAllDetails();
  }

  async userAllDetails() {
    try {
      const response = await this.DetailService.getAllDetails();
      this.details = response.data;
      console.log(this.details);

      for (const detail of this.details) {
        const userDetails = await this.userService.getUserById(detail.userId);
        detail.userDetails = userDetails;
      }
    } catch (error) {
      console.error(error);
    }
    this.filteredDetails = this.details;
  }

}

  


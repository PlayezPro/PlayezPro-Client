import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { IonicModule } from '@ionic/angular';
import { DetailUsersService } from 'src/app/services/detailUsers/detail-users.service';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.page.html',
  styleUrls: ['./manage-post.page.scss'],
  imports: [ CommonModule, FormsModule, NavbarComponent, IonicModule],
  standalone: true
})
export class ManagePostPage implements OnInit {
  details: any = {};
  constructor(private DetailService: DetailUsersService, private userService: UserService) { }

  ngOnInit() {
    this.userAllDetails()
  }
  async userAllDetails() {
    try {
      const response = await this.DetailService.getAllDetails();
      this.details = response.data;
      console.log(response);

      for (const detail of this.details) {
        const userDetails = await this.userService.getUserById(detail.userId);
        detail.userDetails = userDetails;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

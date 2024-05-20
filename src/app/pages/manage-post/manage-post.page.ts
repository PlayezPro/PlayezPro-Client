import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
// import { DetailUsersService } from 'src/app/services/detailUsers/detail-users.service';
import { IonicModule } from '@ionic/angular';
import { ListsComponent } from 'src/app/components/lists/lists.component';

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.page.html',
  styleUrls: ['./manage-post.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, NavbarComponent, IonicModule, ListsComponent]
})
export class ManagePostPage implements OnInit {
  // details: any = {};
  constructor() { }

  ngOnInit() {
    // this.userAllDetails()
  }
  // async userAllDetails() {
  //   try {
  //     const response = await this.DetailService.getAllDetails()
  //     this.details = response.data;
  //     console.log(response);
  //   } catch (error) {
      
  //   }
  // }
}

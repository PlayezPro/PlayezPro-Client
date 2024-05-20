import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { DetailUsersService } from 'src/app/services/detailUsers/detail-users.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.page.html',
  styleUrls: ['./manage-post.page.scss'],
  standalone: true,
  imports: [IonContent, IonicModule, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent]
})
export class ManagePostPage implements OnInit {
  details: any = {};
  constructor(private DetailService: DetailUsersService) { }

  ngOnInit() {
  }
  async userAllDetails() {
    try {
      const response = await this.DetailService.getAllDetails()
      this.details = response.data;
      console.log("hola perro...");
      console.log(response);
    } catch (error) {
      
    }
  }
}

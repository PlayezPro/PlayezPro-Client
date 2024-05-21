import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import axios from 'axios';
// import { UserService } from 'src/app/services/userService/user.service';
import { FutcardComponent } from 'src/app/components/futcard/futcard.component';
import { FollowService } from 'src/app/services/userService/follows.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent, FutcardComponent]
})
export class PerfilPage implements OnInit {

  constructor( private userFollow: FollowService) { }

  ngOnInit() {
  }

  async createUser(): Promise<void> {
    try {
      const usersId = localStorage.getItem('users_id');
      const followedID = localStorage.getItem('follow_id');
  
      // Verifica que los IDs no sean null antes de usarlos
      if (usersId && followedID) {
        await this.userFollow.addFollower(usersId, followedID).toPromise();
        console.log('Follower added successfully');
      } else {
        console.error('User ID or Followed ID is missing');
      }
    } catch (error) {
      console.error('Error adding follower:', error);
    }
  }
}  


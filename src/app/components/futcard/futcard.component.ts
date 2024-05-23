import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { DetailUsersService } from 'src/app/services/detailUsers/detail-users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-futcard',
  templateUrl: './futcard.component.html',
  styleUrls: ['./futcard.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FutcardComponent implements OnInit {

  userId: string | null = null;
  userDetail: any = [];
  showModal: boolean = false;
  newDetail: any = {
    userId: '',
    photo: '',
    birthYear: '',
    nationality: '',
    currentTeam: '',
    dorsal: '',
    favPosition: '',
    mainFoot: '',
    weight: '',
    height: ''
  };

  constructor(private userServices: UserService, private detailUsersService: DetailUsersService) { }

  ngOnInit() {
    this.generateCard();
  }

  async generateCard() {
    try {
      this.userId = localStorage.getItem('users_id');
      if (this.userId === null) {
        console.error('El valor de user en localStorage es null');
        return;
      }
      const response = await this.userServices.getUserById(this.userId);
      this.userDetail = response;
    } catch (error) {
      console.error('Error al generar la tarjeta:', error);
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  async createDetail() {
    try {
      this.newDetail.userId = this.userId;
      await this.detailUsersService.createDetails(this.newDetail);
      this.closeModal();
    } catch (error) {
      console.error('Error al crear el detalle:', error);
    }
  }
}

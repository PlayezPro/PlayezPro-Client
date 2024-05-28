import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  providers: [UserService]
})
export class SettingPage implements OnInit {
  user: any = {
    name: '',
    lastName: '',
    userName: '',
    email: '',
    phoneNumber: ''
  };
  userId: string | null = null;

  constructor(private userService: UserService) { }

  async ngOnInit() {
    this.userId = localStorage.getItem('users_id');
    console.log('User ID from localStorage:', this.userId);
    if (this.userId) {
      await this.loadUserDetails(this.userId);
    }
  }

  async loadUserDetails(userId: string) {
    try {
      const userDetails = await this.userService.getUserById(userId);
      if (userDetails && userDetails.length > 0) {
        this.user = userDetails[0];
        console.log('User details:', this.user);
      } else {
        console.error('No se encontraron detalles del usuario.');
      }
    } catch (error) {
      console.error('Error al cargar los detalles del usuario:', error);
    }
  }
  

  async updateUser() {
    if (this.userId) {
      try {
        const updatedUser = await this.userService.updateUser(this.userId, this.user);
        console.log('Usuario actualizado:', updatedUser);
        // Mostrar algún mensaje de éxito si es necesario
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        // Mostrar algún mensaje de error si es necesario
      }
    }
  }
}

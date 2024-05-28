import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/userService/user.service';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-setting-user',
  templateUrl: './setting-user.component.html',
  styleUrls: ['./setting-user.component.scss'],
  standalone: true,
  imports:[CommonModule, FormsModule,IonContent, IonHeader, IonTitle, IonToolbar],
  providers: [UserService]
})
export class SettingUserComponent  implements OnInit  {
  user: any = {
    name: '',
    lastName: '',
    userName: '',
    email: '',
    phoneNumber: '',
    // password: '',
    // repeatPassword:'',
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
        console.log('User data:', this.user);
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
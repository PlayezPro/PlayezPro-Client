import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-futcard',
  templateUrl: './futcard.component.html',
  styleUrls: ['./futcard.component.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, CommonModule ]
})
export class FutcardComponent  implements OnInit {

  userId: string | null = null;
  userDetail: any [] = [];


  constructor(private userServices: UserService) { }

  ngOnInit() {
    this.generateCard();
  }

  async generateCard() {
    try {
      // Obtener el valor de user de localStorage
      this.userId = localStorage.getItem('users_Id');
  
      // Verificar si this.userId es null
      if (this.userId === null) {
        // Manejar el caso en que userId sea null, por ejemplo, mostrar un mensaje al usuario
        console.error('El valor de user en localStorage es null');
        return; // Salir del método ya que no hay nada más que hacer
      }
      
  
      // Si userId no es null, obtener los datos del usuario
      const response = await this.userServices.getUserById(this.userId);
      console.log(this.userId)
      this.userDetail = response.data;
      console.log(this.userDetail);
      // Hacer algo con la respuesta, como generar la tarjeta
    } catch (error) {
      console.error('Error al generar la tarjeta:', error);
      // Manejar el error de manera apropiada, por ejemplo, mostrar un mensaje al usuario
    }
  }
}
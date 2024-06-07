import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailUsersService } from 'src/app/services/detailService/detail-users.service';

@Component({
  selector: 'app-create-details',
  templateUrl: './create-details.component.html',
  styleUrls: ['./create-details.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class CreateDetailsComponent implements OnInit {

  modalOpen = false;
  hasDetailInfo = false; // Variable para controlar la visibilidad del botón

  detailUserData: any = {
    userId: '', // Aquí puedes recuperar el userId del localStorage
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

  constructor(private detailUserService: DetailUsersService) { }

  ngOnInit(): void {
    // Aquí puedes recuperar el userId del localStorage
    this.detailUserData.userId = localStorage.getItem('users_id') || '';
    console.log(this.detailUserData.userId);
    // Verificar si existe información de detalle para el usuario
    this.checkDetailInfo();
  }

  async checkDetailInfo(): Promise<void> {
    try {
      // Llamar al servicio para verificar si existe información de detalle para el usuario
      const detailInfo = await this.detailUserService.getDetailById(this.detailUserData.userId);
      this.hasDetailInfo = !!detailInfo; // Asignar true si hay información, false si no hay
    } catch (error) {
      console.error('Error fetching detail information:', error);
    }
  }

  openModal(): void {
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  reloadPage(): void {
    window.location.reload();
  }

  async onSubmit(): Promise<void> {
    try {
      const savedDetails = await this.detailUserService.createDetailUser(this.detailUserData);
      console.log('Detail user created successfully:', savedDetails);
      this.closeModal();
      this.hasDetailInfo = true; // Actualizar la variable después de crear los detalles
      this.reloadPage()
    } catch (error) {
      console.error('Error creating detail user:', error);
    }
  }

}

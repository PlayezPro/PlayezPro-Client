import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DetailUsersService } from 'src/app/services/detailService/detail-users.service';

@Component({
  selector: 'app-foto-perfil',
  templateUrl: './foto-perfil.component.html',
  styleUrls: ['./foto-perfil.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class FotoPerfilComponent {
  @Input() photo: string | null = null;
  @Input() defaultImage: string = '../../../assets/userPic/profileIcon.png';
  @Output() photoChanged = new EventEmitter<string>();
  imageFile: File | null = null;
  uploadSuccess: boolean = false;
  uploadMessage: string = '';

  constructor(private detailsService: DetailUsersService) {}

  get photoSrc() {
    return this.photo || this.defaultImage;
  }

  handleImageError() {
    this.photo = this.defaultImage;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  async uploadImage() {
    if (this.imageFile) {
      const userId = localStorage.getItem('users_id');
      if (userId) {
        try {
          const userDetails = await this.detailsService.getDetailById(userId);
          const detailId = userDetails._id;

          const formData = new FormData();
          formData.append('imagen', this.imageFile);
          formData.forEach((value, key) => {
          });
          const response = await this.detailsService.addImageProfile(detailId, formData);

          // Actualizar la foto
          this.photoChanged.emit(response.data.photo);
          this.uploadSuccess = true;
          this.uploadMessage = 'Has cambiado la foto correctamente.';

          // Resetear el archivo seleccionado
          this.imageFile = null;

          return response.data;
        } catch (error) {
          console.error('Error al subir la imagen', error);
        }
      } else {
        console.error('No se ha encontrado el userId en el localStorage');
      }
    } else {
      console.error('No has seleccionado una foto');
    }
  }
}

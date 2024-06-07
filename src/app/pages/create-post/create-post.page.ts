import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PostServiceService } from 'src/app/services/postService/post.service';
import { FormsModule } from '@angular/forms';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { ButtonPlayezComponent } from 'src/app/components/ui_ux/button-playez/button-playez.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
  standalone: true,
  imports: [IonicModule, NavbarComponent, FormsModule, TopbarComponent, NgIf, CommonModule, ButtonPlayezComponent]
})
export class CreatePostPage implements OnInit {

  errorMessage: string | null = null;
  showAlert: boolean = false;
  post: any = {};
  imgSrc: string | undefined;
  imageFile: File | null = null;
  aviso: boolean = true;

  constructor(private PostService: PostServiceService, private alertController: AlertController, private modalController: ModalController) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('users_id');
    if (userId) {
      this.post.users_id = userId;
    } else {
      console.error('users_id no encontrado en localStorage');
    }
    this.showAviso();
  }

  async takeImage() {
    try {
      const photoData = await this.PostService.takePicture('Imagen del producto');
      if (photoData && photoData.webPath) {
        const response = await fetch(photoData.webPath);
        const blob = await response.blob();
        const file = new File([blob], `imagen.${photoData.format}`);
        this.imageFile = file;
        this.imgSrc = URL.createObjectURL(file);
      } else {
        console.error('No se seleccionó ninguna imagen.');
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  async createPost() {
    this.errorMessage = null;
    const userId = localStorage.getItem('users_id');
    if (!userId) {
      console.error('users_id no encontrado en localStorage');
      return;
    }

    try {
      if (!this.imageFile) {
        console.error('No se ha seleccionado ninguna imagen.');
        return;
      }

      const newPost = { ...this.post, users_id: userId };
      await this.PostService.CreatePost(newPost, this.imageFile);
      this.post = { users_id: userId };
      this.imgSrc = undefined;
      this.imageFile = null;
      await this.modalController.dismiss();
    } catch (error: any) {
      console.error('Error al crear el Post:', error);
      this.errorMessage = error.message || 'Se produjo un error al crear el post';
    }
  }

  async showAviso() {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'El archivo debe tener un formato de video, y pesar menos de 20Mb',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.closeAviso();
        }
      }]
    });

    await alert.present();
  }

  closeAviso(){
    this.aviso = false;
  }
}

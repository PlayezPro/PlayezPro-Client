import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PostServiceService } from 'src/app/services/postService/post.service';
import { FormsModule } from '@angular/forms';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
  standalone: true,
  imports: [IonicModule, NavbarComponent, FormsModule, NavbarComponent, TopbarComponent, NgIf,CommonModule]
})
export class CreatePostPage implements OnInit {

  errorMessage: string | null = null;
  showAlert:boolean=false;
  post: any = {};
  imgSrc: string | undefined;
  imageFile: File | null = null; // Inicializado como null  userId: string = '';
  selectedFile: File | null = null;

  errorin:string |null=null;
  aviso:boolean = true ;
  constructor(private PostService: PostServiceService,private alertController: AlertController) { }

  ngOnInit(): void {
    // Recuperar el users_id del localStorage
    const userId = localStorage.getItem('users_id');
    console.log(userId)
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
      console.log(photoData)
      if (photoData && photoData.webPath) {
        // Cargar la imagen desde webPath y convertirla a blob
        const response = await fetch(photoData.webPath);
        const blob = await response.blob();
  
        // Crear un objeto File a partir del blob
        const file = new File([blob], `imagen.${photoData.format}`);
  
        // Almacenar el archivo de imagen en imageFile
        this.imageFile = file;
  
        // Almacenar la URL del archivo en imgSrc para mostrar la vista previa
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
      // Llama a la función takeImage() para obtener el archivo si aún no lo has hecho
      if (!this.imageFile) {
        console.error('No se ha seleccionado ninguna imagen.');
        return;
      }
  
      // Crea un nuevo objeto post con los datos y el archivo
      const newPost = { ...this.post, users_id: userId };
  
      // Llama a la función CreatePost() del servicio para crear el post
      await this.PostService.CreatePost(newPost, this.imageFile);
  
      // Restablece los valores después de crear el post
      console.log('Post creado exitosamente', newPost);
      this.post = { users_id: userId };
      this.imgSrc = undefined;
      this.imageFile = null;
    } catch (error: any) {
      console.error('Error al crear el Post:', error);
      this.errorMessage = error.message || 'Se produjo un error al crear el post';
    }
  }
  

  // async CreatePost() {
  //   try {
  //     this.errorMessage = null;
  //     const userId = localStorage.getItem('users_id');
  //     if (!userId) {
  //       console.error('users_id no encontrado en localStorage');
  //       return;
  //     } else {
  //       this.post.users_id = userId;
  //     }
  
  //     const response = await this.PostService.CreatePost(this.post);
  //     console.log('info enviada al servidor', this.post);
  
  //     if (response && response.data) {
  //       // Si la respuesta es correcta, continuar con el flujo normal
  //       console.log('Respuesta del servidor:', response.data);
  //     }
      
  //   } catch (error: any) {
  //     if (error.response && error.response.data && error.response.data.message) {
  //       this.errorMessage = error.response.data.message;
  //     }
  //   }
  // }

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

import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PostServiceService } from 'src/app/services/postService/post.service';
import { FormsModule } from '@angular/forms';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
  standalone: true,
  imports: [IonicModule, NavbarComponent, FormsModule, NavbarComponent, TopbarComponent]
})
  export class CreatePostPage implements OnInit{

  post: any = {};
  userId: string = '';
  selectedFile: File | null = null;

  constructor(private PostService: PostServiceService ) { }

  ngOnInit(): void {
    // Recuperar el users_id del localStorage
    const userId = localStorage.getItem('users_id');
    if (userId) {
      this.post.users_id = userId;
    } else {
      console.error('users_id no encontrado en localStorage');
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  async CreatePost() {
    // Asegurarse de que users_id esté presente en el post antes de enviar
    const userId = localStorage.getItem('users_id');
    if (userId) {
      this.post.users_id = userId;
    } else {
      console.error('users_id no encontrado en localStorage');
      return; // Salir si no se encuentra users_id
    }

    // Adjuntar el archivo seleccionado al post
    if (this.selectedFile) {
      this.post.file = this.selectedFile;
    }

    try {
      await this.PostService.CreatePost(this.post);
      console.log('Post creado exitosamente', this.post);
      this.post = {}; // Limpiar el objeto post después de enviarlo, pero mantener users_id
      this.selectedFile = null; // Limpiar el archivo seleccionado
    } catch (error) {
      console.error('Error al crear el Post:', error);
    }
  }
}
 

import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PostServiceService } from 'src/app/services/postService/post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
  standalone: true,
  imports: [IonicModule, NavbarComponent, FormsModule]
})
export class CreatePostPage{
  post: any = {};
  constructor(private PostService: PostServiceService ) { }

  CreatePost() {
    this.PostService.CreatePost(this.post).subscribe(
      (response) => {
        console.log('Blog creado exitosamente:', response);
        this.post = {}; // Para limpiar el objeto post después de enviarlo
      },
      (error) => {
        console.error('Error al crear el Post:', error);
      }
    );
  }
    }

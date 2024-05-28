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


  post: any = {
    userId: ''
  };
  constructor(private PostService: PostServiceService ) { }

  ngOnInit(): void {
    // Aquí puedes recuperar el userId del localStorage
    this.post.userId = localStorage.getItem('users_id') || '';
    console.log(this.post.userId)
  }

  async CreatePost() {
    try {
      await this.PostService.CreatePost(this.post);
      console.log('Post creado exitosamente');
      this.post = {}; // Para limpiar el objeto post después de enviarlo
    } catch (error) {
      console.error('Error al crear el Post:', error);
    }
  }
    }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { LikesService } from 'src/app/services/likesService/likes.service';
import { PostServiceService } from 'src/app/services/postService/post.service';

@Component({
  selector: 'app-ranking-system',
  templateUrl: './ranking-system.page.html',
  styleUrls: ['./ranking-system.page.scss'],
  standalone: true,
  imports: [NavbarComponent, TopbarComponent, IonCardSubtitle, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonHeader, IonTitle, IonContent, IonToolbar, CommonModule, FormsModule]
})
export class RankingSystemComponent implements OnInit {
  posts: any[] = [];
  isLoadingPosts: boolean[] = [];

  constructor(private postService: PostServiceService, private likeService: LikesService) { }

  async ngOnInit(): Promise<void> {
    this.postsByLikes();
  }

  async postsByLikes(): Promise<void> {
    try {
      const response = await this.postService.getAllPost();
      this.posts = response.data;
      this.isLoadingPosts = new Array(this.posts.length).fill(true); 
      const currentUserId = localStorage.getItem('users_id')!;
      console.log(this.posts);

      for (let i = 0; i < this.posts.length; i++) {
        const post = this.posts[i];

        const totallyLikes = await this.likeService.totalLikes(post._id);
        post.totalLikes = totallyLikes;
      }
      //Order por cantidad de likes
      this.sortByLikes();

    } catch (error) {
      console.error('Error al obtener los posts ordenados por likes:', error);
    }
  }

  //Funcion ordenar por likes
  sortByLikes(): void {
    this.posts.sort((a, b) => b.totalLikes - a.totalLikes);
  }
}

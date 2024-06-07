import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { LikesService } from 'src/app/services/likesService/likes.service';
import { PostServiceService } from 'src/app/services/postService/post.service';
import { UserService } from 'src/app/services/userService/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rank-by-goal-system',
  templateUrl: './rank-by-goal.page.html',
  styleUrls: ['./rank-by-goal.page.scss'],
  standalone: true,
  imports: [
    NavbarComponent, TopbarComponent, IonCardSubtitle, IonCard, IonIcon,
    IonButton, IonCardHeader, IonCardContent, IonCardTitle, IonHeader,
    IonTitle, IonContent, IonToolbar, CommonModule, FormsModule
  ]
})
export class RankByGoalComponent implements OnInit {
  // Variables
  posts: any[] = [];
  users: { [key: string]: any } = {}; // Definir el mapeo de usuarios
  isLoadingPosts: boolean[] = [];
  selectedCategory: string = '';
  userId: string | null = null;
  categories: string[] = ['Gol', 'Jugadas', 'Asistencias', 'Defensa']; // Ejemplo de categorías

  constructor(
    private router: Router,
    private postService: PostServiceService,
    private likeService: LikesService,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadPosts();
  }
  async loadPosts(): Promise<void> {
    try {
      const response = await this.postService.getAllPost();
      const allPosts = response.data;
      this.posts = allPosts.filter((post: { category: string }) => post.category === 'Gol'); // Filtrar por la categoría de "gol"
      this.isLoadingPosts = new Array(this.posts.length).fill(true);
        for(let i = 0; i < this.posts.length; i++) {
          const post = this.posts[i];
          const userDetails = await this.userService.getUserById(post.users_id);
          post.userDetails = userDetails;
        }
      // Obtener detalles de usuarios
        const userIds = Array.from(new Set(this.posts.map(post => post.users_id)));
        const userPromises = userIds.map(id => this.userService.getUserById(id));
        const userResponses = await Promise.all(userPromises);
        userResponses.forEach(user => {
          this.users[user._id] = user;
        });

        // Detalles de likes
        for (let i = 0; i < this.posts.length; i++) {
          const post = this.posts[i];
          const totalLikes = await this.likeService.totalLikes(post._id);
          post.totalLikes = totalLikes;
        }
        // Orden conjunto por categoria y numero de likes
        this.sortByLikesAndCategory();
      } catch (error) {
          console.error('Error al obtener los posts:', error);
        }
  }
  // Orden conjunto por categoria y numero de likes
  sortByLikesAndCategory(): void {
    if (this.selectedCategory) {
      this.posts = this.posts.filter(post => post.category === this.selectedCategory);
    }
    this.posts.sort((a, b) => b.totalLikes - a.totalLikes);
  }

  filterPosts(): void {
    this.sortByLikesAndCategory();
  }
}

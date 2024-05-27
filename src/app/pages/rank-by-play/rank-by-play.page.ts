import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { LikesService } from 'src/app/services/likesService/likes.service';
import { PostServiceService } from 'src/app/services/postService/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rank-by-play',
  templateUrl: './rank-by-play.page.html',
  styleUrls: ['./rank-by-play.page.scss'],
  standalone: true,
  imports: [NavbarComponent, TopbarComponent, IonCardSubtitle, IonCard, IonIcon, IonButton, IonCardHeader, IonCardContent, IonCardTitle, IonHeader, IonTitle, IonContent, IonToolbar, CommonModule, FormsModule]
})
export class RankByPlayComponent implements OnInit {
  posts: any[] = [];
  isLoadingPosts: boolean[] = [];
  selectedCategory: string = '';
  categories: string[] = ['Gol', 'Jugadas', 'Asistencias', 'Defensa']; // Ejemplo de categorías

  constructor(private router: Router, private postService: PostServiceService, private likeService: LikesService) { }

  navigateToRanks(){
    this.router.navigate(["ranking"])
  }

  async ngOnInit(): Promise<void> {
    await this.loadPosts();
  }

  async loadPosts(): Promise<void> {
    try {
      const response = await this.postService.getAllPost();
      const allPosts = response.data;
      this.posts = allPosts.filter((post: { category: string; }) => post.category === 'Jugadas'); // Filtrar por la categoría de "gol"
  
      this.isLoadingPosts = new Array(this.posts.length).fill(true); 
  
      console.log(this.posts);
  
      for (let i = 0; i < this.posts.length; i++) {
        const post = this.posts[i];
        const totalLikes = await this.likeService.totalLikes(post._id);
        post.totalLikes = totalLikes;
      }
      this.sortByLikesAndCategory();
    } catch (error) {
      console.error('Error al obtener los posts:', error);
    }
  }

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


// posts: Post[] = [];
//   this.likesService.getRankedPosts().then(posts => {
//     this.posts = posts;
//   }).catch(error => {
//     console.error("Error al obtener el ranking de posts:", error);
//   });
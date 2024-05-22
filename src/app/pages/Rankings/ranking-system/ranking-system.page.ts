import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { LikesService } from 'src/app/services/likesService/likes.service';
import { Post } from './post.model';

@Component({
  selector: 'app-ranking-system',
  templateUrl: './ranking-system.page.html',
  styleUrls: ['./ranking-system.page.scss'],
  standalone: true,
  imports: [NavbarComponent, TopbarComponent, IonCardSubtitle, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonHeader, IonTitle, IonContent, IonToolbar, CommonModule, FormsModule]
})
export class RankingSystemComponent implements OnInit {
  posts: Post[] = [];

  constructor(private likesService: LikesService) {}

  ngOnInit(): void {
    this.likesService.getRankedPosts().then(posts => {
      this.posts = posts;
    }).catch(error => {
      console.error("Error al obtener el ranking de posts:", error);
    });
  }
}

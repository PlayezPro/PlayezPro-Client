import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PostServiceService } from 'src/app/services/postService/post.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { UserService } from 'src/app/services/userService/user.service';
import { GoogleloginComponent } from 'src/app/components/googlelogin/googlelogin.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { CommentService } from 'src/app/services/commentService/comment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.page.html',
  styleUrls: ['./notice.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent, GoogleloginComponent]
})
export class NoticePage implements OnInit {

  isModalOpen = false;
  posts: any[] = [];
  comments: any[] = [];
  isImageTrue: boolean = false;

  constructor(private postService: PostServiceService, private userService: UserService, private commentService: CommentService) {}

  menuType: string = 'overlay';

  async ngOnInit(): Promise<void> {
    await this.generatePost();
  }

  async generatePost(): Promise<void> {
    try {
      const response = await this.postService.getAllPost();
      this.posts = response.data;
      
      for (const post of this.posts) {
        const userDetails = await this.userService.getUserById(post.users_id);
        post.userDetails = userDetails;
        const postComments = await this.commentService.getCommentsPost(post._id);
        post.allComments = postComments;
        post.isModalOpen = false;
      }

      // Ordenar los posts por fecha de creación (createdAt) de forma descendente.
      await this.sortPosts();

    } catch (error) {
      console.error('Error al obtener los posts:', error);
    }
  }

  async sortPosts(): Promise<void> {
    this.posts.sort((a, b) => {
      const dateA = new Date(this.parseDate(a.Created_At));
      const dateB = new Date(this.parseDate(b.Created_At));
      return dateB.getTime() - dateA.getTime();
    });
  }

  parseDate(dateString: string): string {
    // Parsear la fecha en el formato "dd-mm-yyyy hh:mm:ss" a "yyyy-mm-dd hh:mm:ss"
    const parts = dateString.split(' ');
    const dateParts = parts[0].split('-');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]} ${parts[1]}`;
  }

  async onIonInfinite(ev: any): Promise<void> {
    await this.generatePost();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  isImage(file: string): boolean {
    const isImage = /\.(gif|jpe?g|tiff?|png|webp|bmp)(\?.*)?$/i.test(file);
    return isImage;
  }

  handleRefresh(event: any): void {
    setTimeout(() => {
      // Cualquier llamada para cargar datos iría aquí
      event.target.complete();
    }, 2000);
  }

  setOpen(post: any, isOpen: boolean): void {
    post.isModalOpen = isOpen;
  }
}

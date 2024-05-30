import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PostServiceService } from 'src/app/services/postService/post.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { UserService } from 'src/app/services/userService/user.service';
import { GoogleloginComponent } from 'src/app/components/googlelogin/googlelogin.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { CommentService } from 'src/app/services/commentService/comment.service';
import { LikesService } from 'src/app/services/likesService/likes.service';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { Router } from '@angular/router';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { BtnFollowComponent } from 'src/app/components/ui_ux/btn-follow/btn-follow.component';

@Component({
  selector: 'app-noticeV',
  templateUrl: './noticeV.page.html',
  styleUrls: ['./noticeV.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent, TopbarComponent,  GoogleloginComponent, NgxSpinnerModule, LoaderComponent, BtnFollowComponent]
})
export class NoticePageV implements OnInit {
  userId: string | null = null;
  comentarioTexto: string = '';
  isModalOpen = false;
  posts: any[] = [];
  comments: any[] = [];
  isImageTrue: boolean = false;
  mostrarIcono: boolean = false;
  isLoading: boolean = true;
  isLoadingPosts: boolean[] = [];

  constructor(
    private postService: PostServiceService,
    private userService: UserService, 
    private commentService: CommentService, 
    private likeService: LikesService, 
    private router:Router
    ) { }

  async ngOnInit(): Promise<void> {

    await this.generatePost();
  }

  async ionViewDidEnter() {
    try {
      this.isLoading = true; // Activa el loader al entrar en la vista
      await this.delay(7000); // Espera 9 segundos
      this.isLoading = false; // Desactiva el loader después de 9 segundos
    } catch (error) {
      console.error('Error en ionViewDidEnter:', error);
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async generatePost(): Promise<void> {
    try {
      this.isLoading = true; // Iniciar carga
      const response = await this.postService.getAllPost();
      this.posts = response.data;
      this.isLoadingPosts = new Array(this.posts.length).fill(true); // Inicializar todos los posts como cargando
      const currentUserId = localStorage.getItem('users_id')!;
      console.log(this.posts);

      for (let i = 0; i < this.posts.length; i++) {
        const post = this.posts[i];

        const totallyLikes = await this.likeService.totalLikes(post._id);
        post.totalLikes = totallyLikes;

        const userDetails = await this.userService.getUserById(post.users_id);
        post.userDetails = userDetails;

        const postComments = await this.commentService.getCommentsPost(post._id);
        post.allComments = postComments;
        for (const comments of postComments) {
          const commentByUser = await this.userService.getUserById(comments.users_id);
          comments.userComment = commentByUser;
        }
        post.isModalOpen = false;

        const hasLikesResponse = await this.likeService.checkLikes(post._id, currentUserId);
        post.hasLikes = hasLikesResponse;
        this.isLoadingPosts[i] = false; // Marcar el post actual como cargado
        console.log(`Post ID: ${post._id}, isLiked: ${hasLikesResponse}`);
      }

      // Ordenar los posts por fecha de creación (createdAt) de forma descendente.
      await this.sortPosts();

      // Espera 9 segundos antes de finalizar la carga
      await this.delay(7000);
      this.isLoading = false; // Finalizar carga
    } catch (error) {
      console.error('Error al obtener los posts:', error);
      this.isLoading = false; // Finalizar carga en caso de error
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

  async handleRefresh(event: any): Promise<void> {
    try {
      // Llama a generatePost() para actualizar los datos
      await this.generatePost();
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    } finally {
      // Indica que la operación de actualización ha finalizado
      event.target.complete();
    }
  }

  setOpen(post: any, isOpen: boolean): void {
    post.isModalOpen = isOpen;
  }

  async addLike(postId: string): Promise<void> {
    this.userId = localStorage.getItem('users_id');
    if (this.userId) {
      // Llama a tu servicio para agregar el like, pasando el postId y el userId
      await this.likeService.addLike(postId, this.userId);
      const postIndex = this.posts.findIndex(post => post._id === postId);
      if (postIndex !== -1) {
        const post = this.posts[postIndex];
        post.hasLikes = !post.hasLikes;
        post.totalLikes += post.hasLikes ? 1 : -1;
      } else {
        console.error('No se puede agregar el like: userId no encontrado en el localStorage');
      }
    }
  }

  getUserId(): string | null {
    return localStorage.getItem('users_id');
  }

  async addComment(postId: string, comentarioTexto: string) {
    if (this.comentarioTexto !== null) {
      this.userId = localStorage.getItem('users_id')!;
      const datosComentario = {
        postId: postId,
        userId: this.userId,
        comments: comentarioTexto
      };
      try {
        await this.commentService.writeComment(postId, this.userId, datosComentario.comments);
        this.comentarioTexto = '';
      } catch (error) {
        // Manejar errores aquí
      }
    }
  }

  async deleteComment(postId: string) {
    try {
      await this.commentService.deleteComment(postId)
      console.log(postId)
    } catch (error) {

    }
  }

  toggleIcon(event: any) {
    const texto = event.target.value || '';
    this.mostrarIcono = event.target.value.trim() !== '';
    this.comentarioTexto = texto.trim();
  }

  passUserId(users_id: string) {
    this.router.navigate(['/manage-user', users_id]);
  }
  async toggleComments(post: any): Promise<void> {
    post.showComments = !post.showComments;
  }
}

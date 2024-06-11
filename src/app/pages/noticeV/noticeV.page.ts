import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GestureController, GestureDetail } from '@ionic/angular/standalone';
import { PostServiceService } from 'src/app/services/postService/post.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { UserService } from 'src/app/services/userService/user.service';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { CommentService } from 'src/app/services/commentService/comment.service';
import { LikesService } from 'src/app/services/likesService/likes.service';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { Router } from '@angular/router';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { BtnFollowComponent } from 'src/app/components/ui_ux/btn-follow/btn-follow.component';
import { ActionSheetService } from 'src/app/services/actionSheetService/action-sheet.service';
import { DetailUsersService } from 'src/app/services/detailService/detail-users.service';


@Component({
  selector: 'app-noticeV',
  templateUrl: './noticeV.page.html',
  styleUrls: ['./noticeV.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent, TopbarComponent, LoaderComponent, BtnFollowComponent]
})
export class NoticePageV implements OnInit, AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('reelsContainer', {static: true}) reelsContainer!: ElementRef<HTMLDivElement>;
  
  // Varibles
  userId: string | null = null;
  comentarioTexto: string = '';
  isModalOpen = false;
  posts: any[] = [];
  comments: any[] = [];
  isImageTrue: boolean = false;
  mostrarIcono: boolean = false;
  isLoading: boolean = true;
  isLoadingPosts: boolean[] = [];
  imageSrc: string = '../../../assets/icon/playezWhite.svg'; // Define la propiedad imageSrc
  imageLike:string = '../../../assets/icon/playez.svg'
  currentIndex = 0;
  videoUrl: string = ''; // Variable para almacenar la URL del video que viene del controlador de Posts
  defaultImage: string = '../../../assets/userPic/profileIcon.png'; // Ruta a tu imagen predeterminada
  

  constructor(
    private postService: PostServiceService,
    private userService: UserService, 
    private detailUserService: DetailUsersService,
    private commentService: CommentService, 
    private likeService: LikesService, 
    private actionSheetService: ActionSheetService,
    private router:Router,
    private cdr: ChangeDetectorRef,
    private gestureCtrl: GestureController
    ) { }

    async ngOnInit(): Promise<void> {
    await this.generatePost();
  }

  handleImageError(detail: any) {
    detail.userDetails.photo = this.defaultImage;
  }

  // Lógica para manejar el reproductor de video
    ngAfterViewInit() {
    if (this.reelsContainer && this.reelsContainer.nativeElement){
      this.initializeReels();
    }
  }

  initializeReels() {
    if (this.reelsContainer) {
      const gesture = this.gestureCtrl.create({
        el: this.reelsContainer.nativeElement,
        gestureName: 'swipe-vertical',
        onMove: (event) => this.handleSwipe(event),
        threshold: this.swipeThreshold,
      });
      gesture.enable();
    }
  }

  //Variables para swipe Gesture
  private swipeThreshold: number = 500; // Aumenta el umbral de distancia a 500 píxeles
  private swipeVelocityThreshold: number = 2.0; // Aumenta el umbral de velocidad a 2.0 píxeles/ms
  private lastSwipeTime: number = 0; // Tiempo del último deslizamiento
  private swipeCooldown: number = 600; // Milisegundos. Tiempo mínimo entre deslizamientos

  handleSwipe(event: GestureDetail) {
    const currentTime = new Date().getTime();
    const timeSinceLastSwipe = currentTime - this.lastSwipeTime;
  
    if (timeSinceLastSwipe > this.swipeCooldown) {
      const deltaY = Math.abs(event.deltaY);
      const velocityY = Math.abs(event.velocityY);
  
      if (deltaY > this.swipeThreshold || velocityY > this.swipeVelocityThreshold) {
        if (event.deltaY > 0) {
          console.log('Swipe hacia abajo');
          this.prevStory();
        } else {
          console.log('Swipe hacia arriba');
          this.nextStory();
        }
        this.lastSwipeTime = currentTime;
      }
    }
  }
  
  nextStory() {
    if (this.currentIndex < this.posts.length - 1) {
      this.currentIndex++;
      this.cdr.detectChanges();
    }
  }

  prevStory() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.cdr.detectChanges();
    }
  }

  async ionViewDidEnter() {
    try {
      this.isLoading = true;
      await this.delay(7000);
      this.isLoading = false;
    } catch (error) {
      console.error('Error en ionViewDidEnter:', error);
    }
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// Generador de Post con los detalles de interacción
async generatePost(): Promise<void> {
  try {
    this.isLoading = true; // Iniciar carga
    const response = await this.postService.getAllPost();
    this.posts = response.data;
    this.isLoadingPosts = new Array(this.posts.length).fill(true); // Inicializar todos los posts como cargando
    const currentUserId = localStorage.getItem('users_id')!;
    // console.log(this.posts);

    // Obtener detalles de todos los usuarios
    const postDetailsResponse = await this.detailUserService.getAllDetails();
    const postDetails = postDetailsResponse.data;
    console.log(postDetails)

    // Detalles de interacciones
    for (let i = 0; i < this.posts.length; i++) {
      const post = this.posts[i];

      const totallyLikes = await this.likeService.totalLikes(post._id);
      post.totalLikes = totallyLikes;

      const userDetails = await this.userService.getUserById(post.users_id);
      post.userDetails = userDetails;

      const postComments = await this.commentService.getCommentsPost(post._id);
      post.allComments = postComments;
      console.log(post.allComments)
      post.commentCount = postComments.length;

      // Encontrar los detalles del usuario correspondiente en postDetails
      const userDetail = postDetails.find((detail: any) => detail.userId === post.users_id);
      if (userDetail) {
        post.userDetails[0].photo = userDetail.photo; // Asignar la foto del usuario a userDetails
      }

      // Procesar cada comentario para obtener detalles del usuario
      for (const comment of postComments) {
        const commentByUser = await this.userService.getUserById(comment.users_id);
        comment.userComment = commentByUser;

        // Encontrar el detalle del usuario correspondiente en postDetails
        const userDetail = postDetails.find((detail: any) => detail.userId === comment.users_id);
        if (userDetail) {
          comment.userDetail = userDetail; // Asignar detalles del usuario al comentario
        }
      }

      post.isModalOpen = false;

      const hasLikesResponse = await this.likeService.checkLikes(post._id, currentUserId);
      post.hasLikes = hasLikesResponse;
      this.isLoadingPosts[i] = false; // Marcar el post actual como cargado
      // console.log(`Post ID: ${post._id}, isLiked: ${hasLikesResponse}`);

      // Actualizar la vista después de cargar cada post
      this.cdr.detectChanges();
    }

    // Ordenar los posts por fecha de creación (createdAt) de forma descendente.
    await this.sortPosts();

    this.isLoading = false; // Finalizar carga
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    this.isLoading = false; // Finalizar carga en caso de error
  }
}



  // Función para ordenar los posts
  async sortPosts(): Promise<void> {
    this.posts.sort((a, b) => {
      const dateA = new Date(this.parseDate(a.Created_At));
      const dateB = new Date(this.parseDate(b.Created_At));
      return dateB.getTime() - dateA.getTime();
    });
  }

  // Parsear la fecha en el formato "dd-mm-yyyy hh:mm:ss" a "yyyy-mm-dd hh:mm:ss"
  parseDate(dateString: string): string {
    const parts = dateString.split(' ');
    const dateParts = parts[0].split('-');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]} ${parts[1]}`;
  }
  // Infinite Scroll
  async onIonInfinite(ev: any): Promise<void> {
    await this.generatePost();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  // Formato Imagen
  isImage(file: string): boolean {
    const isImage = /\.(gif|jpe?g|tiff?|png|webp|bmp)(\?.*)?$/i.test(file);
    return isImage;
  }
  // Refrescador de posts del muro
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

  // INTERACCIÓNES
  // Likes
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
        this.cdr.detectChanges();
        this.changeImage(); // Cambia la imagen
      } else {
        console.error('No se puede agregar el like: userId no encontrado en el localStorage');
      }
    }
  }

  getUserId(): string | null {
    return localStorage.getItem('users_id');
  }
// Comentarios
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
        
        // Encuentra el post correspondiente y actualiza su lista de comentarios
        const postIndex = this.posts.findIndex(post => post._id === postId);
        if (postIndex !== -1) {
          const post = this.posts[postIndex];
          const postComments = await this.commentService.getCommentsPost(post._id);
          post.allComments = postComments;
  
          for (const comment of postComments) {
            const commentByUser = await this.userService.getUserById(comment.users_id);
            comment.userComment = commentByUser;
          }
        }
        
        this.comentarioTexto = '';
        this.cdr.detectChanges(); // Forzar la detección de cambios
      } catch (error) {
        // Manejar errores aquí
        console.error('Error al agregar comentario:', error);
      }
    }
  }
  
// Eliminar Comentario
  async deleteComment(postId: string, commentId: string) {
    try {
      // Elimina el comentario utilizando el commentId
      await this.commentService.deleteComment(commentId);
      console.log(`Comentario eliminado: ${commentId}`);
      
      // Encuentra el post correspondiente y actualiza su lista de comentarios
      const postIndex = this.posts.findIndex(post => post._id === postId);
      if (postIndex !== -1) {
        const post = this.posts[postIndex];
        const postComments = await this.commentService.getCommentsPost(post._id);
        post.allComments = postComments;
  
        for (const comment of postComments) {
          const commentByUser = await this.userService.getUserById(comment.users_id);
          comment.userComment = commentByUser;
        }
      }
  
      this.cdr.detectChanges(); // Forzar la detección de cambios
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
    }
  }  
  // Toggle para abrir y cerrar cometnario
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

  getImageSrc(isLiked: boolean): string {
    return isLiked ? this.imageLike : this.imageSrc;
  }

  changeImage() {
    this.imageSrc = this.imageSrc === '../../../assets/icon/playezWhite.svg'
     ? '../../../assets/icon/playez.svg'
      : '../../../assets/icon/playezWhite.svg';
  }
  
  // Método para abrir el ActionSheet al hacer clic en compartir
  presentActionSheet(postUrl: string) {
    this.actionSheetService.presentActionSheet(postUrl);
  }

  async sharePost(postId: string) {
    const postUrl = `https://playezpro-client.netlify.app/post/${postId}`;
    this.presentActionSheet(postUrl);
  }
  
}

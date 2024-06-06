import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PostServiceService } from 'src/app/services/postService/post.service';
import { FormsModule } from '@angular/forms';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
  standalone: true,
  imports: [IonicModule, NavbarComponent, FormsModule, NavbarComponent, TopbarComponent,CommonModule]
})
export class CreatePostPage implements OnInit{
  
  errorMessage: string | null = null;
  showAlert:boolean=false;
  post: any = {};
  userId: string = '';
  errorin:string |null=null;
  aviso:boolean = true ;
  constructor(private PostService: PostServiceService ,private alertController: AlertController) { }

  ngOnInit(): void {
    this.showAviso();
  }

  async CreatePost() {
    try {
      this.errorMessage = null;
      const userId = localStorage.getItem('users_id');
      if (!userId) {
        console.error('users_id no encontrado en localStorage');
        return;
      } else {
        this.post.users_id = userId;
      }
  
      const response = await this.PostService.CreatePost(this.post);
      console.log('info enviada al servidor', this.post);
  
      if (response && response.data) {
        // Si la respuesta es correcta, continuar con el flujo normal
        console.log('Respuesta del servidor:', response.data);
      }
      
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        this.errorMessage = error.response.data.message;
      }
    }
  }

  async showAviso() {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'El archivo debe tener un formato de video, y pesar menos de 20Mb',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.closeAviso();
        }
      }]
    });

    await alert.present();
  }

  closeAviso(){
    this.aviso = false;
  }
}

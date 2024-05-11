import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PostServiceService } from '../services/postService/post.service';
import { OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/userService/user.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage implements OnInit{

  posts :any[]=[];
  isImagetrue : boolean = false;
  constructor(private postService: PostServiceService, private userService:UserService) {
    
  }
  menuType: string = 'overlay'

  async ngOnInit(): Promise<void> {
     this.generatePost()
  }
  
  async  generatePost():Promise<any>{
    try {
     const response= await this.postService.getAllPost()
     this.posts = response.data
     for (const post of this.posts) {
      const userDetails = await this.userService.getUserById(post.users_id);
      post.userDetails = userDetails;
      console.log(userDetails);
    }
    
        
      } catch (error) {
        console.error('Error to fetch Posts')
      }
  }

  onIonInfinite(ev:any) {
    this.generatePost();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  
  isImage(file: string): boolean {
    const isImage = /\.(gif|jpe?g|tiff?|png|webp|bmp)(\?.*)?$/i.test(file);
    return isImage;
  }  
  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }
}

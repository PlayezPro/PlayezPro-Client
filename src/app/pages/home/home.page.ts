import { Component} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PostServiceService } from 'src/app/services/postService/post.service';
import { OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { UserService } from 'src/app/services/userService/user.service';
import { GoogleloginComponent } from 'src/app/components/googlelogin/googlelogin.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { CommentService } from 'src/app/services/commentService/comment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,FormsModule,NavbarComponent, GoogleloginComponent],
})
export class HomePage implements OnInit{
  isModalOpen = false;
  posts :any[]=[];
  comments : any[] = []
  isImagetrue : boolean = false;
  
  
  constructor(private postService: PostServiceService, private userService:UserService, private commentService: CommentService) {
  }
  menuType: string = 'overlay'

  async ngOnInit(): Promise<void> {
     this.generatePost()
  }
  
  async  generatePost():Promise<any>{
    try {
     const response= await this.postService.getAllPost()
     this.posts = response.data
     console.log(this.posts)
     for (const post of this.posts) {
      const userDetails = await this.userService.getUserById(post.users_id);
      post.userDetails = userDetails;
      const postComments = await this.commentService.getCommentsPost(post._id)
      post.allComments = postComments
      post.isModalOpen = false;
      console.log(userDetails);
      console.log("hola",postComments)
     
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
  setOpen(post:any, isOpen: boolean) {
    post.isModalOpen = isOpen;
  }

}
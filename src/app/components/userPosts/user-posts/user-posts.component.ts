import { CommonModule } from '@angular/common';
import { Component, OnInit,Input, OnChanges ,SimpleChanges} from '@angular/core';
import { IonicModule} from '@ionic/angular';
import { PostServiceService } from 'src/app/services/postService/post.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class UserPostsComponent  implements OnInit, OnChanges {
  @Input() users_id: string | null = null;
  userId: string | null = null;
  posts: any[] = []
  constructor(private postService:PostServiceService) { }

  ngOnInit() {
    this.showUserPosts()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['users_id'] && changes['users_id'].currentValue) {
      this.showUserPosts();
    }
  }

  async showUserPosts(){
    try {
      const response = await this.postService.getUserPosts(this.users_id);
      this.posts = response.data
      // console.log(this.posts)
    } catch (error) {
      console.error('Error al mostrar los blogs del usuario', error);
    }
  }
}

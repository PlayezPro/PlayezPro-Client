import { Component, OnInit } from '@angular/core';
import { FollowService } from 'src/app/services/followService/follows.service';
@Component({
  selector: 'app-btn-follow',
  templateUrl: './btn-follow.component.html',
  styleUrls: ['./btn-follow.component.scss'],
  standalone: true,
  imports: []
})
export class BtnFollowComponent  implements OnInit {

  constructor(private followService:FollowService) { }

  ngOnInit() {}

async createRelation(followedID: string): Promise<void> {
  try {
    const userFollower = localStorage.getItem('users_id');

    // Verifica que los IDs no sean null antes de usarlos
    if (userFollower && followedID) {
      await this.followService.addFollower(followedID,userFollower); 
    } else {
      console.error('User ID or Followed ID is missing');
    }
  } catch (error) {
    console.error('Error adding follower:', error);
  }
}

}
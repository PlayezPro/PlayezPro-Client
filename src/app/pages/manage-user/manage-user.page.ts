import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { FutcardComponent } from 'src/app/components/futcard/futcard.component';
import { SkillsGraphicsComponent } from 'src/app/components/graphics/skills-graphics/skills-graphics.component';
import { UserPostsComponent } from 'src/app/components/userPosts/user-posts/user-posts.component';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.page.html',
  styleUrls: ['./manage-user.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent,FutcardComponent,SkillsGraphicsComponent,UserPostsComponent]
})
export class ManageUserPage implements OnInit {
  users_id: string | null = null;
  user: any[]= [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.users_id = params.get('users_id');
    });
  }


}

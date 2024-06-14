import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { FutcardComponent } from 'src/app/components/futcard/futcard.component';
import { SkillsGraphicsComponent } from 'src/app/components/skills-graphics/skills-graphics.component';
import { UserPostsComponent } from 'src/app/components/userPosts/user-posts/user-posts.component';
import { SettingDetailsComponent } from 'src/app/components/setting-details/setting-details.component';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.page.html',
  styleUrls: ['./manage-user.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent, FutcardComponent, SkillsGraphicsComponent, UserPostsComponent, SettingDetailsComponent, TopbarComponent ]
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

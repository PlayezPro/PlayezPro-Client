import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { ButtonAddComponent } from '../ui_ux/button-add/button-add.component';
import { CreatePostPage } from 'src/app/pages/create-post/create-post.page';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, ButtonAddComponent],
})
export class NavbarComponent implements OnInit {

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async openCreatePostModal() {
    const modal = await this.modalController.create({
      component: CreatePostPage,
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 1]
    });
    return await modal.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ReelComponent } from 'src/app/components/reel/reel.component';
import { ReelService } from 'src/app/services/reelService/reel.service';

@Component({
  selector: 'app-reelPage',
  templateUrl: './reel.page.html',
  styleUrls: ['./reel.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, NavbarComponent, ReelComponent]
})
export class ReelPage implements OnInit {
  videos: any;

  constructor() { }
  private reelService: ReelService = new ReelService;
  ngOnInit() {
    this.videos = this.reelService.getVideos();
  }
}
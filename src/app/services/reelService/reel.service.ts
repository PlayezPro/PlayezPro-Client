import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReelService {
  private videos = [
    '../../../assets/videos/1.mp4',
    '../../../assets/videos/2.mp4',
    '../../../assets/videos/3.mp4',
    '../../../assets/videos/4.mp4',
    '../../../assets/videos/5.mp4',
    '../../../assets/videos/6.mp4',
    '../../../assets/videos/7.mp4',
    '../../../assets/videos/8.mp4',
    // Agrega más URLs de videos aquí
  ];

  constructor() {}

  getVideos() {
    return this.videos;
  }
}

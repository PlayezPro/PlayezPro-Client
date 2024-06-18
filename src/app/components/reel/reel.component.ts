import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReelService } from '../../services/reelService/reel.service';

@Component({
  selector: 'app-reel',
  templateUrl: './reel.component.html',
  styleUrls: ['./reel.component.scss'],
  imports:[CommonModule],
  standalone: true
})
export class ReelComponent implements OnInit, AfterViewInit {
  @Input() video!: string;
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;

  isPlaying: boolean;
  likes: number;
  comments: number;
  videos: string[] = []; // Array para almacenar las URLs de los videos
  currentVideoIndex: number = 0;

  constructor(private reelService: ReelService) {
    this.isPlaying = false;
    this.likes = 0;
    this.comments = 0;
  }

  ngOnInit() {
    // Obtener los videos del servicio al inicializar el componente
    this.videos = this.reelService.getVideos();
  }

  ngAfterViewInit() {
    // Reproducir el primer video automáticamente después de inicializar la vista
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoPlayer.nativeElement.play();
      this.isPlaying = true;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    // Obtener la posición del video actual
    const rect = this.videoPlayer.nativeElement.getBoundingClientRect();
    const isVisible = (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight));

    // Verificar si el video actual está visible en la ventana
    if (!isVisible) {
      // Pausar el video actual si está fuera de la vista
      this.videoPlayer.nativeElement.pause();
      this.isPlaying = false;
    }
  }

  playNextVideo() {
    // Reproducir el siguiente video cuando se desplaza lo suficiente hacia arriba
    if (this.currentVideoIndex < this.videos.length - 1) {
      this.currentVideoIndex++;
      this.video = this.videos[this.currentVideoIndex];
      this.videoPlayer.nativeElement.load();
      this.videoPlayer.nativeElement.play();
      this.isPlaying = true;
    }
  }

  playPause() {
    // Alternar la reproducción/pausa del video
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      if (this.isPlaying) {
        this.videoPlayer.nativeElement.pause();
      } else {
        this.videoPlayer.nativeElement.play();
      }
      this.isPlaying = !this.isPlaying;
    }
  }

  like() {
    // Incrementar el contador de likes
    this.likes += 1;
  }

  comment() {
    // Incrementar el contador de comentarios
    this.comments += 1;
  }
}

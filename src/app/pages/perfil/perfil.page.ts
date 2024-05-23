import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FutcardComponent } from 'src/app/components/futcard/futcard.component';
import { FollowService } from 'src/app/services/userService/follows.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent, FutcardComponent]
})
export class PerfilPage implements OnInit {
  isDarkMode: boolean = false; // Inicialización de isDarkMode

  constructor(private userFollow: FollowService, private themeService: ThemeService) { }

  ngOnInit() {
    this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });

    // Inicializar la clase del tema en el cuerpo del documento
    this.themeService.updateBodyClass(this.isDarkMode);
  }

  async createUser(): Promise<void> {
    try {
      const usersId = localStorage.getItem('users_id');
      const followedID = localStorage.getItem('follow_id');

      // Verifica que los IDs no sean null antes de usarlos
      if (usersId && followedID) {
        await this.userFollow.addFollower(usersId, followedID);  // No necesitas toPromise aquí
        console.log('Follower added successfully');
      } else {
        console.error('User ID or Followed ID is missing');
      }
    } catch (error) {
      console.error('Error adding follower:', error);
    }
  }

  toggleTheme(event: any) {
    this.themeService.toggleDarkMode();
  }
}

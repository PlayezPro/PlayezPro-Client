import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FutcardComponent } from 'src/app/components/futcard/futcard.component';
import { SkillsGraphicsComponent } from 'src/app/components/skills-graphics/skills-graphics.component';
import { UserPostsComponent } from 'src/app/components/userPosts/user-posts/user-posts.component';
import { ThemeService } from 'src/app/services/themeServices/theme.service';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { CreateDetailsComponent } from 'src/app/components/create-details/create-details.component';
import { CreateSkillComponent } from 'src/app/components/create-skill/create-skill.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, 
     CommonModule,
     FormsModule, 
     NavbarComponent, 
     TopbarComponent, 
     FutcardComponent, 
     CreateDetailsComponent, 
     CreateSkillComponent,
     SkillsGraphicsComponent,
     UserPostsComponent]
})
export class PerfilPage implements OnInit {
  isDarkMode: boolean = false; // Inicialización de isDarkMode
  users_id: string | null = null;

  constructor(private themeService: ThemeService) { }
ngOnInit() {
    this.users_id = localStorage.getItem('users_id')
    // Suscribirse a los cambios del tema oscuro
    this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
      this.themeService.updateBodyClass(isDark);
    });

    // Inicializar la clase del tema en el cuerpo del documento al cargar la página
    this.isDarkMode = this.themeService['darkMode'].value;
    this.themeService.updateBodyClass(this.isDarkMode);
  }
  
  toggleTheme(event: any) {
    this.themeService.toggleDarkMode();
  }
}

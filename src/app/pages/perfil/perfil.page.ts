import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FutcardComponent } from 'src/app/components/futcard/futcard.component';
import { ThemeService } from 'src/app/services/theme.service';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { CreateDetailsComponent } from 'src/app/components/create-details/create-details.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent, TopbarComponent, FutcardComponent, CreateDetailsComponent]
})
export class PerfilPage implements OnInit {
  isDarkMode: boolean = false; // Inicialización de isDarkMode

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });

    // Inicializar la clase del tema en el cuerpo del documento
    this.themeService.updateBodyClass(this.isDarkMode);
  }
  
  toggleTheme(event: any) {
    this.themeService.toggleDarkMode();
  }
}

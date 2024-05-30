import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Sincronizar el tema al iniciar la aplicación
    this.themeService.synchronizeTheme();
  }
}

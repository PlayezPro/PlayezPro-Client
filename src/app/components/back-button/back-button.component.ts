import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';


@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class BackButtonComponent {

  constructor(private navCtrl: NavController) { }

  goBack() {
    this.navCtrl.back(); // Utiliza el método 'back' en lugar de 'pop'
  }
}
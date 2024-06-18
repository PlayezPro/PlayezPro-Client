import { Component, OnInit } from '@angular/core';
// import { IonButton, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { BackButtonComponent } from '../back-button/back-button.component';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  standalone:true,
  imports: [RouterLink, BackButtonComponent, IonicModule]
})
export class TopbarComponent  implements OnInit {

  constructor(private Router: Router) { }

  ngOnInit() {}

  onClickLogout(){
    localStorage.removeItem('Token');
    localStorage.removeItem('users_id');
    localStorage.removeItem('dark-mode');
    this.Router.navigate(['/'])
  }

}
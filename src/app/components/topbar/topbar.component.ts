import { Component, OnInit } from '@angular/core';
import { IonButton, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  standalone:true,
  imports: [IonHeader, IonToolbar, IonTitle, IonIcon, IonButton]
})
export class TopbarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

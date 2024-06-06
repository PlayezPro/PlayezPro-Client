import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonAddComponent } from '../ui_ux/button-add/button-add.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, ButtonAddComponent],
})
export class NavbarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

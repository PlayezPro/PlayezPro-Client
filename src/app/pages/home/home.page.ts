import { Component } from '@angular/core';
import { GoogleloginComponent } from 'src/app/components/googlelogin/googlelogin.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [NavbarComponent, GoogleloginComponent],
})
export class HomePage {
  constructor() {}
  menuType: string = 'overlay'
}

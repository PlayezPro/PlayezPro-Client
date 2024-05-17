import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import axios from 'axios';
import { UserService } from 'src/app/services/userService/user.service';
import { FutcardComponent } from 'src/app/components/futcard/futcard.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent, FutcardComponent]
})
export class PerfilPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

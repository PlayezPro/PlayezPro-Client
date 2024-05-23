import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranks-page',
  templateUrl: './ranks-page.page.html',
  styleUrls: ['./ranks-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, CommonModule, FormsModule, NavbarComponent, TopbarComponent]
})
export class RanksPagePage {

  constructor( private router: Router) { }
  //Navigation
  navigateToRankGoals(){
    this.router.navigate(["ranked-goals"])
  }
  navigateToRankPlays(){
    this.router.navigate(["ranked-plays"])
  }
  navigateToRankAssistance(){
    this.router.navigate(["ranked-assistance"])
  }
  navigateToRankDefense(){
    this.router.navigate(["ranked-defense"])
  }

}
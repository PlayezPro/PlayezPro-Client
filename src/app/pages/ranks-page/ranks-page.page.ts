import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonPlayezComponent } from 'src/app/components/ui_ux/button-playez/button-playez.component';

@Component({
  selector: 'app-ranks-page',
  templateUrl: './ranks-page.page.html',
  styleUrls: ['./ranks-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent, TopbarComponent, ButtonPlayezComponent]
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
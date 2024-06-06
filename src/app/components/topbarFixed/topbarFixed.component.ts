import { Component, OnInit } from '@angular/core';
// import { IonButton, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-topbar-fixed',
  templateUrl: './topbarFixed.component.html',
  styleUrls: ['./topbarFixed.component.scss'],
  standalone:true,
  imports: [IonicModule, RouterLink]
})
export class TopbarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initializeHamburgerMenu();
  }

  initializeHamburgerMenu() {
    const hamburger = document.getElementById("hamburger");
    if (hamburger) {
      hamburger.onclick = () => {
        const navToggle = document.getElementsByClassName("toggle");
        for (let i = 0; i < navToggle.length; i++) {
          const toggle = navToggle.item(i);
          if (toggle instanceof Element) {
            toggle.classList.toggle("hidden");
          }
        }
      };
    }
  }
}
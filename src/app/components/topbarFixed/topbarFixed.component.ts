import { Component, OnInit } from '@angular/core';
// import { IonButton, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-topbar-fixed',
  templateUrl: './topbarFixed.component.html',
  styleUrls: ['./topbarFixed.component.scss'],
  standalone:true,
  imports: [IonicModule, RouterLink]
})

export class TopbarComponent  implements OnInit {

  constructor(private Router: Router) { }
  ngOnInit() {
    this.initializeHamburgerMenu();
  }

  onClickLogout(){
    localStorage.removeItem('Token');
    localStorage.removeItem('users_id');
    localStorage.removeItem('dark-mode');
    this.Router.navigate(['/'])
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
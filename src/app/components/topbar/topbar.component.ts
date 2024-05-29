import { Component, OnInit } from '@angular/core';
import { IonButton, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  standalone:true,
  imports: [IonHeader, IonToolbar, IonTitle, IonIcon, IonButton, RouterLink]
})
export class TopbarComponent  implements OnInit {

  constructor(private router: Router) { }
  // reloadPage() {
  //   // Recargar la página actual
  //   this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['/home']);
  //   });
  // }

  ngOnInit() {}

  onClickLogout(){
    localStorage.removeItem('Token');
    localStorage.removeItem('users_id');
    localStorage.removeItem('dark-mode');
    this.router.navigate(['/'])
  }

}

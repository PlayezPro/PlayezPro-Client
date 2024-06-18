import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider,  } from "firebase/auth";
import { IonicModule } from '@ionic/angular';
import { ButtonPlayezComponent } from '../ui_ux/button-playez/button-playez.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-googlelogin',
  templateUrl: './googlelogin.component.html',
  styleUrls: ['./googlelogin.component.scss'],
  standalone: true,
  imports: [IonicModule, ButtonPlayezComponent],
})
export class GoogleloginComponent  implements OnInit {
   firebaseConfig = {
    apiKey: "AIzaSyBGmmZnYN6YkOytWf6UtJVaA_1WJpGpJM0",
    authDomain: "playezapp.firebaseapp.com",
    projectId: "playezapp",
    storageBucket: "playezapp.appspot.com",
    messagingSenderId: "605271851917",
    appId: "1:605271851917:web:ccbdf7742f52f1f27f33c4",
    measurementId: "G-D53GBLR2T4"
  };

   app = initializeApp(this.firebaseConfig);
  //  analytics = getAnalytics(this.app);
   auth = getAuth();
  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToHome() { //Ruta hacia Registro en el botón
    this.router.navigate(["/home"])
  }
  
  Google(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log(credential)
    if (credential) {
      // Si se obtienen las credenciales, obtener el token de acceso
      const token = credential.accessToken;
      if (token !== undefined) {
        localStorage.setItem('Token', token);
      }
      // Hacer algo con el token de acceso...
  } else {
      // Manejar el caso en el que no se proporcionaron credenciales
      console.error("No se pudieron obtener las credenciales.");
  }
    // The signed-in user info.
    const user = result.user;
    const users_id = user.uid
    localStorage.setItem('users_id', users_id);
    console.log(users_id)
    this.navigateToHome()
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }

}

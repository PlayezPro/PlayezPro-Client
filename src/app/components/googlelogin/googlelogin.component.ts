import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider,  } from "firebase/auth";
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-googlelogin',
  templateUrl: './googlelogin.component.html',
  styleUrls: ['./googlelogin.component.scss'],
  standalone: true,
  imports: [IonicModule],
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
   analytics = getAnalytics(this.app);
   auth = getAuth();
  constructor() { }

  ngOnInit() {}
  
  Google(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential) {
      // Si se obtienen las credenciales, obtener el token de acceso
      const token = credential.accessToken;
      // Hacer algo con el token de acceso...
  } else {
      // Manejar el caso en el que no se proporcionaron credenciales
      console.error("No se pudieron obtener las credenciales.");
  }
    // The signed-in user info.
    const user = result.user;
    console.log(result.user)
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

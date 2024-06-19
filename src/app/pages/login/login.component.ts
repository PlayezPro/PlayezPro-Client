import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/authService/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { GoogleloginComponent } from 'src/app/components/googlelogin/googlelogin.component';
import { ButtonPlayezComponent } from 'src/app/components/ui_ux/button-playez/button-playez.component';
import { LogoAnimationComponent } from 'src/app/components/ui_ux/logo-animation/logo-animation.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, GoogleloginComponent, ButtonPlayezComponent, LogoAnimationComponent, RouterLink],
})

export class LoginComponent {
  // Validación email y contraseña
  get email() {
    return this.formUser.get('email') as FormControl;
  }
  get password() {
    return this.formUser.get('password') as FormControl;
  }
  //controladores
  formUser = new FormGroup({
    'email': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required]),
  })

  //Constructor para las rutas de navegación de la página
  constructor(private usersService: UsersService, private router: Router) { }

  navigateToRegister() { //Ruta hacia Registro en el botón
    this.router.navigate(["/register"])
  }
  navigateToHome() { //Ruta hacia Registro en el botón
    this.router.navigate(["/home"])
  }
  // Alertas
  showAlert = false;
  alertMessage: string = '';
  AlertMessage = false;

// Limpiar Formulario
  clearForm() {
    this.formUser.reset();
  }

  loginAttempts: number = 0;

  onSubmit() {
    if (this.formUser.valid) {
      const credentials = {
        email: this.formUser.value.email,
        password: this.formUser.value.password
      };
  
      this.usersService.loginUser(credentials).subscribe(
        (response) => {
          localStorage.setItem('Token', response.token);
          const tokenOne = localStorage.getItem('Token');
          if (tokenOne) {
            const decodedToken: any = jwtDecode(tokenOne);
            localStorage.setItem('users_id', decodedToken.id);
          }
          this.clearForm();
          this.alertMessage = '¡Bienvenido!';
          this.AlertMessage = true;
          setTimeout(() => {
            this.navigateToHome();
            this.AlertMessage = false;
          }, 2000);
        },
        (error) => {
          console.error('Error al logear:', error);
          this.alertMessage = error.message || 'Error en usuario/contraseña';
          this.AlertMessage = true; // Mostrar la alerta
          this.showAlert = true;
  
          // Aumentar el contador de intentos de inicio de sesión
          this.loginAttempts++;
          if (this.loginAttempts >= 3) {
            this.alertMessage = 'Demasiados intentos de inicio de sesión. Por favor, espere 15 minutos antes de intentarlo nuevamente.';
          }
          // Ocultar la alerta después de 3 segundos
          setTimeout(() => {
            this.AlertMessage = false;
          }, 2000);
        }
      );
    } else {
      this.alertMessage = 'Por favor, complete todos los campos correctamente.';
      this.AlertMessage = true; // Mostrar la alerta
      this.showAlert = true;
      setTimeout(() => {
        this.AlertMessage = false;
      }, 2000);
    }
  }
  
  
}
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})

export class LoginComponent {
  //validacion email y contraseña
  get email() {
    return this.formUser.get('email') as FormControl;
  }
  get password() {
    return this.formUser.get('password') as FormControl;
  }
  //controladores
  formUser = new FormGroup({
    'email': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required])

    // areAllFieldsFilled(): boolean {
    //   const formValues = this.formUser.value as { [key: string]: string | null };
    //   for (const key in formValues) {
    //     if (formValues.hasOwnProperty(key)) {
    //       const value: string | null = formValues[key];
    //       if (!value) {
    //         return false;
    //       }
    //     }
    //     return true;
    //   }
    // }
  })

  //Constructor para las rutas de navegación de la página

  constructor(private usersService: UsersService, private router: Router) { }

  navigateToRegister() { //Ruta hacia Registro en el botón
    this.router.navigate(["/register"])
  }
  navigateToHome() { //Ruta hacia Registro en el botón
    this.router.navigate(["/home"])
  }

  showAlert = false;
  alertMessage: string = '';
  AlertMessage = false;

  onSubmit() {
    if (this.formUser.valid) {
        const credentials = {
            email: this.formUser.value.email,
            password: this.formUser.value.password
        };

        this.usersService.loginUser(credentials).subscribe(
            (response) => {
                console.log('Login con éxito:', response);
                localStorage.setItem('token de admin',response.tokenLog)
                this.alertMessage = '¡Bienvenido!';
                this.AlertMessage = true;
                setTimeout(() => {
                    this.navigateToHome();
                }, 2000);
            },
            (error) => {
                console.error('Error al logear:', error);
                this.alertMessage = 'Error en usuario/contraseña';
                this.AlertMessage = true; // Mostrar la alerta
                this.showAlert = true;

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

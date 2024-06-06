import { Component } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  UsersService } from '../../services/authService/auth.service'
import { Router } from '@angular/router';
import { GoogleloginComponent } from 'src/app/components/googlelogin/googlelogin.component';
import { RegisterButtonComponent } from 'src/app/components/ui/register-button/register-button.component';  // Importa el nuevo componente
import { ButtonPlayezComponent } from 'src/app/components/ui_ux/button-playez/button-playez.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GoogleloginComponent, RegisterButtonComponent, ButtonPlayezComponent,  RouterLink],
})
export class RegisterComponent {
  //Validaciones
  //Getters
  
  get name () {
    return this.formNewUser.get('name') as FormControl } 
  get lastName () {
    return this.formNewUser.get('lastName') as FormControl }
  get userName () {
    return this.formNewUser.get('userName') as FormControl }
  get email () {
    return this.formNewUser.get('email') as FormControl }
  get phoneNumber () {
    return this.formNewUser.get('phoneNumber') as FormControl }
  get password () {
    return this.formNewUser.get('password') as FormControl }
  get repeatPassword () {
    return this.formNewUser.get('repeatPassword') as FormControl }
  get terms () {
    return this.formNewUser.get('terms') as FormControl }

  //Controllers
  'formNewUser' = new FormGroup ({
    
    'name': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]/)]),
    'lastName': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    'userName': new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z0-9]/)]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'phoneNumber': new FormControl('', Validators.required),
    'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]+$/)]),
    'repeatPassword': new FormControl('', Validators.required),
    'terms': new FormControl(false),
    // 'hiddenField': new FormControl('')
  }, { validators: this.passwordMatchValidator });

    

  //Funcion personalizada, comprobación repetir contraseña
  passwordMatchValidator(control:AbstractControl){
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;
    if (password === repeatPassword) {
      return null
    } else {
      return{mismatch:true}
    }
  }

  // Función personalizada, comprobación de campos rellenos
  areAllFieldsFilled(): boolean {
    const formValues = this.formNewUser.value as { [key: string]: string | null };
    for (const key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        const value: string | null = formValues[key];
        if (!value) {
          return false;
        }
      }
    }
    return true;
  }

  constructor (private userService: UsersService, private router: Router ) {} 
  navigateToLogin() {
    this.router.navigate([""])
  }
  navigateToHome() {
    this.router.navigate(["/home"])
  }
  // Alertas
  showTermsError = false;
  showAlert = false;
  alertMessage: string = '';
  AlertMessage = false;
  showSuccessMessage = false;

  //Alerta campos ocultos
  // ngOnInit(): void {
    // Agrega un evento de detección de cambios en el campo oculto
    // this.formNewUser.get('hiddenField')?.valueChanges.subscribe(value => {
    //   if (value !== '') {
    //     this.alertMessage = 'Intento de relleno automatizado. Bloqueando acceso.';
    //     this.showAlert = true;
    //   }
    // });
    // }

  Create() {
    if (this.formNewUser.valid && !this.formNewUser.errors?.['mismatch'] && this.formNewUser.get('terms')?.value){
      this.showTermsError = false;
      this.userService.createUser(this.formNewUser.value).subscribe(
        response => {
          console.log('Usuario creado con éxito', response);
          this.showSuccessMessage = true;
          alert('Gracias por registrarte'); 
          setTimeout(() => {
            this.navigateToHome();
          }, 2000);
        },
        error => {
          console.error('Error al crear el usuario', error);
          this.AlertMessage = true;
          this.alertMessage = 'Ocurrió un error al crear el usuario. Por favor, inténtalo de nuevo más tarde.';
          setTimeout(() => {
            this.AlertMessage = false;
          }, 2000);
        }
      );
    } else {
      this.showTermsError = true;
      if (this.formNewUser.hasError('mismatch')) {
        this.alertMessage = 'Las contraseñas no coinciden.';
      } else {
        this.alertMessage = 'Por favor, complete todos los campos correctamente.';
      }
      this.AlertMessage = true; 
      this.showAlert = true;
      setTimeout(() => {
          this.AlertMessage = false;
      }, 2000);
    }
  }

  onSubmit() {
    this.Create();
  }
}

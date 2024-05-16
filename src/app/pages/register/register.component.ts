import { Component } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  UsersService } from '../../services/users.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class RegisterComponent {
  showSuccessMessage = false;

  //Validaciones

  //Getters
  
  get name () {
    return this.formNewUser.get('name') as FormControl
  } 
  
  get lastName () {
    return this.formNewUser.get('lastName') as FormControl
  }
  get userName () {
    return this.formNewUser.get('userName') as FormControl
  }

  get email () {
    return this.formNewUser.get('email') as FormControl
  }
  get phoneNumber () {
    return this.formNewUser.get('phoneNumber') as FormControl
  }
  get password () {
    return this.formNewUser.get('password') as FormControl
  }

  get repeatPassword () {
    return this.formNewUser.get('repeatPassword') as FormControl
  }

  get terms () {
    return this.formNewUser.get('terms') as FormControl
  }

  //Controllers
  formNewUser = new FormGroup ({
    
    'name': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]/)]),
    
    'lastName': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),

    'userName': new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z0-9]/)]),
    
    'email': new FormControl('', [Validators.required, Validators.email]),

    'phoneNumber': new FormControl('', Validators.required),

    'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]),

    'repeatPassword': new FormControl('', Validators.required),

    'terms': new FormControl(false)
  }, { validators: this.passwordMatchValidator });

    

  //Funcion personalizada contraseña
  passwordMatchValidator(control:AbstractControl){
    const password = control.get('password')?.value;

    const repeatPassword = control.get('repeatPassword')?.value;

    if (password === repeatPassword) {
      return null
    } else {
      return{mismatch:true}
    }
  }

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
    this.router.navigate(["/login"])
  }
  navigateToNotice() {
    this.router.navigate(["/notice"])
  }

  showTermsError = false;
  
  Create() {
    if (this.formNewUser.valid && !this.formNewUser.errors?.['mismatch'] && this.formNewUser.get('terms')?.value){
      this.showTermsError = false;
  
      this.userService.createUser(this.formNewUser.value).subscribe(
        response => {
          console.log('Usuario creado con éxito', response);
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.navigateToNotice();
          }, 2300);
        },
        (error: any) => { // Especifica el tipo de 'error' como 'any'
          console.error('Error al crear el usuario', error);
        }
      );
    }
}
}
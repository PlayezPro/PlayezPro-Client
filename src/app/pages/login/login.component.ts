import { Component} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
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
  formUser = new FormGroup ({
    'email' : new FormControl('', [Validators.required, Validators.email]),
    'password' : new FormControl('', [Validators.required])

    areAllFIeldsFilled() : boolean{
      const formValues = this.formUser.value as {[key:string]: string | null };
      for ( const key in formValues) {
        if (formValues.hasOwnProperty(key)){
          const value: string | null = formValues[key];
          if (!value) {
            return false;
          }
        }
        return true;
      }
    } 
  })



  
}


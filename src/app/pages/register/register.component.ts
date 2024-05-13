import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormGroup, FormControl, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersSerive } from '../../services/users.service'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class RegisterComponent {

  //Validaciones

    //Getters
  get username () {
    return this.formNewUser.get('username') as FormControl
  }

  get name () {
    return this.formNewUser.get('name') as FormControl
  }

  get lastname () {
    return this.formNewUser.get('lastname') as FormControl
  }

  get email () {
    return this.formNewUser.get('email') as FormControl
  }

  get password () {
    return this.formNewUser.get('password') as FormControl
  }

  get repeatPassword () {
    return this.formNewUser.get('repeatPassword') as FormControl
  }

  //Controllers
  formNewUser = new FormGroup ({
    'username': new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),

    'name': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),

    'lastname': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),

    'email': new FormControl('', [Validators.required, Validators.email]),

    'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]),

    'repeatPassword': new FormControl('', Validators.required),
  })

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



}



// areAllFIeldsFilled() : boolean{
//   const formValues = this.formUser.value as {[key:string]: string | null };
//   for ( const key in formValues) {
//     if (formValues.hasOwnProperty(key)){
//       const value: string | null = formValues[key];
//       if (!value) {
//         return false;
//       }
//     }
//     return true;
//   }
// }
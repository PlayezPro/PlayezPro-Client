import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/authService/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-button',
  templateUrl: './register-button.component.html',
  styleUrls: ['./register-button.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterButtonComponent {
  @Input() formNewUser!: FormGroup;
  showTermsError = false;
  showAlert = false;
  alertMessage: string = '';
  AlertMessage = false;
  showSuccessMessage = false;

  constructor(private userService: UsersService, private router: Router) {}

  create() {
    if (this.formNewUser.valid && !this.formNewUser.errors?.['mismatch'] && this.formNewUser.get('terms')?.value) {
      this.showTermsError = false;
      this.userService.createUser(this.formNewUser.value).subscribe(
        response => {
          this.showSuccessMessage = true;
          alert('Gracias por registrarte'); 
          setTimeout(() => {
            this.navigateToHome();
          }, 2000);
        },
        (error: any) => {
          console.error('Error al crear el usuario', error);
          setTimeout(() => {
            this.AlertMessage = false;
          }, 2000);
        }
      );
    } else {
      this.showTermsError = true;
      if (this.formNewUser.hasError('mismatch')) {
        console.error('Las contraseñas no coinciden');
      }
      this.alertMessage = 'Por favor, complete todos los campos correctamente.';
      this.AlertMessage = true; 
      this.showAlert = true;
      setTimeout(() => {
        this.AlertMessage = false;
      }, 2000);
    }
  }

  navigateToHome() {
    this.router.navigate(["/home"]);
  }
}

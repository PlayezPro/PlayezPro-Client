import axios from 'axios';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    constructor() { }

    createUser(newUser: any): Observable<any> {
        const userData = {
            userName: newUser.userName,
            name: newUser.name,
            lastName: newUser.lastName,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
            password: newUser.password,
            repeatPassword: newUser.repeatPassword
        };
        return new Observable(observer => {
            axios.post('https://playezpro-server.onrender.com/auth/signup', userData)
                .then(response => {
                    observer.next(response.data);
                    observer.complete();
                })
                .catch(error => {
                    observer.error({ message: 'Error al crear usuario', error: error });
                });
        });
    }

    loginUser(credentials: any): Observable<any> {
        const loginData = {
          email: credentials.email,
          password: credentials.password,
        };
        return new Observable(observer => {
          axios.post('https://playezpro-server.onrender.com/auth/signin', loginData)
            .then(response => {
              localStorage.setItem('Token', response.data.token); // Guarda el token en localStorage
              observer.next(response.data);
              observer.complete();
            })
            .catch(error => {
              observer.error({ message: 'Error al iniciar sesión', error: error });
            });
        });
      }
      
}
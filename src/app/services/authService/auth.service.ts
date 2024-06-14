import axios from 'axios';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private baseUrl: string = 'https://playezpro-server.onrender.com'; // Production URL
    // private baseUrl: string = 'http://localhost:3000'; // Development URL (Uncomment for local testing)

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
            axios.post(`${this.baseUrl}/auth/signup`, userData)
                .then(response => {
                    observer.next(response.data);
                    observer.complete();
                })
                .catch(error => {
                    const errorMsg = this.handleError(error);
                    observer.error({ message: 'Error al crear usuario', error: errorMsg });
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

    // Helper method to handle errors
    private handleError(error: any): string {
        let errorMsg = 'An unknown error occurred!';
        if (error.response) {
            // Server responded with a status other than 200 range
            errorMsg = error.response.data.message || error.response.statusText;
        } else if (error.request) {
            // Request was made but no response received
            errorMsg = 'No response received from server';
        } else {
            // Something else happened while setting up the request
            errorMsg = error.message;
        }
        return errorMsg;
    }
}

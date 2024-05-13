import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    constructor(private http: HttpClient) { }

    createUser(newUser: any): Observable<any> {
        const userData = {
            username: newUser.username,
            name: newUser.name,
            lastname: newUser.lastname,
            email: newUser.email,
            password: newUser.password,
            repeatPassword: newUser.repeatPassword
        };
        return this.http.post('https://localhost:3000', userData)
    }

    loginUser(credentials: any): Observable<any> {
        const loginData = {
            email: credentials.email,
            password: credentials.password,
        };
        return this.http.post('https://localhost:3000', loginData)


    }

}
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class FollowService {
    private followersUrl: string = 'http://localhost:3000/follow'
    constructor(private http: HttpClient) { }

    getFollowers(userId:string): Observable<string[]> {
        try {

            return this.http.get<string[]>(`${this.followersUrl}/${userId}`)
        } catch (error) {
            console.error('Error al obtener seguidores de:', error);
            throw error;

        }





    }

}
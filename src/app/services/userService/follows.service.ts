import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FollowService {
    private followersUrl: string = 'http://localhost:3000/follow';

    constructor(private http: HttpClient) { }

    // Obtener la lista de seguidores
    getFollowers(userId: string): Observable<string[]> {
        try {
            return this.http.get<string[]>(`${this.followersUrl}/${userId}`);
        } catch (error) {
            console.error('Error al obtener seguidores:', error);
            throw error;
        }
    }

    // Agregar un nuevo seguidor
    addFollower(userId: string, followerId: string): Observable<any> {
        const url = `${this.followersUrl}`;
        const body = { followerId, userId };

        try {
            return this.http.post<any>(url, body, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            });
        } catch (error) {
            console.error('Error al añadir seguidor:', error);
            throw error;
        }
    }
}
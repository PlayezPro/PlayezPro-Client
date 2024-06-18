import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import axios from "axios";

@Injectable({
    providedIn: 'root'
})
export class FollowService {
    private followersUrl: string = 'https://playezpro-server.onrender.com/follow';

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

    async addFollower(userId:any, followerId:any) {
        const url = `${this.followersUrl}`;
        const body = { userfollow: userId, userfollower: followerId };
    
        try {
            const response = await axios.post(url, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al añadir seguidor:', error);
            throw error;
        }
    }

    async checkRelation(followed:string, follower:string): Promise<boolean>{
        try {
            const data = {userfollow:followed, userfollower:follower};
            const response = await axios.post('${this.followersUrl}/relation/',data)
            const isRelation = response.data.inRelation as boolean;
            // console.log('Is relation:', isRelation);
        return isRelation; 
        } catch (error) {
          return false;
        }
    }

    async deleteRelation(followed:string, follower:string) {
        try {
            const data = { userfollow: followed, userfollower: follower };
            const response = await axios.delete('${this.followersUrl}', {
                data: data
            });
            return response.data
        } catch (error) {
            console.error(error);
        }
    }
    
    
}
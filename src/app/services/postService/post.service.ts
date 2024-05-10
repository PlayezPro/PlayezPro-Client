import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  private apiUrl = 'http://localhost:3000/posts'

  constructor(private http: HttpClient) { }

  CreatePost(newPost: any): Observable<any>{
    const PostData = {
      users_id: newPost.users_id,
      file: newPost.file,
      title: newPost.title,
      description: newPost.description,
      category: newPost.category
    }
    return this.http.post(this.apiUrl, PostData)
  }

  getAllPost(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPostById(posts_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${posts_id}`);
  }

  updatePost(posts_id: string, updatePost: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${posts_id}`, updatePost);
  }

  deletePost(posts_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${posts_id}`);
  }

}

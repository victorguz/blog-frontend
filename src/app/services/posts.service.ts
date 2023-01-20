import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BasicResponse } from '../core/interfaces/basic-response.interface';
import { CreatePost, Post, SelectPost } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  findAll(body?: SelectPost) {
    return this.http.get<BasicResponse<Post[]>>(`${environment.API}/posts`, {
      params: body as any,
    });
  }

  create(body?: CreatePost) {
    return this.http.post<BasicResponse<Post[]>>(
      `${environment.API}/posts`,
      body
    );
  }
}

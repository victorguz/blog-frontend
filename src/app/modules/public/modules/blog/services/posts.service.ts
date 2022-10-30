import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { BasicResponse } from '../../../../../core/interfaces/basic-response.interface';
import { RequestsService } from '../../../../../core/services/requests.service';
import { CreatePost, Post, SelectPost } from '../dto/update-post.dto';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private requestsService: RequestsService) {}

  findAll(body?: SelectPost) {
    return this.requestsService.get<BasicResponse<Post[]>>(
      `${environment.API}/posts`,
      body
    );
  }

  create(body?: CreatePost) {
    return this.requestsService.post<BasicResponse<Post[]>>(
      `${environment.API}/posts`,
      body
    );
  }
}

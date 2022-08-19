import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RequestsService } from '../../../core/services/requests.service';
import { PostInterface } from '../../../shared/interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private requestsService: RequestsService) {}

  find(params?: PostInterface) {
    return this.requestsService.get({
      url: `${environment.domain}/posts`,
      params,
    });
  }

  create(params?: PostInterface) {
    return this.requestsService.post({
      url: `${environment.domain}/posts`,
      params,
    });
  }
}

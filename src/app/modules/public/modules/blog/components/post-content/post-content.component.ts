import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isJSON } from 'class-validator';
import { HelpersService } from '../../../../../../core/services/helpers.service';
import { Post } from '../../../../../../interfaces/post.interface';
import { PostsService } from '../../../../../../services/posts.service';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss'],
})
export class PostContentComponent {
  public post!: Post;
  private id!: number;
  constructor(
    private helpers: HelpersService,
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params && params['id']) {
        this.id = params['id'];
        this.findPostById();
      }
    });
  }

  findPostById() {
    this.postsService.findAll({ id: this.id }).subscribe({
      next: (result) => {
        if (result.success && result.data && result.data[0]) {
          this.post = result.data[0];
        }
      },
    });
  }

  get tags() {
    return this.post?.tags && isJSON(this.post.tags)
      ? JSON.parse(this.post.tags)
      : [];
  }

  get content() {
    return this.post?.content || '';
  }
}

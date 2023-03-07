import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OutputData } from '@editorjs/editorjs';
import { isNotEmptyObject } from 'class-validator';
import { EditorJsConfig } from '../../../../../../core/editorjs.config';
import { scrollToElement } from '../../../../../../core/services/functions.service';
import { Post } from '../../../../../../interfaces/post.interface';
import { PostsService } from '../../../../../../services/posts.service';

@Component({
  selector: 'app-post-index',
  templateUrl: './post-index.component.html',
  styleUrls: ['./post-index.component.scss'],
})
export class PostIndexComponent  {

  public post!: Post;
  private id!: number;
  constructor(
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
          this.getFilteredHeaders();
        }
      },
    });
  }
  public filteredHeaders: any[] = [];


  getFilteredHeaders() {
    if (this.post.content && isNotEmptyObject(this.post.content)) {
      this.filteredHeaders = this.post.content.blocks
        .filter((val) => val.type == 'header')
        .map((val) => {
          const data: {
            text: string;
            level: number;
          } = val.data;
          return {
            class: EditorJsConfig.friendlyHeaderName(data.text),
            text: data.text,
          };
        });
    }
  }

  scrollToElementVoid(element: string) {
    scrollToElement('.' + element);
  }
}

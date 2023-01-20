import { Component, OnInit } from '@angular/core';
import { isJSON } from 'class-validator';
import { Post } from '../../../../../../interfaces/post.interface';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss'],
})
export class BlogPostViewComponent implements OnInit {
  public post!: Post;

  constructor() {}

  ngOnInit(): void {}

  get tags() {
    return this.post.tags && isJSON(this.post.tags)
      ? JSON.parse(this.post.tags)
      : [];
  }
}

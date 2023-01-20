import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, SelectPost } from '../../../../../../interfaces/post.interface';
import { PostsService } from '../../../../../../services/posts.service';

@Component({
  selector: 'app-blog-post-overview',
  templateUrl: './blog-post-overview.component.html',
  styleUrls: ['./blog-post-overview.component.scss'],
})
export class BlogPostOverviewComponent implements OnInit {
  private limit = 10;
  private offset = 0;
  public category = '';
  public posts: Post[] = [];

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params && params['category']) {
        this.category = params['category'];
      }
      this.findPosts();
    });
  }

  findPosts(limit: number = 0) {
    const body: SelectPost = {
      category: this.category,
      limit: limit,
      offset: this.offset,
    };
    this.postsService.findAll(body).subscribe({
      next: (result) => {
        if (result.success) {
          this.posts = result.data;
          this.offset += limit ? limit : 0;
        }
      },
      error: (err) => {},
    });
  }
}

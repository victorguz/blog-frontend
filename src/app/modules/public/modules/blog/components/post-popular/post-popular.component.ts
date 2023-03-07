import { Component } from '@angular/core';
import { Post, SelectPost } from '../../../../../../interfaces/post.interface';
import { PostsService } from '../../../../../../services/posts.service';

@Component({
  selector: 'app-post-popular',
  templateUrl: './post-popular.component.html',
  styleUrls: ['./post-popular.component.scss'],
})
export class PostPopularComponent {
  public filteredHeaders: any[] = [];
  public posts: Post[] = [];

  constructor(private postsService: PostsService) {
    this.findPosts();
  }

  findPosts() {
    const body: SelectPost = {
      category: '',
      limit: 4,
      offset: 0,
    };
    this.postsService.findAll(body).subscribe({
      next: (result) => {
        if (result.success) {
          this.posts = result.data || [];
        }
      },
      error: (err) => {},
    });
  }
}

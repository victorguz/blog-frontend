import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, SelectPost } from '../../dto/update-post.dto';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-blog-post-overview',
  templateUrl: './blog-post-overview.component.html',
  styleUrls: ['./blog-post-overview.component.scss'],
})
export class BlogPostOverviewComponent implements OnInit {
  private limit = 10;
  private offset = 0;
  private category = '';
  public posts: Post[] = [
    {
      name: 'Web site design: landing page home page ui',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel porta arcu ac lorem tellus netus. Eget ridiculus diam nunc facilisi egestas aliquet magnis urna. Elit turpis scelerisque mattis turpis aliquam ultricies nunc...',
      id: 1,
      tags: '["frontend"]',
      image: 'assets/images/png/post-example.png',
    },
    {
      name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione est exercitationem ex sit corrupti in impedit enim tenetur deserunt consequuntur explicabo obcaecati laboriosam, facilis dolor et temporibus consequatur, beatae voluptas.',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione est exercitationem ex sit corrupti in impedit enim tenetur deserunt consequuntur explicabo obcaecati laboriosam, facilis dolor et temporibus consequatur, beatae voluptas.',
      id: 2,
      tags: '["frontend"]',
      image: 'assets/images/png/post-example.png',
    },
  ];

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

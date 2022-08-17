import { Component, OnInit } from '@angular/core';
import { PostInterface } from '../../../../interfaces/post';

@Component({
  selector: 'app-blog-post-overview',
  templateUrl: './blog-post-overview.component.html',
  styleUrls: ['./blog-post-overview.component.scss'],
})
export class BlogPostOverviewComponent implements OnInit {
  public posts: PostInterface[] = [
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

  constructor() {
  "".substring}

  ngOnInit(): void {}
}

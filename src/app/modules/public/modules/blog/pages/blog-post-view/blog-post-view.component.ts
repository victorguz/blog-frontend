import { Component, OnInit } from '@angular/core';
import { isJSON } from 'class-validator';
import { Post } from '../../dto/update-post.dto';

@Component({
  selector: 'app-blog-post-view',
  templateUrl: './blog-post-view.component.html',
  styleUrls: ['./blog-post-view.component.scss'],
})
export class BlogPostViewComponent implements OnInit {
  public post: Post = {
    name: 'Web site design: landing page home page ui',
    description: `<p>Apple today named eight app and game developers receiving an Apple Design Award, each one
                                selected for being thoughtful and creative. Apple Design Award winners bring distinctive
                                new ideas to life and demonstrate deep mastery of Apple technology. The apps spring up
                                from developers large and small, in every part of the world, and provide users with new
                                ways of working, creating, and playing.</p>
                            <p>“Every year, app and game developers demonstrate exceptional craftsmanship and we’re
                                honoring the best of the best,” said Ron Okamoto, Apple’s vice president of Worldwide
                                Developer Relations. “Receiving an Apple Design Award is a special and laudable
                                accomplishment. Past honorees have made some of the most noteworthy apps and games of
                                all time. Through their vision, determination, and exacting standards, the winning
                                developers inspire not only their peers in the Apple developer community, but all of us
                                at Apple, too.”</p>
                            <h2>Apple Design Award Winners: Apps</h2>
                            <p> Apple today named eight app and game developers receiving an Apple Design Award, each
                                one selected for being thoughtful and creative. Apple Design Award winners bring
                                distinctive new ideas to life and demonstrate deep mastery of Apple technology. The apps
                                spring up from developers large and small, in every part of the world, and provide users
                                with new ways of working, creating, and playing.</p>
                            <p>“Every year, app and game developers demonstrate exceptional craftsmanship and we’re
                                honoring the best of the best,” said Ron Okamoto, Apple’s vice president of Worldwide
                                Developer Relations. “Receiving an Apple Design Award is a special and laudable
                                accomplishment. Past honorees have made some of the most noteworthy apps and games of
                                all time. Through their vision, determination, and exacting standards, the winning
                                developers inspire not only their peers in the Apple developer community, but all of us
                                at Apple, too.”</p>
                            <blockquote>
                                <p>“Most of us felt like we could trust each other to be quarantined together, so we
                                    didn’t need to wear masks or stay far apart.”</p>
                            </blockquote>
                            <figure class="wp-block-image">
                                <img src="assets/images/post-single/post-single-03.jpg" alt="Post Images">
                                <figcaption>The Apple Design Award trophy, created by the Apple Design team, is a symbol
                                    of achievement and excellence.</figcaption>
                            </figure>
                            <h2>Apple Design Award Winners: Apps</h2>
                            <p><a href="#">Apple today named</a> eight app and game developers receiving an Apple Design
                                Award, each one selected for being thoughtful and creative. Apple Design Award winners
                                bring distinctive new ideas to life and demonstrate deep mastery of Apple technology.
                                The apps spring up from developers large and small, in every part of the world, and
                                provide users with new ways of working, creating, and playing.</p>
                            <p>“Every year, app and game developers demonstrate exceptional craftsmanship and we’re
                                honoring the best of the best,” said Ron Okamoto, Apple’s vice president of Worldwide
                                Developer Relations. “Receiving an Apple Design Award is a special and laudable
                                accomplishment. Past honorees have made some of the most noteworthy apps and games of
                                all time. Through their vision, determination, and exacting standards, the winning
                                developers inspire not only their peers in the Apple developer community, but all of us
                                at Apple, too.”</p>

                            <figure class="wp-block-image">
                                <img src="assets/images/post-single/post-single-04.jpg" alt="Post Images">
                                <figcaption>The Apple Design Award trophy, created by the Apple Design team, is a symbol
                                    of achievement and excellence.</figcaption>
                            </figure>
                            <h3>Apple Design Award Winners: Apps </h3>
                            <p> <a href="#">Apple today named</a> eight app and game developers receiving an Apple
                                Design Award, each one selected for being thoughtful and creative. Apple Design Award
                                winners bring distinctive new ideas to life and demonstrate deep mastery of Apple
                                technology. The apps spring up from developers large and small, in every part of the
                                world, and provide users with new ways of working, creating, and playing.</p>
                            <p>“Every year, app and game developers demonstrate exceptional craftsmanship and we’re
                                honoring the best of the best,” said Ron Okamoto, Apple’s vice president of Worldwide
                                Developer Relations. “Receiving an Apple Design Award is a special and laudable
                                accomplishment. Past honorees have made some of the most noteworthy apps and games of
                                all time. Through their vision, determination, and exacting standards, the winning
                                developers inspire not only their peers in the Apple developer community, but all of us
                                at Apple, too.” </p>
                            <p>More than 250 developers have been recognized with Apple Design Awards
                                over the past 20 years. The recognition has proven to be an accelerant for developers
                                who are pioneering innovative designs within their individual apps and influencing
                                entire categories. Previous winners such as Pixelmator, djay, Complete Anatomy,
                                HomeCourt, “Florence,” and “Crossy Road” have set the standard in areas such as
                                storytelling, interface design, and use of Apple tools and technologies.</p>
                            <p>For more information on the apps and games, visit the <a href="#">App Store</a>.</p>
`,
    id: 1,
    tags: '["development","hola","chao","etiqueta","de","ejemplo"]',
    image: 'assets/images/png/post-example.png',
    created_date: new Date(),
    modified_date: new Date(),
  };

  constructor() {}

  ngOnInit(): void {}

  get tags() {
    return this.post.tags && isJSON(this.post.tags)
      ? JSON.parse(this.post.tags)
      : [];
  }
}

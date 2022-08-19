import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';
import { BlogPostOverviewComponent } from './components/layout/blog-post-overview/blog-post-overview.component';
import { SharedModule } from '../../shared/shared.module';
import { BlogNavbarComponent } from './components/layout/blog-navbar/blog-navbar.component';
import { BlogCategoriesComponent } from './components/layout/blog-categories/blog-categories.component';
import { BlogFooterComponent } from './components/layout/blog-footer/blog-footer.component';
import { BlogComponent } from './components/layout/blog/blog.component';
import { BlogPostViewComponent } from './components/blog-post-view/blog-post-view.component';

@NgModule({
  declarations: [
    BlogHomeComponent,
    BlogNavbarComponent,
    BlogCategoriesComponent,
    BlogPostOverviewComponent,
    BlogFooterComponent,
    BlogComponent,
    BlogPostViewComponent,
  ],
  imports: [CommonModule, BlogRoutingModule, SharedModule],
})
export class BlogModule {}

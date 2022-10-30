import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogHomeComponent } from './pages/blog-home/blog-home.component';
import { BlogNavbarComponent } from './layout/blog-navbar/blog-navbar.component';
import { BlogCategoriesComponent } from './layout/blog-categories/blog-categories.component';
import { BlogPostOverviewComponent } from './layout/blog-post-overview/blog-post-overview.component';
import { BlogFooterComponent } from './layout/blog-footer/blog-footer.component';
import { BlogComponent } from './layout/blog/blog.component';
import { BlogPostViewComponent } from './pages/blog-post-view/blog-post-view.component';
import { SharedModule } from '../../../shared/shared.module';
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

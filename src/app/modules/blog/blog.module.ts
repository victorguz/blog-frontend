import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';
import { BlogNavbarComponent } from './components/blog-navbar/blog-navbar.component';
import { BlogCategoriesComponent } from './components/blog-categories/blog-categories.component';
import { BlogPostOverviewComponent } from './components/blog-post-overview/blog-post-overview.component';
import { BlogFooterComponent } from './components/blog-footer/blog-footer.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    BlogHomeComponent,
    BlogNavbarComponent,
    BlogCategoriesComponent,
    BlogPostOverviewComponent,
    BlogFooterComponent,
  ],
  imports: [CommonModule, BlogRoutingModule, SharedModule],
})
export class BlogModule {}

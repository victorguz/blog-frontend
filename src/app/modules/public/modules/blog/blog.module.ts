import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogHomeComponent } from './pages/blog-home/blog-home.component';
import { BlogCategoriesComponent } from './components/blog-categories/blog-categories.component';
import { BlogPostOverviewComponent } from './components/blog-post-overview/blog-post-overview.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogPostViewComponent } from './pages/post-view/post-view.component';
import { SharedModule } from '../../../shared/shared.module';
import { BlogAutorComponent } from './components/blog-autor/blog-autor.component';
import { BlogContentComponent } from './components/blog-content/blog-content.component';

@NgModule({
  declarations: [
    BlogComponent,
    BlogHomeComponent,
    BlogCategoriesComponent,
    BlogPostOverviewComponent,
    BlogPostViewComponent,
    BlogAutorComponent,
    BlogContentComponent,
  ],
  imports: [CommonModule, BlogRoutingModule, SharedModule],
})
export class BlogModule {}

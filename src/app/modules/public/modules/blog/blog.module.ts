import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogHomeComponent } from './pages/blog-home/blog-home.component';
import { BlogCategoriesComponent } from './components/blog-categories/blog-categories.component';
import { BlogPostOverviewComponent } from './components/blog-post-overview/blog-post-overview.component';
import { SharedModule } from '../../../shared/shared.module';
import { BlogPostViewComponent } from './pages/post-view/post-view.component';
import { BlogAutorComponent } from './components/blog-autor/blog-autor.component';
import { PostIndexComponent } from './components/post-index/post-index.component';
import { PostPopularComponent } from './components/post-popular/post-popular.component';
import { PostContentComponent } from './components/post-content/post-content.component';

@NgModule({
  declarations: [
    BlogHomeComponent,
    BlogCategoriesComponent,
    BlogPostOverviewComponent,
    BlogPostViewComponent,
    BlogAutorComponent,
    PostIndexComponent,
    PostPopularComponent,
    PostContentComponent,
  ],
  imports: [CommonModule, BlogRoutingModule, SharedModule],
})
export class BlogModule {}

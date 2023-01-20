import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogHomeComponent } from './pages/blog-home/blog-home.component';
import { BlogPostViewComponent } from './pages/post-view/post-view.component';

const routes: Routes = [
  { path: 'home', component: BlogHomeComponent, data: { title: 'Blog' } },
  {
    path: 'category/:category',
    component: BlogHomeComponent,
    data: { title: 'blog' },
  },
  {
    path: 'post/:id',
    component: BlogPostViewComponent,
    data: { title: 'Blog' },
  },
  { path: '**', pathMatch: 'prefix', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPostViewComponent } from '../public/modules/blog/pages/post-view/post-view.component';
import { CreatePostComponent } from './create-post/create-post.component';

const routes: Routes = [
  { path: 'post/new', component: CreatePostComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}

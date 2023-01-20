import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPostViewComponent } from '../public/modules/blog/pages/post-view/post-view.component';

const routes: Routes = [
  { path: 'post', component: BlogPostViewComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';

const routes: Routes = [
  { path: 'home', component: BlogHomeComponent, data: { title: 'Blog' } },
  {
    path: 'category/:category',
    component: BlogHomeComponent,
    data: { title: 'blog' },
  },
  { path: 'profile', component: BlogHomeComponent, data: { title: 'Blog' } },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}

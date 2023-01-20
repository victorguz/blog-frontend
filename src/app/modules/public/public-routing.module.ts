import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './modules/blog/components/blog/blog.component';

const routes: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    loadChildren: () =>
      import('./modules/blog/blog.module').then((m) => m.BlogModule),
  },

  { path: '**', redirectTo: 'blog', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}

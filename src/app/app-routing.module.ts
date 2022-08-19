import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './modules/blog/components/layout/blog/blog.component';
import { PrivateComponent } from './modules/private/components/layout/private/private.component';

const routes: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    loadChildren: () =>
      import('./modules/blog/blog.module').then((m) => m.BlogModule),
  },
  { path: 'profile', pathMatch: 'prefix', redirectTo: 'blog' },
  {
    path: 'private',
    component: PrivateComponent,
    loadChildren: () =>
      import('./modules/private/private.module').then((m) => m.PrivateModule),
  },
  { path: '**', pathMatch: 'prefix', redirectTo: 'not-found' },
  { path: '', pathMatch: 'prefix', redirectTo: 'blog' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

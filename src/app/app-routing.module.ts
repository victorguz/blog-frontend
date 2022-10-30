import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { PrivateComponent } from './modules/private/components/private/private.component';
import { PublicComponent } from './modules/public/components/public/public.component';

const routes: Routes = [
  {
    path: 'private',
    component: PrivateComponent,
    loadChildren: () =>
      import('./modules/private/private.module').then((m) => m.PrivateModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'public',
    component: PublicComponent,
    loadChildren: () =>
      import('./modules/public/public.module').then((m) => m.PublicModule),
  },
  { path: '**', redirectTo: 'public', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

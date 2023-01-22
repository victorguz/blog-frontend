import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageConfigurationGuard } from '../../core/auth/page-configuration.guard';
import { CreatePostComponent } from './pages/create-post/create-post.component';

const routes: Routes = [
  {
    path: 'post/new',
    component: CreatePostComponent,
    data: { title: 'Nuevo post' },
    canActivate: [PageConfigurationGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}

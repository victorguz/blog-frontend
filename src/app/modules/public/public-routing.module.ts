import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MercadoPagoFormComponent } from '../shared/components/payments/mercado-pago-form/mercado-pago-form.component';
import { PaymentFormComponent } from '../shared/components/payments/payment-form/payment-form.component';
import { BlogComponent } from './modules/blog/layout/blog/blog.component';

const routes: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    loadChildren: () =>
      import('./modules/blog/blog.module').then((m) => m.BlogModule),
  },

  { path: '' },
  { path: '**', redirectTo: 'blog', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}

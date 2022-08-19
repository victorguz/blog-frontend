import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';

import { PrivateNavbarComponent } from './components/layout/private-navbar/private-navbar.component';
import { PrivateFooterComponent } from './components/layout/private-footer/private-footer.component';
import { PrivateComponent } from './components/layout/private/private.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    PrivateComponent,
    PrivateNavbarComponent,
    PrivateFooterComponent,
  ],
  imports: [CommonModule, PrivateRoutingModule, SharedModule],
})
export class PrivateModule {}

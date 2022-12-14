import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './components/private/private.component';
import { SharedModule } from '../shared/shared.module';
import { PrivateNavbarComponent } from './components/private-navbar/private-navbar.component';
import { PrivateSidebarComponent } from './components/private-sidebar/private-sidebar.component';

@NgModule({
  declarations: [
    PrivateComponent,
    PrivateNavbarComponent,
    PrivateSidebarComponent,
  ],
  imports: [CommonModule, PrivateRoutingModule, SharedModule],
})
export class PrivateModule {}

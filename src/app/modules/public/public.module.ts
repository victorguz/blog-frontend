import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './components/public/public.component';
import { SharedModule } from '../shared/shared.module';
import { PostsService } from '../../services/posts.service';

@NgModule({
  declarations: [PublicComponent],
  imports: [CommonModule, PublicRoutingModule, SharedModule],
  providers: [PostsService],
})
export class PublicModule {}

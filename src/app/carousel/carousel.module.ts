import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselComponent} from './carousel.component';
import {PavTemplateModule} from '../template';

@NgModule({
  imports: [
    CommonModule,
    PavTemplateModule
  ],
  exports: [
    CarouselComponent,
    PavTemplateModule
  ],
  declarations: [
    CarouselComponent
  ],
  providers: []
})
export class CarouselModule {}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardsComponent} from './cards.component';
import {PavTemplateModule} from '../template';

@NgModule({
  imports: [
    CommonModule,
    PavTemplateModule
  ],
  exports: [
    CardsComponent,
    PavTemplateModule
  ],
  declarations: [
    CardsComponent
  ],
  providers: []
})
export class CardsModule {}

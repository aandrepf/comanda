import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { CardSelectComponent } from './card-select/card-select.component';

@NgModule({
  imports: [
    CommonModule,
    CardRoutingModule
  ],
  declarations: [CardSelectComponent]
})
export class CardModule { }

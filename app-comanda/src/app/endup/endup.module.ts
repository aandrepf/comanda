import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EndupRoutingModule } from './endup-routing.module';
import { SuccessComponent } from './success/success.component';

@NgModule({
  imports: [
    CommonModule,
    EndupRoutingModule
  ],
  declarations: [SuccessComponent]
})
export class EndupModule { }

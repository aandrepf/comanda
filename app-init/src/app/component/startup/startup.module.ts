import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { StartupComponent } from './startup.component';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  declarations: [
    StartupComponent
  ],
  exports: [
    StartupComponent
  ]
})
export class StartupModule { }

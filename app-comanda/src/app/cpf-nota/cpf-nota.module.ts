import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CpfNotaRoutingModule } from './cpf-nota-routing.module';
import { CpfBaseComponent } from './cpf-base/cpf-base.component';
import { CpfInputComponent } from './cpf-input/cpf-input.component';
import { FocusDirective } from './cpf-input/auto-focus.directive';
import { NumPadComponent } from './cpf-input/numpad/numpad';

@NgModule({
  imports: [
    CommonModule,
    CpfNotaRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CpfBaseComponent, CpfInputComponent, NumPadComponent, FocusDirective],
  exports: [CpfInputComponent]
})
export class CpfNotaModule {}

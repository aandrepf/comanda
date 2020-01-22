import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CpfNotaRoutingModule } from './cpf-nota-routing.module';
import { CpfBaseComponent } from './cpf-base/cpf-base.component';
import { CpfInputComponent } from './cpf-input/cpf-input.component';
import { FocusDirective } from './cpf-input/auto-focus.directive';
import { NumPadComponent } from './cpf-input/numpad/numpad';
import { CpfComandaIndisponivelComponent } from './cpf-comanda-indisponivel/cpf-comanda-indisponivel.component';

@NgModule({
  imports: [
    CommonModule,
    CpfNotaRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CpfBaseComponent, CpfInputComponent, NumPadComponent, FocusDirective, CpfComandaIndisponivelComponent],
  exports: [CpfInputComponent]
})
export class CpfNotaModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CpfInputComponent } from './cpf-input/cpf-input.component';

import { CpfBaseComponent } from './cpf-base/cpf-base.component';
import { CpfComandaIndisponivelComponent } from './cpf-comanda-indisponivel/cpf-comanda-indisponivel.component';

const routes: Routes = [
  { path: '', component: CpfBaseComponent},
  { path: 'incluir', component: CpfInputComponent},
  { path: 'locked', component: CpfComandaIndisponivelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CpfNotaRoutingModule { }

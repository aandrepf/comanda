import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CpfInputComponent } from './cpf-input/cpf-input.component';

import { CpfBaseComponent } from './cpf-base/cpf-base.component';

const routes: Routes = [
  { path: '', component: CpfBaseComponent},
  { path: 'incluir', component: CpfInputComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CpfNotaRoutingModule { }

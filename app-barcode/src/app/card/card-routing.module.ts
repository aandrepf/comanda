import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardSelectComponent } from './card-select/card-select.component';

const routes: Routes = [
  { path: '', component: CardSelectComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule { }

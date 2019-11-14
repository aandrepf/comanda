import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VersionComponent } from './version/version.component';
import { ConnectionComponent } from './connection/connection.component';
import { OperationalComponent } from './operational/operational.component';

const routes: Routes = [
  { path: '', component: VersionComponent },
  { path: 'connect', component: ConnectionComponent},
  { path: 'operational', component: OperationalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartupRoutingModule {}

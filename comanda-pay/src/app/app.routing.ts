import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartupComponent } from './component/startup/startup.component';
import { ConnectionComponent } from './component/connection/connection.component';
import { OperationalComponent } from './component/operational/operational.component';

const appRoutes: Routes = [
  { path: 'startup', component: StartupComponent },
  { path: 'connection', component: ConnectionComponent },
  { path: 'operational', component: OperationalComponent },
  { path: '', redirectTo: 'startup', pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { StartupRoutingModule } from './startup-routing.module';

import { VersionComponent } from './version/version.component';
import { ConnectionComponent } from './connection/connection.component';
import { OperationalComponent } from './operational/operational.component';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    StartupRoutingModule
  ],
  declarations: [VersionComponent, ConnectionComponent, OperationalComponent]
})
export class StartupModule {}

import { Component, HostListener } from '@angular/core';
import { StartupService } from './shared/startup.service';
import { Return } from './shared/startup';
import { UserIdleService } from 'angular-user-idle';
import { RoutingState } from './routingState.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sequencia = '';
  resetSequencia;

  constructor(private _startup: StartupService, private _userIdle: UserIdleService, private routingState: RoutingState) {
    console.log('VERSÃO BARCODE', '1.0.3');
    this.routingState.loadRouting();
  }

  @HostListener('window:click') windowClick(): void { this._userIdle.resetTimer(); }

  adminAccess(code: string) {
    this.sequencia += code;
    window.clearTimeout(this.resetSequencia);
    console.log('codigo: ', this.sequencia, '\ntamanho:', this.sequencia.length);
    switch (this.sequencia) {
      case 'B1B2B2B1':
        this.admin();
        break;
      case 'B2B2B2B1':
        this.shutdown();
        break;
      case 'B2B2B1B1':
        this.reboot();
        break;
      case 'B1B1B1B2' :
        this.initApp();
        break;
      default:
        if (this.sequencia.length > 6) {
          this.sequencia = '';
          console.log(':::ZERANDO SEQUENCIA:::');
        }
        if (this.sequencia.length < 8) {
          this.resetSequencia = setTimeout(() => {
            console.log(':::RESETANDO SEQUENCIA:::');
            this.sequencia = '';
          }, 2000);
        }
        break;
    }
  }

  initApp() {
    console.log(':::REINICIANDO APLICAÇÃO:::');
    this._startup.getInitApp();
  }

  admin() {
    console.log(':::DIRECIONANDO PARA A ADMINISTRAÇÃO:::');
    this._startup.getAdminSitef();
  }

  shutdown() {
    console.log(':::DESLIGANDO SISTEMA:::');
    this._startup.getShutDown().subscribe(
      (data: Return) => {
        console.log('desligando', data);
      }
    );
  }

  reboot() {
    console.log(':::REINICIANDO SISTEMA:::');
    this._startup.getRestart().subscribe(
      (data: Return) => {
        console.log('reiniciando', data);
      }
    );
  }
}

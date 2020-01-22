import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EMPTY, interval, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StartupService } from 'src/app/services/startup.service';
import { Global } from 'src/app/shared/global';
import { Connection, Return } from 'src/app/models/general.model';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit, OnDestroy {
  private subTimer = new Subscription();
  private sub = new Subscription();

  nome = 'Componente version';
  waitMessage = 'iniciando';

  constructor(private spinner: NgxSpinnerService, private statupService: StartupService, private router: Router) {
    Global.CONNECTION = new Connection('', '', null);
    console.log('connect ==> versao', Global.CONNECTION);
    document.querySelector('body').classList.remove('system-ok', 'system-error', 'system-alert', 'barcode-back');
  }

  ngOnInit() {
    this.spinner.show();
    this.subTimer = interval(1 * 1000).subscribe(
      t => {
        const unlock = JSON.parse(localStorage.getItem('lockInfo'));
        console.log('tem que destravar?', unlock);
        if (unlock) {
          this.waitMessage = `destravando a comanda nº ${unlock.comanda}`;
          this.sub.add(this.statupService.unlockComanda(unlock)
          .pipe(
            tap(),
            catchError(error => {
              return EMPTY;
            })
          )
          .subscribe(
            (v: Return) => {
              localStorage.removeItem('lockInfo');
              setTimeout(() => {
                this.verifyVersion();
              }, 1500);
            }
          ));
        } else {
          this.verifyVersion();
        }
      }
    );
  }

  verifyVersion() {
    this.waitMessage = 'carregando...';
    this.sub.add(this.statupService.getVersion()
    .pipe(
      tap(),
      catchError(error => {
        return EMPTY;
      })
    )
    .subscribe(
      (v: Return) => {
        Global.CONNECTION.version = v.ret.version;
        this.subTimer.unsubscribe();
        this.router.navigate(['connection']);
      }
    ));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

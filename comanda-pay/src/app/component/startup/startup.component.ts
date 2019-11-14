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
  waitMessage = 'carregando...';

  constructor(private spinner: NgxSpinnerService, private statupService: StartupService, private router: Router) {
    Global.CONNECTION = new Connection('', '', null);
    console.log('connect ==> versao', Global.CONNECTION);
    document.querySelector('body').classList.remove('system-ok', 'system-error', 'system-alert', 'barcode-back');
  }

  ngOnInit() {
    this.spinner.show();
    this.subTimer = interval(1 * 1000).subscribe(
      t => {
        this.verifyVersion();
      }
    );
  }

  verifyVersion() {
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

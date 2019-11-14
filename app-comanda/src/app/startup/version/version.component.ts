import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EMPTY, interval, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { StartupService } from './../startup.service';
import { Return } from './../startup';
import { Global } from 'src/app/global';
import { Connection } from 'src/app/models/flow';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit, OnDestroy {
  private subTimer = new Subscription();
  private sub = new Subscription();

  nome = 'Componente version';
  waitMessage = 'carregando...';

  constructor(private spinner: NgxSpinnerService, private statupService: StartupService, private router: Router,
    private route: ActivatedRoute) {
    Global.CONNECTION = new Connection('', '', null);
    console.log('connect ==> versao', Global.CONNECTION);
    document.querySelector('body').classList.remove('system-ok', 'system-error', 'system-alert', 'barcode-back');
  }

  ngOnInit() {
    this.spinner.show();
    this.subTimer = interval(5 * 1000).subscribe(
      t => {
        this.verifyVersion();
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
        this.onVersion();
      }
    ));
  }

  verifyConnection() {
    this.waitMessage = 'realizando conexão!';
    this.subTimer.add(interval(1 * 1000).subscribe(
    t => {
      this.sub.add(this.statupService.getConnect()
      .pipe(
        tap(),
        catchError(error => {
          return EMPTY;
        })
      )
      .subscribe(
        (c: Return) => {
          Global.CONNECTION.conected = c.ret.str;
          this.waitMessage = 'conectado!';
          this.subTimer.unsubscribe();
        }
      ));
    }));
  }

  onVersion() {
    this.router.navigate(['connect']);
  }
}

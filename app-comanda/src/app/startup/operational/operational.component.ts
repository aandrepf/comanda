import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EMPTY, interval, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { StartupService } from './../startup.service';
import { Return, RetOperational } from './../startup';
import { Global } from 'src/app/global';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-operational',
  templateUrl: './operational.component.html',
  styleUrls: ['./operational.component.css']
})
export class OperationalComponent implements OnInit, OnDestroy {
  private subTimer = new Subscription();
  private sub = new Subscription();

  nome = 'Componente operational';
  waitMessage = 'verificando se operacional!';
  isOperational = true;

  constructor(private spinner: NgxSpinnerService, private statupService: StartupService, private router: Router,
    private route: ActivatedRoute) {
    console.log('connect ==> operacional', Global.CONNECTION);
    if (!Global.CONNECTION) { this.router.navigate(['/']); }
  }

  ngOnInit() {
    this.spinner.show();
    this.verifyIsOperational();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  verifyIsOperational() {
    this.subTimer.add(interval(1 * 1000).subscribe(
    t => {
      this.sub.add(this.statupService.getIsOperational()
      .pipe(
        tap(),
        catchError(error => {
          return EMPTY;
        })
      )
      .subscribe(
        (c: RetOperational) => {
          const body$ = document.querySelector('body');
          Global.CONNECTION.isOperational = c.ret;
          this.isOperational = c.ret;
          this.spinner.hide();
          if (c.ret) {
            this.onOperational();
          } else {
            body$.classList.add('system-alert');
            this.waitMessage = 'equipamento temporariamente inoperante!';
          }
          this.subTimer.unsubscribe();
        }
      ));
    }));
  }

  onOperational() {
    localStorage.setItem('conections', JSON.stringify(Global.CONNECTION));
    const url = 'http://localhost:5000/app/#/sitef-pendtrans';
    window.location.href = url;
  }

}

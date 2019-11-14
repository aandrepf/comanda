import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EMPTY, interval, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { StartupService } from './../startup.service';
import { Return } from './../startup';
import { Global } from 'src/app/global';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit, OnDestroy {

  private subTimer = new Subscription();
  private sub = new Subscription();

  nome = 'Componente connection';
  waitMessage = 'realizando conexão!';

  constructor(private spinner: NgxSpinnerService, private statupService: StartupService, private router: Router,
    private route: ActivatedRoute) {
    console.log('connect ==> connection', Global.CONNECTION);
    if (!Global.CONNECTION) { this.router.navigate(['/']); }
  }

  ngOnInit() {
    this.spinner.show();
    this.verifyConnection();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  verifyConnection() {
    this.subTimer.add(interval(1 * 1000).subscribe(
    t => {
      this.sub.add(this.statupService.getConnect()
      .pipe(
        tap(),
        catchError(error => {
          this.waitMessage = 'sem conexão com a rede. tentando novamente...';
          return EMPTY;
        })
      )
      .subscribe(
        (c: Return) => {
          Global.CONNECTION.conected = c.ret.str;
          this.waitMessage = 'conectado!';
          this.subTimer.unsubscribe();
          this.onConnected();
        }
      ));
    }));
  }

  onConnected() {
    setTimeout(() => {
      this.router.navigate(['operational']);
    }, 200);
  }

}

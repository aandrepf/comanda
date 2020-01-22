import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserIdleService } from 'angular-user-idle';

@Injectable()
export class RoutingState {
  private history = [];

  constructor(private router: Router, private _userIdle: UserIdleService) {}

  public loadRouting(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(({urlAfterRedirects}: NavigationEnd) => {
      this.history = [...this.history, urlAfterRedirects];
    });
  }

  public getHistory(): string[] {
    // this.verifyIdleUser();
    return this.history;
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '/barcode';
  }

  public clearHistory(): string[] {
    return this.history = [];
  }

  verifyIdleUser(): void {
    const deslocation = this.history[this.history.length - 1];
    console.log('deslocation', deslocation);
    this._userIdle.stopWatching();
    this._userIdle.stopTimer();
    if (deslocation !== '/barcode') {
      this._userIdle.startWatching();
      this._userIdle.onTimerStart().subscribe(count => count == null ? console.log('não estou Idle') : console.log('contando ', count));
      this._userIdle.onTimeout().subscribe(() => {
        this.router.navigate(['/barcode']);
      });
    } else {
      this._userIdle.stopWatching();
      this._userIdle.stopTimer();
    }
  }
}

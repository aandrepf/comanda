import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from './services/global.service';
import { Subscription } from 'rxjs';
import { AppService } from './services/app.service';
import { UserIdleService } from 'angular-user-idle';
import { Router } from '@angular/router';
import { Global } from './shared/global';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    title = 'app-survey-v1';

    private _inscricao: Subscription;

    public isOperacional = true;
    public urls: any;

    constructor(
        private _global: GlobalService,
        private _appService: AppService,
        private _router: Router,
        private _userIdle: UserIdleService) {
        this.configUrls();
    }

    ngOnInit() {
        setTimeout(() => {
            this.handleIsAppOperacional();
            this.handleIdle();
        }, 1500);
    }

    ngOnDestroy() {
        this._inscricao.unsubscribe();
    }

    configUrls() {
        this._inscricao = this._global.getUrls().subscribe(
            data => {
                this.urls = data[0];
                sessionStorage.setItem('urls', JSON.stringify(this.urls));
            },
            err => console.error(err), () => console.log('carregou as urls')
        );
    }

    handleIdle() {
        this._userIdle.startWatching();
        this._userIdle.onTimerStart().subscribe(count => console.log(count));
        this._userIdle.onTimeout().subscribe(() => {
            if (Global.IS_ANY_QUESTION_ANSWER) {
                Global.IS_ANY_QUESTION_ANSWER = false;
                this._router.navigate([`/survey-idle`]);
            }
            this._userIdle.resetTimer();
        });
    }

    handleIsAppOperacional() {
        this._appService.isOperacional().subscribe((data: any) => {
            this.isOperacional = data.ret;
        }, error => {
            console.log(`backend not online - ${error}`);
            setTimeout(() => this.handleIsAppOperacional(), 5 * 1000);
        });
    }

}

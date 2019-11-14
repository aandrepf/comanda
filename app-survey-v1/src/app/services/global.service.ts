import { IConfig } from './../models/config.model';
import { Injectable } from '@angular/core';
import { Global } from '../shared/global';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GlobalService {

  public appConfig: IConfig;

  constructor(private _http: HttpClient) {
    setTimeout(() => {
      this.appConfig = JSON.parse(sessionStorage.getItem('urls'));
      console.log('URL', this.appConfig);
    }, 500);
  }

  getUrls() {
    return this._http.get(Global.CONFIG);
  }

}

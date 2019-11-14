import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Global } from '../shared/global';

@Injectable()
export class AppService {

  private _url: string;

  constructor(private _global: GlobalService, private _http: HttpClient) { }

  isOperacional() {
    this._url = this._global.appConfig.urlServer + Global.TOTEM_OPERACTIONAL;
    return this._http.get(this._url);
  }

}

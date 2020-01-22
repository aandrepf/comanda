import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Return, RetOperational } from './startup';
import { Global } from '../global';
import { IpcCom } from '../models/flow';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  private readonly API: string;
  private readonly APP_URL: string;
  private readonly MEA_URL: string;
  private readonly TOTEM_URL: string;
  retorno: IpcCom;

  constructor(private http: HttpClient) {
    /* console.log('rodando electron?', this._electron.isElectronApp);
    Global.IPC = new IpcCom();
    if (this._electron.isElectronApp) {
      this.retorno = this._electron.ipcRenderer.sendSync('com', { 'evt': 'startup' });
      Global.IPC.endpoint = this.retorno.endpoint;
      Global.IPC.protocol = this.retorno.ssl ? 'https' : 'http';
      console.log('retorno electron', this.retorno);
    } else {
      Global.IPC.endpoint = 'localhost';
      Global.IPC.protocol = 'http';
    } */
    Global.IPC = new IpcCom();
    Global.IPC.endpoint = 'localhost';
    Global.IPC.protocol = 'http';

    this.API = `${Global.IPC.protocol}://${Global.IPC.endpoint}:5000/api`;
    this.APP_URL = `${this.API}/app`;
    this.MEA_URL = `${this.API}/mea`;
    this.TOTEM_URL = `${this.API}/app/totem`;
  }

  getVersion() {
    return this.http.get<Return>(`${this.APP_URL}/version`);
  }

  getConnect() {
    return this.http.get<Return>(`${this.MEA_URL}/so/win/network/connect`);
  }

  getIsOperational() {
    return this.http.get<RetOperational>(`${this.TOTEM_URL}/operacional`);
  }

  getStatus() {
    return this.http.get(`${this.MEA_URL}/so/win/network/status`);
  }

  getAdminSitef() {
    const url = `${Global.IPC.protocol}://${Global.IPC.endpoint}:5000/app/#/sitef-sale?type=110`;
    window.location.href = url;
  }

  getShutDown() {
    return this.http.get<Return>(`${this.MEA_URL}/so/win/shutdown`);
  }

  getRestart() {
    return this.http.get<Return>(`${this.MEA_URL}/so/win/restart`);
  }

  getInitApp() {
    const url = `${Global.IPC.protocol}://${Global.IPC.endpoint}:5000/init`;
    window.location.href = url;
  }
}

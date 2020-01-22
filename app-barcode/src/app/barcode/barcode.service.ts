import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComandaInfo, LockInfo } from '../models/comanda';
import { Return } from '../shared/startup';
import { Global } from '../global';

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {
  private readonly API = `${Global.IPC.protocol}://${Global.IPC.endpoint}:5000/api`;
  private readonly MEA_URL = `${this.API}/mea`;
  constructor(private http: HttpClient) {}

  getcomanda(codigo: string) {
    return this.http.get<ComandaInfo>(`${this.API}/ConnectorPdv/comanda/${codigo}`);
  }

  getLockComanda() {
    return this.http.get<LockInfo>(`${this.API}/ConnectorPdv/comanda/lock`);
  }

  getPrinterStatus() {
    return this.http.get<Return>(`${this.MEA_URL}/device/printer/status`);
  }
}

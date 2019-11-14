import { Config } from './../models/config.model';
import { Flow, Connection, IpcCom } from '../models/general.model';

export class Global {
  public static CONFIG = './assets/data/config.json';
  public static FLOW: Flow;
  public static CONNECTION: Connection;
  public static IPC: IpcCom;

}

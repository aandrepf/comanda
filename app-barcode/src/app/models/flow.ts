import { ComandaInfo, Comanda } from 'src/app/models/comanda';

export class IpcCom {
  endpoint: string;
  ssl: boolean;
  debug: string;
  protocol: string;
}

export class Connection {
  constructor(
    public version: string,
    public conected: string,
    public isOperational: boolean
  ) {}
}

export class Flow {
  constructor(
    public tipoServico: number,
    public codigo: string,
    public comanda: Comanda,
    public valor: string,
    public tipoCartao: TipoCartao,
    public cpf: string
  ) {}
}

enum TipoCartao {
  DEBITO = 2,
  CREDITO = 3,
  REFEICAO = 6
}

export class IpcCom {
  endpoint: string;
  ssl: boolean;
  debug: string;
  protocol: string;
}

export class Return {
  meta: Meta;
  ret: Ret;
}
export class RetOperational {
  meta: Meta;
  ret: boolean;
}

interface Meta {
  href: string;
}

interface Ret {
  version: string;
  str: string;
  sts: number;
  code: number;
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
    public comanda: ComandaInfo,
    public valor: string,
    public tipoCartao: TipoCartao,
    public cpf: string
  ) {}
}

export class ComandaInfo {
  itens: Itens[];
  total: any;
}
class Itens {
  desc: string;
  cod: string;
  val: number;
  qtd: number;
}

enum TipoCartao {
  DEBITO = 2,
  CREDITO = 3,
  REFEICAO = 6
}

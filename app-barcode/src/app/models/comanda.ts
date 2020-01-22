export class ComandaInfo {
  meta: Meta;
  ret: Comanda;
}
export class LockInfo {
  meta: Meta;
  ret: Lock;
}
export class Comanda {
  itens: Itens[];
  total: number;
  totalPagar: number;
  subTotal: number;
  percServico: number;
  servico: number;
  ticket: string;
}
class Itens {
  descricao: string;
  preco: number;
  valor: number;
  quantidade: number;
}
interface Meta {
  href: string;
}
class Lock {
  str: string;
  sts: number;
}

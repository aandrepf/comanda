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


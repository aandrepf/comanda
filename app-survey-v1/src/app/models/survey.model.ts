export interface IAnswer {
    idAnswer: number;
    descrAnswer: string;
    idAnswerOption: number;
    icon: string;
    txtColor: string;
    bgColor: string;
    selectedBgColor: string;
    selectedTxtColor: string;
}

export interface IConfirm {
    txtColor: string;
    bgColor: string;
    txtConfirm: string;
    isConfirm: boolean;
}

export interface IQuestion {
    idQuestion: number;
    descrQuestion: string;
    idQuestionTipo: number;
    isMultiple: boolean;
    isVertical: boolean;
    txtColor: string;
    bgColor: string;
    answers: IAnswer[];
    confirm: IConfirm;
    icon: string;
}

export interface IQuestionResult {
    idQuestion: number;
    idAnswer: number;
    idAnswerOption: number;
}

export interface IAnswerResult {
    idAnswer: number;
    idAnswerOption: number;
}

export interface ISurvey {
    descrSurvey: string;
    idSurvey: number;
    question: IQuestion[];
    txtColor: string;
    bgColor: string;
    showDescrSurvey: boolean;
    useBond: boolean;
    thanksMsg: string;
    brand: string;
    bondConfig: IBondConfig;
}

export interface IBondConfig {
    descrBond: string;
    txtColor: string;
    bgColor: string;
    useCpf: boolean;
    txtCpf?: string;
    useCnpj: boolean;
    txtCnpj?: string;
    useAgcc: boolean;
    txtAgcc?: string;
    useComment: boolean;
    txtComment?: string;
    useName: boolean;
    txtName?: string;
    useCel: boolean;
    txtCel?: string;
    usePhone: boolean;
    txtPhone?: string;
    useMatricula: boolean;
    txtMatricula?: string;
    confirm: IConfirm;
    useObs: boolean;
    useBarcode: boolean;
}

export interface ISuveyBondIdResult {
    idSurvey: number;
    idQuestion: number;
    idAnswer: number;
    idAnswerOption: number;
}

export interface ISurveyResult {
    resultIds: ISuveyBondIdResult[];
    bond: IBond;
}
export interface IBond {
    name?: string;
    cpf?: string;
    cnpj?: string;
    agcc?: string;
    phone?: string;
    cel?: string;
    comment?: string;
    barcode?: string;
    matricula?: string;
    obs?: string;
}

export interface IThanks {
    message: string;
    txtColor: string;
    bgColor: string;
    bond: IBond;
    isBgData64: boolean;
}

export interface IError {
    message: string;
    txtColor: string;
    bgColor: string;
}

export interface IMidia {
    width: string;
    height: string;
    content: IContent[];
}

export interface IContent {
    type: number;
    src: string;
    time: number;
}

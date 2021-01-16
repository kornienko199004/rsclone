import { KeyboardEvent } from 'react';

export interface INote {
  _id?: string;
  title: string;
  parents?: any[];
  body: any;
}

export interface IPage {
  pageId: number;
  pageLink: string;
  pagePath: (number | string)[];
  content: string;
  nestedPages: IPage[];
  textInputHeight: number;
}

export interface IState {
  title: string;
  input: string;
  // children: any[];
  body: IPage[];
  content: any[];
  pagesIdCount: number;
}

export interface IInputHandler {
  // eslint-disable-next-line no-unused-vars
  (e: KeyboardEvent<HTMLInputElement>): void;
}

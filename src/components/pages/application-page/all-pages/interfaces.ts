/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
export interface Note {
  _id: string;
  title: string;
  body: object;
  parents: Array<object>;
  modification_notes: [ModificationNote];
  owner: string;
  __v: number;
}

export interface NoteInfo {
  id: number,
  title: string;
  wordCount: number;
  mentions: number;
  updated: String;
  created: String;
}

export interface ModificationNote {
  _id: string;
  modified_on: string;
  modified_by: null | string;
  modification_note: null | string;
}

export interface Columns {
    checkedA: boolean,
    checkedB: boolean,
    checkedC: boolean,
    checkedD: boolean,
}

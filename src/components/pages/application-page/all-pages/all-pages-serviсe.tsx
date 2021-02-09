/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import { ValueFormatterParams } from '@material-ui/data-grid';
import { Note, NoteInfo, Columns } from './interfaces';

export const getRows = (res: any[]): any => (res.map((note: Note) => {
  type Options = {
    year: string,
    month: string,
    day: string;
  };
  const options: Options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const nth = (d: any) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  const formatDate = (d: string) => {
    const fortnightAway = new Date(d);
    const date = fortnightAway.getDate();
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][fortnightAway.getMonth()];

    return `${month} ${date}${nth(date)}, ${fortnightAway.getFullYear()}`;
  };

  const countWords = (mainT: any[]) => {
    let count = 0;

    if (Array.isArray(mainT) && mainT.length) {
      mainT.forEach((par: any) => {
        count += par.content.split(' ').length;
        if (Array.isArray(par.nestedPages) && par.nestedPages.length) {
          par.nestedPages.forEach((innerPar: any) => {
            count += innerPar.content.split(' ').length;
            if (Array.isArray(innerPar.nestedPages) && innerPar.nestedPages.length) {
              innerPar.nestedPages.forEach((innerPar2: any) => {
                count += innerPar2.content.split(' ').length;
              });
            }
          });
        }
      });
    }

    // const countInnerWords = (t: any[]) => {
    //   if (Array.isArray(t) && t.length) {
    //     t.forEach((par: any) => {
    //       console.log('par', par);
    //       console.log('count', count);
    //       count += par.content.split(' ').length;
    //       if (Array.isArray(par.nestedPages) && par.nestedPages.length) {
    //         par.nestedPages.forEach((innerPar: any) => {
    //           countInnerWords(innerPar);
    //         });
    //       }
    //     });
    //   }
    // };

    // countInnerWords(mainT);

    return count;
  };

  return ({
    id: note._id,
    title: note.title,
    wordCount: note.body ? countWords(note.body) : 0,
    mentions: note.parents.length,
    updated: new Date(note.modification_notes[note.modification_notes.length - 1].modified_on).toLocaleDateString('en-US', options),
    created: formatDate(note.modification_notes[0].modified_on),
  }
  );
}));

export const hideDailyNotes = (res: NoteInfo[] | null): any => (
  res ? res.filter((note: NoteInfo) => note.title === note.created ? null : note) : null);

export const searchRows = (res: NoteInfo[], title: string): any => (
  res.filter((note: NoteInfo) => note.title.toLowerCase().includes(title.toLowerCase())
    ? note : null));

export const changeColumns = (columns: Columns) => {
  const initialColumns = [
    {
      field: 'wordCount',
      headerName: 'WORD COUNT',
      flex: 1.5,
    },
    {
      field: 'mentions',
      headerName: 'MENTIONS',
      flex: 1.5,
    },
    {
      field: 'updated',
      headerName: 'UPDATED',
      flex: 2,
    },
    {
      field: 'created',
      headerName: 'CREATED',
      flex: 2,
    },
  ];
  const updatedColumns: [any, any][] = Object.entries(columns);

  const updates = initialColumns.filter((col, ind) => updatedColumns[ind][1] ? col : null);
  const output = [
    {
      field: 'title',
      headerName: 'TITLE',
      flex: 3,
      sortable: true,
      headerClassName: 'title',
      renderCell: (params: ValueFormatterParams): any => (
        <strong>
          {params.value}
        </strong>
      ),
    },
    ...updates,
  ];
  return output;
};

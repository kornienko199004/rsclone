/* eslint-disable no-unused-expressions */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
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

  const countWords = (t: object) => {
    let count = 0;
    Object.entries(t).forEach((par: Array<any>) => {
      console.log(par[1]);
      count += par[1].content.split(' ').length;
    });
    return count;
  };

  return ({
    id: note._id,
    title: note.title,
    wordCount: countWords(note.body),
    mentions: note.parents.length,
    updated: new Date(note.modification_notes[note.modification_notes.length - 1].modified_on).toLocaleDateString('en-US', options),
    created: formatDate(note.modification_notes[0].modified_on),
  }
  );
}));

export const hideDailyNotes = (res: NoteInfo[] | null): any => (
  res ? res.filter((note: NoteInfo) => note.title === note.created ? null : note) : null);

export const searchRows = (res: NoteInfo[], title: string): any => (
  res.filter((note: NoteInfo) => note.title.includes(title) ? note : null));

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
      renderCell: (params: ValueFormatterParams) => (
        <strong>
          <Link component={RouterLink} to="/">
            {params.value}
          </Link>
        </strong>
      ),
    },
    ...updates,
  ];
  return output;
};

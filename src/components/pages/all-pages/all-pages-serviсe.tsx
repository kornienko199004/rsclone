/* eslint-disable no-unused-expressions */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import { RowSelectedParams, ValueFormatterParams } from '@material-ui/data-grid';
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
  return ({
    id: note._id,
    title: note.title,
    wordCount: 10,
    mentions: note.parents.length,
    updated: new Date(note.modification_notes[note.modification_notes.length - 1].modified_on).toLocaleDateString('en-US', options),
    created: new Date(note.modification_notes[0].modified_on).toLocaleDateString('en-US', options),
  }
  );
}));

export const hideDailyNotes = (res: NoteInfo[]): any => (
  res.filter((note: NoteInfo) => note.title === note.created ? null : note));

export const searchRows = (res: NoteInfo[], title: string): any => (
  res.filter((note: NoteInfo) => note.title.includes(title) ? note : null));

export const deleteRows = (selected: RowSelectedParams[]) => {
  console.log(selected);
  // eslint-disable-next-line spaced-comment
  //!delete note from service
  selected.forEach((el) => console.log(el.data.id));
};

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
          { params.value}
        </strong>
      ),
    },
    ...updates,
  ];
  return output;
};

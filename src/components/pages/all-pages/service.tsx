/* eslint-disable no-confusing-arrow */
import * as React from 'react';
import { ValueFormatterParams } from '@material-ui/data-grid';
// import Button from '@material-ui/core/Button';
import { Columns } from './interfaces';

const changeColumns = (columns: Columns) => {
  const initialWidth: number = ((window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth) - 130) / 15;
  const widthS: number = initialWidth * 2;
  const widthM: number = initialWidth * 3;
  const widthL: number = initialWidth * 5;

  const initialColumns = [
    {
      field: 'wordCount',
      headerName: 'WORD COUNT',
      width: widthS,
    },
    {
      field: 'mentions',
      headerName: 'MENTIONS',
      width: widthS,
    },
    {
      field: 'updated',
      headerName: 'UPDATED',
      width: widthM,
    },
    {
      field: 'created',
      headerName: 'CREATED',
      width: widthM,
    },
  ];
  const updatedColumns: [any, any][] = Object.entries(columns);

  const updates = initialColumns.filter((col, ind) => updatedColumns[ind][1] ? col : null);
  const output = [
    {
      field: 'title',
      headerName: 'TITLE',
      width: widthL,
      sortable: true,
      renderCell: (params: ValueFormatterParams) => (
        <strong>
          {params.value}
        </strong>
      ),
    },
    ...updates,
  ];
  return output;
};

export default changeColumns;

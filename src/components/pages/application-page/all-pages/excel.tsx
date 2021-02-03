/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import ReactExport from 'react-export-excel';
import GetAppIcon from '@material-ui/icons/GetApp';
import './allPages.scss';
import { Button, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;

const StyledButton = withStyles({
  root: {
    minWidth: '49px',
    minHeight: '24px',
  },
})(Button);

class Download extends React.Component<any> {
  render() {
    const { rows } = this.props;
    return (
      <ExcelFile
        type="button"
        element={(
          <Tooltip title="Export the table" arrow>
            <StyledButton>
              <GetAppIcon className="btn" />
            </StyledButton>
          </Tooltip>
        )}
      >
        <ExcelSheet data={rows} name="Notes">
          <ExcelColumn label="Title" value="title" />
          <ExcelColumn label="WordCount" value="wordCount" />
          <ExcelColumn label="Mentions" value="mentions" />
          <ExcelColumn label="Updated" value="updated" />
          <ExcelColumn label="Created" value="created" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}
export default Download;

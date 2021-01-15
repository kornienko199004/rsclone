/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import './allPages.scss';
import { withRouter } from 'react-router-dom';
import {
  DataGrid,
  ColDef,
  RowSelectedParams,
} from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import {
  getRows,
  deleteRows,
  changeColumns,
  hideDailyNotes,
} from './all-pages-serviсe';
import allInfo from './all-info';
import CustomizedMenus from './menu';
import SearchInput from './search';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    border: 'none',
    '& .MuiDataGrid-colCellWrapper': {
      backgroundColor: '#BFCCD6',
      borderRadius: '4px',
      border: 'none',
    },
    '& .MuiDataGrid-colCell': {
      backgroundColor: '#BFCCD6',
      align: 'center',
    },
    '& .MuiDataGrid-cellLeft': {
      textAlign: 'center',
    },
    '& .MuiDataGrid-colCellTitleContainer': {
      justifyContent: 'center',
    },
    '& .title': {
      justifySelf: 'start',
    },
  },

});

const StyledButton = withStyles({
  root: {
    minWidth: '49px',
  },
})(Button);

const AllPages = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
  });
  const [rows, setRows] = React.useState(getRows(allInfo));
  const [DisplayDailyNotes, setDisplayDailyNotes] = React.useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  // const info = new RSCloneService();

  // const allInfo = info.getNotes();

  const selected: RowSelectedParams[] = [];
  const columns: ColDef[] = changeColumns(state);
  // let rows: NoteInfo[];

  const classes = useStyles();
  return (
    <div className="all-pages-container">
      <div className="service">
        <div className="l-group">
          <StyledButton>
            <DeleteOutlineIcon className="btn" onClick={() => { deleteRows(selected); }} />
          </StyledButton>
        </div>
        <div className="r-group">
          <SearchInput rowsInfo={[rows, setRows]} initialRows={getRows(allInfo)} />
          <StyledButton>
            <DateRangeOutlinedIcon
              className="btn"
              onClick={() => {
                const curr = DisplayDailyNotes;
                if (!curr) {
                  setRows(getRows(allInfo));
                } else {
                  setRows(hideDailyNotes(getRows(allInfo)));
                }
                setDisplayDailyNotes(!curr);
              }}
            />
          </StyledButton>
          <CustomizedMenus
            state={state}
            handleChange={handleChange}
          />
        </div>
      </div>
      <div
        style={{ display: 'flex', width: '100%' }}
      >
        {(rows && columns) && <DataGrid
          className={classes.root}
          disableColumnMenu={true}
          autoHeight={true}
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onRowSelected={(param: RowSelectedParams) => {
            if (param.isSelected) {
              selected.push(param);
            } else {
              const index: number = selected.findIndex((item) => item.data.id === param.data.id);
              selected.splice(index, 1);
            }
          }}
        />}
      </div>
    </div>
  );
};
export default withRouter(AllPages);

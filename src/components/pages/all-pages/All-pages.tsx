/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
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
  getRows,
  deleteRows,
  changeColumns,
  hideDailyNotes,
} from './all-pages-serviсe';
import allInfo from './all-info';
import { NoteInfo } from './interfaces';
import CustomizedMenus from './menu';
import './all-pages.scss';

const AllPages = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
  });
  const [DisplayDailyNotes, setDisplayDailyNotes] = React.useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const selected: RowSelectedParams[] = [];
  const columns: ColDef[] = changeColumns(state);
  let rows: NoteInfo[];
  if (DisplayDailyNotes) {
    rows = getRows(allInfo);
  } else {
    rows = hideDailyNotes(getRows(allInfo));
  }
  return (
    <div className="all-pages-container">
      <div className="service">
        <div className="l-group">
          <Button>
            <DeleteOutlineIcon className="btn" onClick={() => { deleteRows(selected); }} />
          </Button>
        </div>
        <div className="r-group">
          <Button>
            <DateRangeOutlinedIcon
              className="btn"
              onClick={() => {
                const curr = DisplayDailyNotes;
                setDisplayDailyNotes(!curr);
              }}
            />
          </Button>
          <CustomizedMenus
            state={state}
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className="all-pages" style={{ width: '100%' }}>
        {(rows && columns) && <DataGrid
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

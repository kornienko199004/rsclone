/* eslint-disable no-console */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useEffect } from 'react';
import './allPages.scss';
import { withRouter } from 'react-router-dom';
import {
  DataGrid,
  ColDef,
  RowSelectedParams,
  GridOverlay,
} from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import LinearProgress from '@material-ui/core/LinearProgress';
import {
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import {
  getRows,
  changeColumns,
  hideDailyNotes,
} from './all-pages-serviсe';
import CustomizedMenus from './menu';
import SearchInput from './search';
import withRSCloneService from '../../../hoc-helper/withRSCloneService';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    border: 'none',
    '& .MuiDataGrid-colCellWrapper': {
      backgroundColor: 'rgba(191, 204, 214, 0.4)',
      borderRadius: '4px',
      border: 'none',
    },
    '& .MuiDataGrid-colCell': {
      backgroundColor: 'rgba(191, 204, 214, 0.4)',
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

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

const AllPages = (props: any) => {
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
  });
  const [rows, setRows] = useState(null);
  const [allInfo, setAllInfo] = useState(null);
  const [notBeingDeleted, setNotBeingDeleted] = useState(true);
  const [DisplayDailyNotes, setDisplayDailyNotes] = useState(true);
  const { rsCloneService: service } = props;
  useEffect(() => {
    const getInfo = async () => {
      // await service.login('mary-jane@gmail.com', 'marymary');
      const res = await service.getNotes();
      await setAllInfo(getRows(res.DATA));
      await setRows(getRows(res.DATA));
    };
    getInfo();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const deleteRows = async (selected: RowSelectedParams[]) => {
    setNotBeingDeleted(false);
    await selected.forEach((el) => {
      service.deleteNote(el.data.id);
    });
    const res = await service.getNotes();
    await setAllInfo(getRows(res.DATA));
    await setRows(getRows(res.DATA));
    setNotBeingDeleted(true);
  };

  const selected: RowSelectedParams[] = [];
  const columns: ColDef[] = changeColumns(state);

  const classes = useStyles();
  return (
    <div className="all-pages-container">
      <div className="service">
        <div className="l-group">
          <StyledButton>
            <DeleteOutlineIcon
              className="btn"
              onClick={() => {
                deleteRows(selected);
              }}
            />
          </StyledButton>
        </div>
        <div className="r-group">
          <SearchInput rowsInfo={[rows, setRows]} initialRows={allInfo} />
          <StyledButton>
            <DateRangeOutlinedIcon
              className="btn"
              onClick={() => {
                const curr = DisplayDailyNotes;
                if (!curr) {
                  setRows(allInfo);
                } else {
                  const w = hideDailyNotes(rows);
                  setRows(w);
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
        {(rows && notBeingDeleted) ? <DataGrid
          density="compact"
          className={classes.root}
          disableColumnMenu={true}
          autoHeight={true}
          // @ts-ignore
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
        /> : <DataGrid
          density="compact"
          className={classes.root}
          disableColumnMenu={true}
          autoHeight={true}
          rows={[]}
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
          components={{
            loadingOverlay: CustomLoadingOverlay,
          }}
          loading
        />}
      </div>
    </div>
  );
};
export default withRouter(withRSCloneService(AllPages));

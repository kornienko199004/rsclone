/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useEffect, useContext } from 'react';
import './allPages.scss';
import { withRouter, Redirect } from 'react-router-dom';
import {
  DataGrid,
  ColDef,
  RowSelectedParams,
  GridOverlay,
  RowParams,
} from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
// import GetAppIcon from '@material-ui/icons/GetApp';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Tooltip } from '@material-ui/core';
import {
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';
import {
  getRows,
  changeColumns,
  hideDailyNotes,
} from './all-pages-serviсe';
import CustomizedMenus from './menu';
import SearchInput from './search';
import RSCloneServiceContext from '../../../rsCloneServiceContext/index';
import AlertDialog from './alertDialog';
import Download from './excel';
import { IInitialState } from '../../../../index';

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
    '& .MuiDataGrid-row:hover': {
      cursor: 'pointer',
      backgroundColor: 'rgba(63, 81, 181, 0.08)',
    },
    '& .MuiDataGrid-cell': {
      border: 'none',
    },
    '& .calendar: active': {
      color: 'red',
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

const AllPages = () => {
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
  });
  const [link, setLink] = useState('');
  const [rows, setRows] = useState(null);
  const [allInfo, setAllInfo] = useState(null);
  const [notBeingDeleted, setNotBeingDeleted] = useState(true);
  const [DisplayDailyNotes, setDisplayDailyNotes] = useState(true);
  const [selectedValue, setSelectedValue] = useState([] as any);
  const [isVisible, setIsVisible] = useState(false);
  const [calendarText, setCalendarText] = useState('Hide daily notes');
  const sidebarIsOpen = useSelector<IInitialState>((reduxState) => reduxState.sidebarIsOpen);

  const service = useContext(RSCloneServiceContext);
  useEffect((): () => void => {
    let cleanupFunction = false;
    const getInfo = async () => {
      try {
        const res = await service.getNotes();
        const info = await getRows(res.DATA);
        if (!cleanupFunction) {
          setAllInfo(info);
          setRows(info);
        }
      } catch (e) {
        console.error(e.message);
      }
    };
    getInfo();
    return () => cleanupFunction = true;
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

  let selected: RowSelectedParams[] = [];
  const columns: ColDef[] = changeColumns(state);

  const classes = useStyles();
  return (
    <Scrollbars
      autoHeight
      autoHeightMin={500}
      autoHeightMax="80vh"
      style={{
        width: sidebarIsOpen ? 'calc(100% - 240px)' : '100%',
        marginLeft: sidebarIsOpen ? '240px' : '0',
      }}
    >
      <div
        className="all-pages-container"
        // style={{
        //   width: sidebarIsOpen ? 'calc(100% - 240px)' : '100%',
        //   marginLeft: sidebarIsOpen ? '270px' : '30px',
        // }}
      >
        <div className="service">
          <div className="l-group">
            <AlertDialog
              selected={[selectedValue, setSelectedValue]}
              deleteRows={deleteRows}
              isVisible={isVisible}
            />
            <Download rows={rows} className="btn" />
          </div>
          <div className="r-group">
            <SearchInput rowsInfo={[rows, setRows]} initialRows={allInfo} />
            <Tooltip title={calendarText} arrow>
              <StyledButton>
                <DateRangeOutlinedIcon
                  className={`btn ${DisplayDailyNotes ? '' : 'calendar'}`}
                  onClick={() => {
                    const curr = DisplayDailyNotes;
                    if (!curr) {
                      setRows(allInfo);
                      setCalendarText('Hide daily notes');
                    } else {
                      const w = hideDailyNotes(rows);
                      setRows(w);
                      setCalendarText('Show daily notes');
                    }
                    setDisplayDailyNotes(!curr);
                  }}
                />
              </StyledButton>
            </Tooltip>
            <CustomizedMenus
              state={state}
              handleChange={handleChange}
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            height: '100vh',
          }}
        >
          {(rows && notBeingDeleted)
            ? ((link)
              ? <Redirect to={link} />
              : <DataGrid
                  density="compact"
                  className={classes.root}
                  disableColumnMenu
                  autoHeight
                // @ts-ignore
                  rows={rows}
                  columns={columns}
                  disableSelectionOnClick
                  checkboxSelection
                  onRowClick={(param: RowParams) => {
                    setLink(`/app/note/${param.row.title}`);
                  }}
                  onRowSelected={(param: RowSelectedParams) => {
                    selected = selectedValue;
                    if (param.isSelected) {
                      selected.push(param);
                    } else {
                      const index: number = selected
                        .findIndex((item) => item.data.id === param.data.id);
                      selected.splice(index, 1);
                    }
                    setSelectedValue(selected);
                    if (selectedValue.length !== 0) {
                      setIsVisible(true);
                    } else {
                      setIsVisible(false);
                    }
                  }}
              />) : <DataGrid
                density="compact"
                className={classes.root}
                disableColumnMenu={true}
                autoHeight={true}
                rows={[]}
                columns={columns}
                checkboxSelection
                components={{
                  loadingOverlay: CustomLoadingOverlay,
                }}
                loading
              />}
        </div>
      </div>
    </Scrollbars>
  );
};
export default withRouter(AllPages);

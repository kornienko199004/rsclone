/* eslint-disable no-confusing-arrow */
/* eslint-disable no-unused-expressions */
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import {
  makeStyles,
  Theme,
  InputBase,
} from '@material-ui/core';
import { searchRows } from './all-pages-serviсe';

const useStyles = makeStyles((theme: Theme) => ({
  search: {
    position: 'relative',
    borderRadius: '100px',
    backgroundColor: ' #BFCCD6',
    '&:hover': {
      opacity: 0.7,
    },
    marginRight: 2,
    width: 210,
    float: 'right',
    opacity: 0.4,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'black',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

type Props = {
  rowsInfo: any;
  initialRows: any;
};

const SearchInput = ({ rowsInfo, initialRows }: Props) => {
  const classes = useStyles();
  const [rows, setRows] = rowsInfo;
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search All Pages"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(event: any) => event.target.value !== ''
          ? setRows(searchRows(rows, event.target.value)) : setRows(initialRows)}
      />
    </div>
  );
};

export default SearchInput;

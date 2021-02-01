import React, { SetStateAction, useContext, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './navbar.scss';
import {
  makeStyles, createStyles,
} from '@material-ui/core/styles';

import TodayTwoToneIcon from '@material-ui/icons/TodayTwoTone';
import { withRouter } from 'react-router';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import { connect, useSelector } from 'react-redux';
import { compose, Dispatch } from 'redux';
import SearchInput from '../search-input/SearchInput';
import RSCloneServiceContext from '../rsCloneServiceContext';
import { addShortcut } from '../../store/actionsCreators/actionsCreators';
import { IInitialState } from '../../index';

const useStyles = makeStyles(() => createStyles({
  calendar: {
    padding: 0,
  },
}));

const Navbar = (
  { location: { pathname }, onAddShortcut } :
    {location: {pathname: string},
      onAddShortcut: Dispatch<SetStateAction<any>>},
) => {
  const classes = useStyles();
  const service = useContext(RSCloneServiceContext);
  const shortcuts: string[] | null = useSelector<
    IInitialState, Array<string>>((state) => state.shortcuts);

  useEffect(() => {
    if (shortcuts.length !== 0) {
      service.updateUser({
        shortcuts,
      });
    }
  }, [shortcuts]);

  const onFavourite = () => {
    if (pathname) {
      // @ts-ignore
      const title = /[^/]*$/.exec(`${pathname}`)[0];
      onAddShortcut(title);
    }
    return false;
  };

  return (
    <div className="header">
      <SearchInput />
      <IconButton className={classes.calendar}>
        <TodayTwoToneIcon className="header__calendar" />
      </IconButton>
      { pathname.includes('/note/')
        ? (
          <IconButton className={classes.calendar} onClick={onFavourite}>
            <StarOutlineIcon className="header__favourite" />
          </IconButton>
        )
        : null }
      <IconButton className={classes.calendar}>
        <MoreHorizIcon className="header__more" />
      </IconButton>
    </div>
  );
};

export default compose(
  withRouter,
  connect(null, { onAddShortcut: addShortcut }),
)(Navbar);

import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './navbar.scss';
import {
  makeStyles, createStyles,
} from '@material-ui/core/styles';

import TodayTwoToneIcon from '@material-ui/icons/TodayTwoTone';
import { withRouter } from 'react-router';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import SearchInput from '../search-input/SearchInput';
import RSCloneServiceContext from '../rsCloneServiceContext';

const useStyles = makeStyles(() => createStyles({
  calendar: {
    padding: 0,
  },
}));

const Navbar = ({ location: { pathname } } : {location: {pathname: string}}) => {
  const classes = useStyles();
  const service = useContext(RSCloneServiceContext);

  const onFavourite = () => {
    if (pathname) {
      service.updateUser({
        // @ts-ignore
        shortcuts: /[^/]*$/.exec(`${pathname}`)[0],
      });
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

export default withRouter(Navbar);

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './navbar.scss';
import {
  makeStyles, createStyles,
} from '@material-ui/core/styles';

import TodayTwoToneIcon from '@material-ui/icons/TodayTwoTone';
import SearchInput from '../search-input/SearchInput';

const useStyles = makeStyles(() => createStyles({
  calendar: {
    padding: 0,
  },
}));

const onClickSetting = () => {
  console.log('settings on!');
};

const onClickCalendar = () => {
  console.log('calendar on!');
};

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className="header">
      <SearchInput />
      <IconButton className={classes.calendar} onClick={onClickCalendar}>
        <TodayTwoToneIcon className="header__calendar" />
      </IconButton>
      <IconButton className={classes.calendar} onClick={onClickSetting}>
        <MoreHorizIcon className="header__more" />
      </IconButton>
    </div>
  );
};

export default Navbar;

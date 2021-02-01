import React, {
  SetStateAction, useContext, useEffect, useState,
} from 'react';
import IconButton from '@material-ui/core/IconButton';
import './navbar.scss';
import {
  makeStyles, createStyles,
} from '@material-ui/core/styles';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import TodayTwoToneIcon from '@material-ui/icons/TodayTwoTone';
import { withRouter } from 'react-router';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import { connect, useSelector } from 'react-redux';
import { compose, Dispatch } from 'redux';
import SearchInput from '../search-input/SearchInput';
import RSCloneServiceContext from '../rsCloneServiceContext';
import {
  addShortcut,
  onCloseRightSidebar,
  onOpenRightSidebar,
  removeShortcut,
} from '../../store/actionsCreators/actionsCreators';
import { IInitialState } from '../../index';

const useStyles = makeStyles(() => createStyles({
  calendar: {
    padding: 0,
  },
}));

const Navbar = (
  {
    location: { pathname },
    onAddShortcut,
    // eslint-disable-next-line no-shadow
    onCloseRightSidebar,
    // eslint-disable-next-line no-shadow
    onOpenRightSidebar,
    onRemoveShortcut,
  } :
    {
      location: {pathname: string},
      onAddShortcut: Dispatch<SetStateAction<any>>,
      onCloseRightSidebar: Dispatch<SetStateAction<any>>,
      onOpenRightSidebar: Dispatch<SetStateAction<any>>,
      onRemoveShortcut: Dispatch<SetStateAction<any>>,
    },
) => {
  const classes = useStyles();
  const service = useContext(RSCloneServiceContext);
  const shortcuts: string[] | null = useSelector<
    IInitialState, Array<string>>((state) => state.shortcuts);
  const [open, setOpen] = useState<boolean>(false);

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
      if (shortcuts.includes(title)) {
        const payload = shortcuts.filter((el) => !(el === title));
        onRemoveShortcut(payload);
      } else {
        onAddShortcut(title);
      }
    }
    return false;
  };

  const onClickSidebar = () => {
    setOpen(true);
    // eslint-disable-next-line no-unused-expressions
    open ? onOpenRightSidebar(true) : onCloseRightSidebar(false);
  };

  return (
    <div className="header">
      <SearchInput />
      <IconButton className={classes.calendar}>
        <TodayTwoToneIcon className="header__calendar" />
      </IconButton>
      { pathname.includes('/note/')
        ? (
          <>
            <IconButton className={classes.calendar} onClick={onFavourite}>
              <StarOutlineIcon className="header__favourite" />
            </IconButton>
            <IconButton className={classes.calendar}>
              <DeviceHubIcon className="header__favourite" onClick={onClickSidebar} />
            </IconButton>
          </>
        )
        : null }
    </div>
  );
};

export default compose(
  withRouter,
  connect(null, {
    onAddShortcut: addShortcut,
    onRemoveShortcut: removeShortcut,
    onCloseRightSidebar,
    onOpenRightSidebar,
  }),
)(Navbar);

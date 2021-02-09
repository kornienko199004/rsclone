import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import {
  Divider, fade, Link, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import DateRange from '@material-ui/icons/DateRange';
import BubbleChart from '@material-ui/icons/BubbleChart';
import MenuIcon from '@material-ui/icons/Menu';
import Grade from '@material-ui/icons/Grade';
import React, { Dispatch, SetStateAction } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import GraphNavigation from './GraphNavigation';
import { UserData } from './Sidebar';
import ShortcutsList from '../pages/application-page/shorcuts/ShortcutList';

const useStyles = makeStyles((theme: Theme) => createStyles({
  link: {
    color: '#5c7080',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  linkItem: {
    '&:hover': {
      backgroundColor: fade('#fff', 0.15),
    },
  },
  divider: {
    backgroundColor: fade('#fff', 0.15),
  },
  toolbar: theme.mixins.toolbar,
  hideButton: {
    position: 'absolute',
    padding: '4px',
    width: '28px',
    height: '28px',
    top: '15px',
    left: '195px',
    borderRadius: '10px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: fade('#fff', 0.15),
    },
  },
  listItemText: {
    fontWeight: 600,
  },
  listIcon: {
    minWidth: '44px',
  },
  listItemWithoutLink: {
    cursor: 'default',
    flexDirection: 'column',
    alignItems: 'start',
  },
  listItemShortcutsTitleContainer: {
    display: 'flex',
  },
}));

const ReDrawer = (
  { userData, toggleSideBar, setUserData }
: {userData: UserData, toggleSideBar: () => void, setUserData: Dispatch<SetStateAction<UserData>>},
) => {
  const classes = useStyles();

  return (
    <div>
      <MenuOpenIcon
        className={classes.hideButton}
        htmlColor="#5c7080"
        onClick={toggleSideBar}
        aria-controls="simple-menu"
        aria-haspopup="true"
      />
      {/* @ts-ignore */}
      <GraphNavigation userData={userData} setUserData={setUserData} />
      <div className={classes.toolbar} />
      <List className={classes.link}>
        <Link component={RouterLink} to="/app" className={classes.link}>
          <ListItem button className={classes.linkItem}>
            <ListItemIcon classes={{
              root: classes.listIcon,
            }}
            >
              <DateRange htmlColor="#5c7080" />
            </ListItemIcon>
            <ListItemText
              primary="DAILY NOTES"
              classes={{
                primary: classes.listItemText,
              }}
            />
          </ListItem>
        </Link>
        <Link component={RouterLink} to="/app/graph" className={classes.link}>
          <ListItem button className={classes.linkItem}>
            <ListItemIcon classes={{
              root: classes.listIcon,
            }}
            >
              <BubbleChart htmlColor="#5c7080" />
            </ListItemIcon>
            <ListItemText
              primary="GRAPH OVERVIEW"
              classes={{
                primary: classes.listItemText,
              }}
            />
          </ListItem>
        </Link>
        <Link component={RouterLink} to="/app/pages" className={classes.link}>
          <ListItem button className={classes.linkItem}>
            <ListItemIcon classes={{
              root: classes.listIcon,
            }}
            >
              <MenuIcon htmlColor="#5c7080" />
            </ListItemIcon>
            <ListItemText
              primary="ALL PAGES"
              classes={{
                primary: classes.listItemText,
              }}
            />
          </ListItem>
        </Link>
        <Divider className={classes.divider} />
        <ListItem className={classes.listItemWithoutLink}>
          <div className={classes.listItemShortcutsTitleContainer}>
            <ListItemIcon classes={{
              root: classes.listIcon,
            }}
            >
              <Grade htmlColor="#5c7080" />
            </ListItemIcon>
            <ListItemText
              primary="SHORTCUTS"
              classes={{
                primary: classes.listItemText,
              }}
            />
          </div>
          <ShortcutsList />
        </ListItem>
      </List>
    </div>
  );
};

export default ReDrawer;

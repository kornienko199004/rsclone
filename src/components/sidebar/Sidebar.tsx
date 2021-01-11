import React, { useState } from 'react';
import {
  makeStyles, Theme, createStyles,
} from '@material-ui/core/styles';
import {
  List, ListItem, ListItemText,
  Drawer, ListItemIcon, Divider, fade, Link,
} from '@material-ui/core';
import DateRange from '@material-ui/icons/DateRange';
import BubbleChart from '@material-ui/icons/BubbleChart';
import Grade from '@material-ui/icons/Grade';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import MenuIcon from '@material-ui/icons/Menu';
import './sidebar.scss';
import { Link as RouterLink } from 'react-router-dom';
import GraphNavigation from './GraphNavigation';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
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
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#182026',
  },
  showButton: {
    position: 'absolute',
    padding: '4px',
    width: '28px',
    height: '28px',
    top: '15px',
    left: '15px',
    cursor: 'pointer',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: fade('#565555', 0.15),
    },
  },
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
}));

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const classes = useStyles();

  const toggleSidebar = (): void => {
    setOpen(!open);
  };

  const onItemSelected = () => {
    console.log("Yep, i'm selected");
  };

  const drawer = (
    <div>

      <MenuOpenIcon className={classes.hideButton} htmlColor="#5c7080" onClick={toggleSidebar} />
      <GraphNavigation name="ALEKSEY" />

      <div className={classes.toolbar} />
      <List className={classes.link}>
        <Link component={RouterLink} to="/" className={classes.link}>
          <ListItem button onClick={onItemSelected} className={classes.linkItem}>
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
        <Link component={RouterLink} to="/graph" className={classes.link}>
          <ListItem button onClick={onItemSelected} className={classes.linkItem}>
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
        <Link component={RouterLink} to="/pages" className={classes.link}>
          <ListItem button onClick={onItemSelected} className={classes.linkItem}>
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
        <Link component={RouterLink} to="/shortcut" className={classes.link}>
          <ListItem button onClick={onItemSelected} className={classes.linkItem}>
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
          </ListItem>
        </Link>
      </List>
    </div>
  );

  if (!open) {
    return <MenuIcon onClick={toggleSidebar} htmlColor="#5c7080" className={classes.showButton} />;
  }
  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
        open
      >
        {drawer}
      </Drawer>
    </nav>
  );
};

export default Sidebar;

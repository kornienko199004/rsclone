import React, { useState, useEffect, useContext } from 'react';
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './sidebar.scss';
import { Link as RouterLink } from 'react-router-dom';
import GraphNavigation from './GraphNavigation';
import withRSCloneService from '../hoc-helper/withRSCloneService';
import RSCloneServiceContext from '../rsCloneServiceContext';

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
    position: 'fixed',
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [username, setUserName] = useState<string | null>(null);
  const service = useContext(RSCloneServiceContext);
  const classes = useStyles();

  useEffect(() => {
    const fetchName = async () => {
      const userData = await service.getUser();
      setUserName(userData.username);
    };
    fetchName();
  }, [username]);

  const toggleSidebar = (): void => {
    setOpen(!open);
  };

  const onItemSelected = () => {
    console.log("Yep, i'm selected");
  };

  const onOpenMenu = (event: React.MouseEvent<any>) => {
    console.log(event);
    setAnchorEl(event.currentTarget);
  };
  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const ReDrawer = ({ name }: { name: string | null; }) => (
    <div>
      <MenuOpenIcon className={classes.hideButton} htmlColor="#5c7080" onClick={toggleSidebar} aria-controls="simple-menu" aria-haspopup="true" />
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div onClick={onOpenMenu} role="button" tabIndex={0}>
        <GraphNavigation name={name} />
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onCloseMenu}
      >
        <MenuItem onClick={onCloseMenu}>Test</MenuItem>
        <MenuItem onClick={onCloseMenu}>Test</MenuItem>
        <MenuItem onClick={onCloseMenu}>Test</MenuItem>
        <MenuItem onClick={onCloseMenu}>Test</MenuItem>
      </Menu>

      <div className={classes.toolbar} />
      <List className={classes.link}>
        <Link component={RouterLink} to="/app" className={classes.link}>
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
        <Link component={RouterLink} to="/app/graph" className={classes.link}>
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
        <Link component={RouterLink} to="/app/pages" className={classes.link}>
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
        <Link component={RouterLink} to="/app/shortcut" className={classes.link}>
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
        <ReDrawer name={username} />
      </Drawer>
    </nav>
  );
};

export default withRSCloneService(Sidebar);

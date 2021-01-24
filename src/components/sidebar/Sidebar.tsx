import React, {
  useState, useEffect,
} from 'react';
import {
  makeStyles, Theme, createStyles,
} from '@material-ui/core/styles';
import {
  Drawer, fade,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './sidebar.scss';
import { useSelector } from 'react-redux';
import withRSCloneService from '../hoc-helper/withRSCloneService';
import ReDrawer from './ReDrawer';
import { IInitialState } from '../../index';

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

export type UserData = {
    username: string | null,
    email: string | null
}

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const data = useSelector((state: IInitialState) => state.userData);
  console.log(data);
  const [userData, setUserData] = useState<UserData>(data);
  const classes = useStyles();

  useEffect(() => {
    console.log(userData);
  }, []);

  const toggleSidebar = (): void => {
    setOpen(!open);
  };

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
        <ReDrawer userData={userData} toggleSideBar={toggleSidebar} setUserData={setUserData} />
      </Drawer>
    </nav>
  );
};

export default withRSCloneService(Sidebar);

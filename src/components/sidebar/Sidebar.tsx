import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  makeStyles, Theme, createStyles,
} from '@material-ui/core/styles';
import {
  Drawer, fade,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './sidebar.scss';
import { useSelector, connect } from 'react-redux';
import ReDrawer from './ReDrawer';
import { IInitialState } from '../../index';
import RSCloneServiceContext from '../rsCloneServiceContext';
import { getUserData, onCloseSidebar, onOpenSidebar } from '../../store/actionsCreators/actionsCreators';

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
    shortcuts?: string[],
}

type Props = {
  // eslint-disable-next-line no-unused-vars
  getUserData: any
  onCloseSidebar: any,
  onOpenSidebar: any
}

// eslint-disable-next-line no-shadow
const Sidebar: React.FC<Props> = ({ getUserData, onCloseSidebar, onOpenSidebar }: Props) => {
  const [open, setOpen] = useState(true);
  const data = useSelector((state: IInitialState) => state.userData);
  const [userData, setUserData] = useState<UserData>(data);
  const service = useContext(RSCloneServiceContext);
  const classes = useStyles();

  useEffect(() => {
    const takeUserData = async () => {
      const userShortcuts = await service.getUser().then((res) => res.shortcuts);
      getUserData(userShortcuts);
    };
    takeUserData();
  }, []);

  const toggleSidebar = (): void => {
    // eslint-disable-next-line no-unused-expressions
    open ? onCloseSidebar() : onOpenSidebar();
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

export default connect(null, { getUserData, onCloseSidebar, onOpenSidebar })(Sidebar);

import React, { useState } from 'react';
import {
  makeStyles, Theme, createStyles,
} from '@material-ui/core/styles';
import {
  List, ListItem, ListItemText, Button,
  Drawer, ListItemIcon, Divider,
} from '@material-ui/core';
import DateRangeTwoToneIcon from '@material-ui/icons/DateRangeTwoTone';
import BubbleChartTwoToneIcon from '@material-ui/icons/BubbleChartTwoTone';
import MenuTwoToneIcon from '@material-ui/icons/MenuTwoTone';
import GradeTwoToneIcon from '@material-ui/icons/GradeTwoTone';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
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
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
      <Button onClick={toggleSidebar} variant="contained" color="primary">Hide</Button>
      <div className={classes.toolbar} />
      <List>
        <ListItem button onClick={onItemSelected}>
          <ListItemIcon><DateRangeTwoToneIcon /></ListItemIcon>
          <ListItemText primary="DAILY NOTES" />
        </ListItem>
        <ListItem button onClick={onItemSelected}>
          <ListItemIcon><BubbleChartTwoToneIcon /></ListItemIcon>
          <ListItemText primary="GRAPH OVERVIEW" />
        </ListItem>
        <ListItem button onClick={onItemSelected}>
          <ListItemIcon><MenuTwoToneIcon /></ListItemIcon>
          <ListItemText primary="ALL PAGES" />
        </ListItem>
        <Divider />
        <ListItem button onClick={onItemSelected}>
          <ListItemIcon><GradeTwoToneIcon /></ListItemIcon>
          <ListItemText primary="SHORTCUTS" />
        </ListItem>
      </List>
    </div>
  );

  if (!open) {
    return <Button onClick={toggleSidebar} variant="contained" color="primary">Hide</Button>;
  }
  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Button onClick={toggleSidebar} variant="contained" color="primary">Hide</Button>
      {/* <Drawer */}
      {/*  variant="temporary" */}
      {/*  anchor="left" */}
      {/*  open={mobileOpen} */}
      {/*  onClose={handleDrawerToggle} */}
      {/*  classes={{ */}
      {/*    paper: classes.drawerPaper, */}
      {/*  }} */}
      {/*  ModalProps={{ */}
      {/*    keepMounted: true, */}
      {/*  }} */}
      {/* > */}
      {/*  {drawer} */}
      {/* </Drawer> */}
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

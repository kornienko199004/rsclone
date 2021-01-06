import React, { useState } from 'react';
import {
  makeStyles, Theme, createStyles,
} from '@material-ui/core/styles';
import {
  List, ListItem, ListItemText, Button,
  Drawer, ListItemIcon, Divider, fade,
} from '@material-ui/core';
import DateRange from '@material-ui/icons/DateRange';
import BubbleChart from '@material-ui/icons/BubbleChart';
import Menu from '@material-ui/icons/Menu';
import Grade from '@material-ui/icons/Grade';

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
      <List className={classes.link}>
        <ListItem button onClick={onItemSelected} className={classes.linkItem}>
          <ListItemIcon><DateRange htmlColor="#5c7080" /></ListItemIcon>
          <ListItemText primary="DAILY NOTES" />
        </ListItem>
        <ListItem button onClick={onItemSelected} className={classes.linkItem}>
          <ListItemIcon><BubbleChart htmlColor="#5c7080" /></ListItemIcon>
          <ListItemText primary="GRAPH OVERVIEW" />
        </ListItem>
        <ListItem button onClick={onItemSelected} className={classes.linkItem}>
          <ListItemIcon><Menu htmlColor="#5c7080" /></ListItemIcon>
          <ListItemText primary="ALL PAGES" />
        </ListItem>
        <Divider className={classes.divider} />
        <ListItem button onClick={onItemSelected} className={classes.linkItem}>
          <ListItemIcon><Grade htmlColor="#5c7080" /></ListItemIcon>
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

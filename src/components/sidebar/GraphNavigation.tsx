import React from 'react';
import './sidebar.scss';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  makeStyles, createStyles,
} from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  expandIcon: {
    width: '17px',
    height: '17px',
    paddingLeft: '5px',
  },
}));

const GraphNavigation = (props: { name: string | null }) => {
  const { name } = props;
  const classes = useStyles();
  console.log(`${name}dasdas`);
  return (
    <>
      <div className="graph-navigation">
        <span>{name || 'AKESEEY'}</span>
        <ExpandMoreIcon htmlColor="#5c7080" viewBox="0 0 20 20" className={classes.expandIcon} />
      </div>

    </>
  );
};

export default GraphNavigation;

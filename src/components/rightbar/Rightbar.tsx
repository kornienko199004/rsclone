import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { useSelector, connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { IInitialState } from '../../index';
import { onCloseRightSidebar } from '../../store/actionsCreators/actionsCreators';
import RightSidebarGraph from './RightSidebarGraph';

type DispatchProps = {
  onCloseRightSidebar: () => void
}
type Props = DispatchProps;

const useStyles = makeStyles(() => ({

  drawerPaper: {
    width: '500px',
    height: '100vh',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

// eslint-disable-next-line no-shadow
const Rightbar = ({ onCloseRightSidebar }: Props) => {
  const classes = useStyles();
  const open = useSelector<Pick<IInitialState, 'rightSidebarIsOpen'>, boolean>(((state) => state.rightSidebarIsOpen));
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onCloseRightSidebar}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <RightSidebarGraph />
    </Drawer>
  );
};

export default connect<{}, DispatchProps>(null, { onCloseRightSidebar })(Rightbar);

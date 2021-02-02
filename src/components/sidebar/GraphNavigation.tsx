import React, { Dispatch, SetStateAction, useState } from 'react';
import './sidebar.scss';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  makeStyles, createStyles,
} from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
// import { Redirect, useHistory } from 'react-router-dom';
// import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// import { compose } from 'redux';
import { useHistory } from 'react-router';
import Modal from '@material-ui/core/Modal';
import { UserData } from './Sidebar';
// import MenuItemWithModal from './MenuItemWithModal';
import { userLoggedOut } from '../../store/actionsCreators/actionsCreators';
import UserSettings from './UserSettings';

const useStyles = makeStyles(() => createStyles({
  expandIcon: {
    width: '17px',
    height: '17px',
    paddingLeft: '5px',
  },
  menu: {
    zIndex: 222222,
  },
  modalContent: {
    width: '200px',
    height: '200px',
    backgroundColor: 'blue',
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  modal: {
    zIndex: 2222222,
  },
}));

type Props = {
    userData: UserData,
    setUserData: Dispatch<SetStateAction<UserData>>,
    onUserLoggedOut: () => {type: string, isLoggedIn: boolean}
}
const GraphNavigation: React.FC<Props> = (
  {
    userData, setUserData, onUserLoggedOut,
  }
  : Props,
) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const history = useHistory();

  const onOpenMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const onOpenModal = () => {
    setAnchorEl(null);
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
    setAnchorEl(null);
  };

  const onLogout = () => {
    onUserLoggedOut();
    history.push('/');
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div className="graph-navigation" onClick={onOpenMenu} role="button" tabIndex={0}>
        <span>{userData?.username}</span>
        <ExpandMoreIcon htmlColor="#5c7080" viewBox="0 0 20 20" className={classes.expandIcon} />
      </div>
      { openModal ? (
        <Modal
          className={classes.modal}
          open={openModal}
          onClose={onCloseModal}
          disableEnforceFocus
        >
          <UserSettings userData={userData} setUserData={setUserData} />
        </Modal>
      ) : (
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={onCloseMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuList id="menu-list-grow" autoFocus={false} autoFocusItem={false} onClick={onOpenModal} variant="menu">
            <MenuItem onClick={onCloseMenu}>Edit profile</MenuItem>
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </MenuList>
        </Popover>
      ) }
    </>
  );
};

export default connect(null, { onUserLoggedOut: userLoggedOut })(GraphNavigation);

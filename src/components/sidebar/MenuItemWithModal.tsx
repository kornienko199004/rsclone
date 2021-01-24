import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import React, { Dispatch, SetStateAction } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import UserSettings from './UserSettings';
import { UserData } from './Sidebar';

const useStyles = makeStyles(() => createStyles({
  modal: {
    zIndex: 2222222,
  },
}));

type Props = {
    userData: UserData,
    open: boolean,
    setOpenModal: Function
    setAnchorEl: Function
    onCloseMenu: () => void
    setUserData: Dispatch<SetStateAction<UserData>>
}

const MenuItemWithModal: React.FC<Props> = (
  {
    open, userData, setOpenModal, setAnchorEl, onCloseMenu, setUserData,
  }: Props,
) => {
  const classes = useStyles();
  const onCloseModal = () => {
    setOpenModal(false);
    setAnchorEl(null);
  };

  return (
    <>
      <MenuItem onClick={onCloseMenu}>Edit profile</MenuItem>
      <Modal
        className={classes.modal}
        open={open}
        onClose={onCloseModal}
      >
        <UserSettings userData={userData} setUserData={setUserData} />
      </Modal>
    </>
  );
};

export default MenuItemWithModal;

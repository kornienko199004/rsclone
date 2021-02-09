import React, {
  Dispatch, SetStateAction, useContext, useState,
} from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import { UserData } from './Sidebar';
import RSCloneServiceContext from '../rsCloneServiceContext';

const useStyles = makeStyles(() => createStyles({
  textField: {
    marginTop: '15px',
    input: {
      '&::placeholder': {
        color: '#bff7ff',
      },
    },
  },
}));

const styles = () => ({
  root: {
    '&label.Mui-focused': {
      color: 'orange',
    },
    '&.MuiInputBase-input': {
      color: 'orange',
    },
  },
});

type Props = {
    userData: UserData
    setUserData: Dispatch<SetStateAction<UserData>>
    // stylesForInput?: any
}

// const defaultProps = {
//   stylesForInput: null,
// };

type DataState = {
    username: string,
    email: string
}

type PasswordData = {
    // eslint-disable-next-line camelcase
    old_password: string,
    // eslint-disable-next-line camelcase
    new_password: string,
    confirm: string,
}

const UserSettings: React.FC<Props> = ({ userData, setUserData } : Props) => {
  const classes = useStyles();
  const service = useContext(RSCloneServiceContext);
  const [dataState, setDataState] = useState<DataState>({
    username: '',
    email: '',
  });
  const [passwordData, setPasswordData] = useState<PasswordData>({
    // eslint-disable-next-line camelcase
    old_password: '',
    // eslint-disable-next-line camelcase
    new_password: '',
    confirm: '',
  });

  const onDataStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataState({
      ...dataState,
      [name]: value,
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget.name;

    switch (form) {
      case 'username':
        service.updateUser({
          name: dataState.username,
        });
        setUserData({
          ...userData,
          username: dataState.username,
        });
        localStorage.setItem('username', dataState.username);
        break;
      case 'email':
        service.updateUser({
          email: dataState.email,
        });
        setUserData({
          ...userData,
          email: dataState.email,
        });
        localStorage.setItem('email', dataState.email);
        break;
      default:
        if (passwordData.new_password === passwordData.confirm) {
          try {
            service.userUpdatePassword({
              // eslint-disable-next-line camelcase
              old_password: passwordData.old_password,
              // eslint-disable-next-line camelcase
              new_password: passwordData.new_password,
            });
          } catch (e) {
            throw new Error(`something was wrong. Error: ${e}`);
          }
        } else throw new Error('check your new passwords');
    }
    return true;
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  return (
    <div className="user-settings">
      <h2 className="user-settings__title">Account details</h2>
      <form name="username" className="user-settings-form" onSubmit={onSubmit}>
        <span>Name</span>
        <TextField name="username" placeholder={userData.username as string} variant="outlined" onChange={onDataStateChange} />
      </form>
      <form name="email" className="user-settings-form" onSubmit={onSubmit}>
        <span>Email</span>
        <TextField name="email" placeholder={userData.email as string} variant="outlined" onChange={onDataStateChange} type="email" />
      </form>
      <h2 className="user-settings__title privacy">Privacy</h2>
      <form name="password" className="user-settings-form password" onSubmit={onSubmit}>
        <TextField name="old_password" onChange={onChangePassword} classes={{ root: classes.textField }} label="Enter your current password" required />
        <TextField name="new_password" onChange={onChangePassword} classes={{ root: classes.textField }} label="Enter your new password" required />
        <TextField name="confirm" onChange={onChangePassword} classes={{ root: classes.textField }} label="Confirm your new password" required />
        <Button className="button" variant="contained" type="submit">Change</Button>
      </form>
    </div>
  );
};

// UserSettings.defaultProps = defaultProps;

export default withStyles(styles)(UserSettings);

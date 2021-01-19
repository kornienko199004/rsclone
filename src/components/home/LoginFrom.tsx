import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RSCloneServiceContext from '../rsCloneServiceContext';
import { userLoggedIn } from '../../store/actions/actions';

const useStyles = makeStyles(() => createStyles({
  textField: {
    padding: '7px',
  },
}));

interface ILoginForm {
    email: string,
    password: string
}

const LoginForm = ({ onUserLoggedIn }: { onUserLoggedIn: () => object }) => {
  const classes = useStyles();
  const history = useHistory();
  const service = useContext(RSCloneServiceContext);

  const [data, setData] = useState<ILoginForm>({
    email: '',
    password: '',
  });

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const onSubmitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    service.login(data)
      .then(() => {
        onUserLoggedIn();
        history.push('/app');
      });
  };

  return (
    <form className="registration" onSubmit={onSubmitForm}>
      <TextField name="email" className={classes.textField} onChange={onInputChange} label="e-mail" variant="outlined" type="email" required />
      <TextField name="password" className={classes.textField} onChange={onInputChange} label="password" variant="outlined" type="password" required />
      <Button type="submit" variant="outlined">Sign In</Button>
    </form>
  );
};

const mapStateToProps = ({ isLoggedIn } : {isLoggedIn: boolean}) => ({
  isLoggedIn,
});

export default connect(mapStateToProps, { onUserLoggedIn: userLoggedIn })(LoginForm);

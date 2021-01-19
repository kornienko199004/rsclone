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

interface IRegistrationForm {
    name: string,
    email: string,
    password: string
}

const RegistrationForm = (
  { isLoggedIn, onUserLoggedIn } : {isLoggedIn: boolean, onUserLoggedIn: () => object},
) => {
  const classes = useStyles();
  const [data, setData] = useState<IRegistrationForm>({
    name: '',
    email: '',
    password: '',
  });

  const history = useHistory();
  const service = useContext(RSCloneServiceContext);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const onSubmitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    service.createUser(data).then(async () => {
      console.log(isLoggedIn);
      await service.login(data)
        .then(async () => {
          onUserLoggedIn();
          history.push('/app');
        });
    });
  };

  return (
    <form className="registration" onSubmit={onSubmitForm}>
      <TextField name="name" className={classes.textField} onChange={onInputChange} label="username" variant="outlined" required />
      <TextField name="email" className={classes.textField} onChange={onInputChange} label="e-mail" variant="outlined" type="email" required />
      <TextField name="password" className={classes.textField} onChange={onInputChange} label="password" variant="outlined" type="password" required />
      <Button type="submit" variant="outlined">Register</Button>
    </form>
  );
};

const mapStateToProps = ({ isLoggedIn } : {isLoggedIn: boolean}) => ({
  isLoggedIn,
});

export default connect(mapStateToProps, { onUserLoggedIn: userLoggedIn })(RegistrationForm);

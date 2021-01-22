import React, { useState } from 'react';
import './home.scss';

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import roamGroup from './assets/Roam-Group-min.png';
import hujakIcon from './assets/HujakHujakProd.png';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginFrom';

const useStyles = makeStyles(() => createStyles({
  loginButton: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '15px',
    '&:hover': {
      backgroundColor: 'rgb(255 255 255 / 0.3)',
    },
  },
  signUpButton: {
    marginTop: '15px',
    padding: '10px',
    paddingLeft: '15px',
    paddingRight: '15px',
    fontFamily: 'Inter, sans-serif',
    textTransform: 'none',
    fontWeight: 'bold',
    backgroundColor: 'rgb(19, 124, 189)',
    letterSpacing: '0.04em',
  },
  registrationForm: {
    width: '500px',
    height: '500px',
    backgroundColor: '#fff',
    position: 'absolute',
    left: '30%',
    top: '20%',
  },
  divider: {
    backgroundColor: '#ffff',
  },
}));
const Home = () => {
  const classes = useStyles();
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const onSignUpOpen = () => {
    setSignUpOpen(true);
  };

  const onSignUpClose = () => {
    setSignUpOpen(false);
  };

  const onSignInOpen = () => {
    setSignInOpen(true);
  };

  const onSignInClose = () => {
    setSignInOpen(false);
  };

  const signUpModalBody = (
    <div className={classes.registrationForm}>
      <RegistrationForm />
    </div>
  );

  const singInModalBody = (
    <div className={classes.registrationForm}>
      <LoginForm />
    </div>
  );

  return (
    <div className="home">
      <div className="home__header">
        <div className="home__header-logo">
          <img width="20%" src={hujakIcon} alt="header logo" />
        </div>
        <div className="home__header-login">
          <Button className={classes.loginButton} color="default" onClick={onSignInOpen}>Sign In</Button>
          <Modal open={signInOpen} onClose={onSignInClose}>
            {singInModalBody}
          </Modal>
        </div>
      </div>
      <div className="home__main">
        <section className="block">
          <div className="block__description">
            <div className="home__main_title">
              <span>A note-taking tool</span>
              <span>for networked thought.</span>
            </div>
            <div className="home__main_subtitle">
              As easy to use as a document. As powerful as a graph database.
              Roam helps you organize your research for the long haul.
            </div>
          </div>
        </section>
        <Button className={classes.signUpButton} variant="contained" color="primary" onClick={onSignUpOpen}>Sign Up</Button>
        <Modal open={signUpOpen} onClose={onSignUpClose}>
          {signUpModalBody}
        </Modal>
        <div>
          <img width="100%" src={roamGroup} alt="roam group" />
        </div>
      </div>
      <div className="home__footer">
        <div className="home__footer-createdBy">
          <span>Made by</span>
          <div className="home__footer-avatars">
            <div className="home__footer-avatar">
              <a href="https://github.com/kornienko199004" target="_blank" rel="noreferrer" className="home__footer-avatars_link">
                <Avatar alt="Aleksey" src="https://avatars1.githubusercontent.com/u/30842914?s=460&v=4" />
              </a>
              <Divider orientation="vertical" variant="middle" className={classes.divider} />
            </div>
            <div className="home__footer-avatar">
              <a href="https://github.com/mary-jane77" target="_blank" rel="noreferrer" className="home__footer-avatars_link">
                <Avatar alt="Elizabeth" src="https://avatars2.githubusercontent.com/u/58233456?s=460&v=4" />
              </a>
              <Divider orientation="vertical" variant="middle" className={classes.divider} />
            </div>
            <div className="home__footer-avatar">
              <a href="https://github.com/GertValiakhmetov" target="_blank" rel="noreferrer" className="home__footer-avatars_link">
                <Avatar alt="Gert" src="https://avatars2.githubusercontent.com/u/52245456?s=460&u=0418cf1c43f231691c7a93e764f71448bc8e932a&v=4" />
              </a>
              <Divider orientation="vertical" variant="middle" className={classes.divider} />
            </div>
            <div className="home__footer-avatar">
              <a href="https://github.com/kirill-study" target="_blank" rel="noreferrer" className="home__footer-avatars_link">
                <Avatar alt="Kirill" src="https://avatars1.githubusercontent.com/u/23706384?s=460&v=4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

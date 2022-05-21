import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LABELS, ROUTES } from '../../constants';

import Auth from '../../utils/auth';

import styles from './Nav.module.css';

const NavBar = () => {
  const location = useLocation().pathname;

  const Home = location === '/' ? true : false;
  const Alk = location === '/alkalinity-form' ? true : false;
  const Salt = location === '/salt-form' ? true : false;
  const Chlorine = location === '/chlorine-form' ? true : false;

  const isLoggedIn = Auth.isLoggedIn();

  const handleLogout = () => Auth.logout();

  return (
    <div className={styles.container}>
      <Link className={styles.link} to='/'>
        <button className={Home ? `${styles.active}` : `${styles.draw}`}>
          Home
        </button>
      </Link>
      <Link to='/alkalinity-form'>
        <button className={Alk ? `${styles.active}` : `${styles.draw}`}>
          Alkalinity form
        </button>
      </Link>
      <Link to='/salt-form'>
        <button className={Salt ? `${styles.active}` : `${styles.draw}`}>
          Salt form
        </button>
      </Link>
      <Link to='/chlorine-form'>
        <button className={Chlorine ? `${styles.active}` : `${styles.draw}`}>
          Chlorine form
        </button>
      </Link>
      <Link to={isLoggedIn ? ROUTES.home : ROUTES.login}>
        <button
          className={styles.draw}
          onClick={isLoggedIn ? handleLogout : null}
        >
          {isLoggedIn ? LABELS.logout : LABELS.loginForm.header}
        </button>
      </Link>
    </div>
  );
};

export default NavBar;

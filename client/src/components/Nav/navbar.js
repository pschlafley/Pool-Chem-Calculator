import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

const NavBar = () => {
  return (
    <div className={styles.container}>
      <Link className={styles.link} to='/'>
        <button className={styles.draw}>Home</button>
      </Link>
      <Link to='/alkalinity-form'>
        <button className={styles.draw}>Alkalinity form</button>
      </Link>
      <Link to='/salt-form'>
        <button className={styles.draw}>Salt form</button>
      </Link>
      <Link to='/chlorine-form'>
        <button className={styles.draw}>Chlorine form</button>
      </Link>
    </div>
  );
};

export default NavBar;

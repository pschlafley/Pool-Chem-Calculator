import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../Nav/Nav.module.css';

const ButtonLink = ({ to, label }) => {
  return (
    <div className={styles.container}>
      <Link className={styles.link} to={to}>
        <button className={styles.draw}>{label}</button>
      </Link>
    </div>
  );
};

export default ButtonLink;

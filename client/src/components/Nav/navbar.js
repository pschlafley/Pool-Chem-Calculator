import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';


const NavBar = () => {
    return (
        <div className={styles.container}>
            <Link className={styles.listItem} to='/salt-form'>Salt Form</Link>
            <Link className={styles.listItem} to='/alkalinity-form'>Alkalinty Form</Link>
            <Link className={styles.listItem} to='/'>Home</Link>
        </div>
    );
};

export default NavBar;
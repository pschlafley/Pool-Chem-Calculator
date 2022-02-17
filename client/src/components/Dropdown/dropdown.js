import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styles from './dd.module.css';

import useStyles from 'isomorphic-style-loader/useStyles';

// here is the link for the webpage that I found to create this dropdown menu
// https://andela.com/insights/react-js-tutorial-on-creating-a-custom-select-dropdown/

const DropDown = () => {
    useStyles(styles);

    const [isOpen, setIsOpen] = useState(false);

    const toggling = () => setIsOpen(!isOpen);
    return (
        <>
            <section className={styles.ddContainer} onClick={toggling}>
                <div className={styles.lineOne}></div>
                <div className={styles.lineTwo}></div>
                <div className={styles.lineThree}></div>
            </section>
            <div>
                {isOpen && (
                    <section className={styles.ddListContainer}>
                        <ul className={styles.ddList}>
                            <li>
                                <Link to='/alkalinity-form'>
                                    <button className={styles.draw}>Alkalinity</button>
                                </Link>
                            </li>
                            <li>
                                <Link to='/salt-form'>
                                    <button className={styles.draw}>Salt</button>
                                </Link>
                            </li>
                        </ul>
                    </section>
                )}
            </div>
        </>
    );
}

export default DropDown;
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styles from './dd.module.css';

// here is the link for the webpage that I found to create this dropdown menu
// https://andela.com/insights/react-js-tutorial-on-creating-a-custom-select-dropdown/

const DropDown = () => {

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
                    <div className={styles.ddListContainer}>
                        <ul className={styles.ddList}>
                            <li>
                                <Link className={styles.listItem} to='/alkalinity-form'>
                                    <button>Alkalinity</button>
                                </Link>
                            </li>
                            <li >
                                <Link className={styles.listItem} to='/salt-form'>Salt</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}

export default DropDown;
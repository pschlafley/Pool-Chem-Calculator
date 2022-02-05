import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styles from './dd.module.css';

const DropDown = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggling = () => setIsOpen(!isOpen);
    return (
        <div>
            <div className={styles.ddContainer}>
                <p className={styles.ddHeader} onClick={toggling}>Forms:</p>
                {isOpen && (
                    <div>
                        <div >
                            <ul className={styles.ddList}>
                                <li>
                                    <Link className={styles.listItem} to='/alkalinity-form'>Alkalinity</Link>
                                </li>
                                <li>
                                    <Link className={styles.listItem} to='/salt-form'>Salt </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}

export default DropDown;
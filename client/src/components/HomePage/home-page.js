import React from "react";
import styles from './hp.module.css';
import DropDown from "../Dropdown/dropdown";

function Home() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.backgroundImage}></div>
                <div className={styles.textCenter}>
                    <p>Welcome to the best pool calculator on the web!</p>
                    <br />
                    <DropDown />
                </div>
            </div>
        </>
    );
}

export default Home;
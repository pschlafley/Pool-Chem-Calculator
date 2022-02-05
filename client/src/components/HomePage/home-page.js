import React from "react";
import styles from './hp.module.css';
import DropDown from "../Dropdown/dropdown";

// background image photo credits
// Photo by <a href="https://unsplash.com/@josecasado?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">José Casado</a> on <a href="https://unsplash.com/s/photos/jumping-into-pool?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>


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
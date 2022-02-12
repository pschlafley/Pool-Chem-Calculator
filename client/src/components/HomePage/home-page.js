import React from "react";
import styles from './hp.module.css';
import DropDown from "../Dropdown/dropdown";

// background image photo credits
// Photo by <a href="https://unsplash.com/@josecasado?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">José Casado</a> on <a href="https://unsplash.com/s/photos/jumping-into-pool?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
// Photo by Pixabay: https://www.pexels.com/photo/blue-lounger-beside-swimming-pool-221457/

function Home() {
    console.log(window.innerWidth)
    return (
        <>
            <div className={styles.container}>
                <div className={styles.backgroundImage}>
                    <div className={styles.contentContainer}>
                        <div className={styles.ddPosition}>
                            <DropDown />
                        </div>
                        <div className={styles.textCenter}>
                            <p>Welcome to the best pool calculator on the web!</p>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
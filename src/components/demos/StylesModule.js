import React from "react";
import styles from "../../assets/styles/StylesModuleDemo.module.css";

function StylesModule() {
    return (
        <div className={styles.flexContainer}>
            <div className={styles.moduleDemo}>CSS Module as a function.</div>
        </div>
    );    
}

export default StylesModule;
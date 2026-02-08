import Button from './Button';
import styles from './App.module.css';
import {useState} from "react";

function App() {
    return (
        <div>
            <h1 className={styles.title}>{count}</h1>
            <button onClick={onClick}>click me!</button>
        </div>
    );
}

export default App;

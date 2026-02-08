import styles from './App.module.css';
import {useEffect, useState} from "react";

function App() {
    const [count, setCount] = useState(0);
    const onClick = () => setCount(previous => previous + 1);

    const [keyword, setKeyword] = useState("")
    const onChange = (e) => setKeyword(_ => e.target.value);

    console.log("I run all the time.");
    const isRunOnlyOnce = () => console.log("I run only once.");
    useEffect(isRunOnlyOnce, []);
    useEffect(
        () => {
            if (keyword.length !== "" && keyword.length > 5) {
                console.log(`Search for ${keyword}`)
            }
        },
        [keyword]
    );
    useEffect(
        () => console.log("I run when keyword or count changes."),
        [keyword, count]
    );

    return (
        <div>
            <input
                value={keyword}
                onChange={onChange}
                type="text"
                placeholder="Type something..."
            />
            <h1 className={styles.title}>{count}</h1>
            <button onClick={onClick}>click me!</button>
        </div>
    );
}

export default App;

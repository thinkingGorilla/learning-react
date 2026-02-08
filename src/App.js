import {useEffect, useState} from "react";

// return이 없으면 undefined를 반환
function Hello() {
    useEffect(() => console.log("Hello"), []);
    useEffect(() => () => console.log("Goodbye"), []);

    return <h1>Hello</h1>;
}

function App() {
    const [showing, setShowing] = useState(false);
    const onClick = () => setShowing(previous => !previous);

    return (
        <div>
            {showing && <Hello/>}
            <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
        </div>
    );
}

export default App;

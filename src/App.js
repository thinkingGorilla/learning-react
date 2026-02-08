import {useEffect, useState} from "react";

// 자바스크립트에서 return이 없으면 undefined를 반환
function Hello() {
    useEffect(() => console.log("Hello"), []);
    // effect 파라미터가 함수를 반환하는 경우 언마운트 시점에 해당 함수를 호출
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

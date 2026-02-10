import {useState} from "react";

function App() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);

    const onChange = (e) => setTodo(unused => e.target.value);
    const onSubmit = (e) => {
        e.preventDefault();
        if (todo.trim().length === 0) return;

        // reset the input field
        setTodo("");
        // add todo to the list
        setTodos(current => [todo, ...current]);
    }

    return (
        <div>
            <h1>My Todos ({todos.length})</h1>
            <form onSubmit={onSubmit}>
                <input onChange={onChange}
                       type="text"
                       value={todo}
                       placeholder="Write your to do..."
                />
                <button>Add Todo</button>
            </form>
            <hr/>
            <ul>
                {
                    // key는 React의 Virtual DOM diff 알고리즘을 위해 사용한다.
                    // 실제 DOM에는 렌더링되지 않는다.
                }
                {todos.map((value, index) => <li key={index}>{value}</li>)}
            </ul>
        </div>
    );
}

export default App;

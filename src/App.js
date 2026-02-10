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
        </div>
    );
}

export default App;

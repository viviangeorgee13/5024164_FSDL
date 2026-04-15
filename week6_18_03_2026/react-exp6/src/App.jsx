import { useState, useRef } from "react";
import "./App.css";

function App() {
  // JSX + Props concept
  const name = "Vivian";

  // State + Events
  const [count, setCount] = useState(0);

  // Form + List + Ref
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef();

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, task]);
    setTask("");
    inputRef.current.focus(); // Ref usage
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div>
      <h1>React Experiment 6</h1>

      <div className="container">

        {/* Welcome Section */}
        <h2>Welcome Section</h2>
        <p>Hello, {name} 👋</p>

        <hr />

        {/* Counter */}
        <h2>Counter</h2>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increase</button>
        <button onClick={() => setCount(count - 1)}>Decrease</button>

        <hr />

        {/* To-Do */}
        <h2>To-Do Manager</h2>

        <input
          ref={inputRef}
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTask}>Add</button>

        <ul>
          {tasks.length === 0 ? (
            <p>No tasks added</p>
          ) : (
            tasks.map((t, index) => (
              <li key={index}>
                {t}
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(index)}
                >
                  X
                </button>
              </li>
            ))
          )}
        </ul>

      </div>
    </div>
  );
}

export default App;
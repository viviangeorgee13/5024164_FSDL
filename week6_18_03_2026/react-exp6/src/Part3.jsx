import { useState, useRef } from "react";

function Part3() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const inputRef = useRef();

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, task]);
    setTask("");

    // Focus back to input using ref
    inputRef.current.focus();
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <h2>Part 3: To-Do List</h2>

      {/* Form */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>Add</button>

      {/* List */}
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
  );
}

export default Part3;
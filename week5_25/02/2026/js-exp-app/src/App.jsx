import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const addTask = (e) => {
    e.preventDefault();

    try {
      if (task.trim() === "") {
        throw new Error("Task cannot be empty");
      }
      if (task.length < 3) {
        throw new Error("Task must be at least 3 characters");
      }

      const newTask = {
        text: task,
        date: new Date().toLocaleString()
      };

      setTasks([...tasks, newTask]);
      setTask("");
      setError("");

    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div style={styles.bg}>
      <div style={styles.container}>
        <h1 style={styles.title}>📝 To-Do List</h1>

        <form onSubmit={addTask} style={styles.form}>
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={styles.input}
          />
          <button style={styles.addBtn}>Add</button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        <ul style={styles.list}>
          {tasks.map((t, index) => (
            <li key={index} style={styles.item}>
              <div>
                <strong>{t.text}</strong><br />
                <small style={styles.date}>{t.date}</small>
              </div>
              <button
                onClick={() => deleteTask(index)}
                style={styles.delete}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333"
  },
  form: {
    display: "flex",
    gap: "10px"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  addBtn: {
    padding: "10px 15px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  error: {
    color: "red",
    marginTop: "10px",
    textAlign: "center"
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px"
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f9f9f9",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px"
  },
  date: {
    color: "#888",
    fontSize: "12px"
  },
  delete: {
    background: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default App;
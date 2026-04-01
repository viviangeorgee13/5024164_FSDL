import { useRef } from "react";

function Part1({ task, setTask, addTask }) {
  const inputRef = useRef();

  return (
    <div style={styles.card}>
      <h2>Add Task</h2>
      <input
        ref={inputRef}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
        style={styles.input}
      />
      <button onClick={() => {
        addTask();
        inputRef.current.focus();
      }} style={styles.btn}>
        Add
      </button>
    </div>
  );
}

const styles = {
  card:{padding:"20px",background:"#1c1c1c",color:"#fff",borderRadius:"10px"},
  input:{padding:"10px",marginRight:"10px"},
  btn:{padding:"10px",background:"#00c6ff",border:"none",color:"#fff"}
};

export default Part1;
import { useState } from "react";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div style={styles.bg}>
      <h1>To-Do Manager</h1>

      <Part3>
        <>
          <Part1 task={task} setTask={setTask} addTask={addTask} />
          <Part2 tasks={tasks} deleteTask={deleteTask} />
        </>
      </Part3>
    </div>
  );
}

const styles = {
  bg:{padding:"20px",minHeight:"100vh",background:"#243b55",color:"#fff"}
};

export default App;
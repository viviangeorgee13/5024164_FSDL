function Part2({ tasks, deleteTask }) {
  return (
    <div style={styles.card}>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((t, i) => (
          <li key={i}>
            {t}
            <button onClick={() => deleteTask(i)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles={
card:{padding:"20px",background:"#1c1c1c",color:"#fff",borderRadius:"10px"}
};

export default Part2;
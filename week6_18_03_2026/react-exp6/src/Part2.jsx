import { useState } from "react";

function Part2() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h2>Part 2: State + Events</h2>

      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
}

export default Part2;
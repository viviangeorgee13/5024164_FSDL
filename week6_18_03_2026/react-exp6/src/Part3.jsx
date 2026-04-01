import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Part3({ children }) {
  return (
    <Router>
      <nav style={{ marginBottom: "10px" }}>
        <Link to="/">All</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={children} />
        <Route path="/about" element={<h3>To-Do App using React</h3>} />
      </Routes>
    </Router>
  );
}

export default Part3;
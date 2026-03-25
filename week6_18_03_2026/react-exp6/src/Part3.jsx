import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import {useRef} from "react";

function Home(){return <h3>Home Page</h3>;}

function About(){
const inputRef=useRef();
return(
<div>
<input ref={inputRef} placeholder="Click button"/>
<button onClick={()=>inputRef.current.focus()}>Focus</button>
</div>
);
}

function List(){
const items=["Apple","Banana","Mango"];
return(
<ul>
{items.map((item,i)=><li key={i}>{item}</li>)}
</ul>
);
}

function Part3(){
return(
<div style={{border:"1px solid black",padding:"10px",margin:"10px"}}>
<h2>Part 3: Router, Ref, Keys</h2>

<Router>
<nav>
<Link to="/">Home</Link> |{" "}
<Link to="/about">About</Link> |{" "}
<Link to="/list">List</Link>
</nav>

<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/about" element={<About/>}/>
<Route path="/list" element={<List/>}/>
</Routes>
</Router>

</div>
);
}

export default Part3;
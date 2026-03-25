import {useState} from "react";

function Display({value}){
return <h3>Count: {value}</h3>;
}

function Part2(){
const[count,setCount]=useState(0);

return(
<div style={{border:"1px solid black",padding:"10px",margin:"10px"}}>
<h2>Part 2: State & Props</h2>
<button onClick={()=>setCount(count+1)}>Increase</button>
<Display value={count}/>
</div>
);
}

export default Part2;
import React from "react";
import "./input.css"
const Input = (props)=>{
    // const [state,setState] = useState();
    
    return (
      <>

       <input type="text" placeholder="Enter task..." value={props.val} onChange={props.change}></input>
 
      </>
    )
}

export default Input;

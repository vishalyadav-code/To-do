import React from "react";
import "./Button.css"
const Button = (props)=>{
    return (
        <>
        <button onClick={props.click} className="btn">+</button>
        </>
    )
}

export default Button;
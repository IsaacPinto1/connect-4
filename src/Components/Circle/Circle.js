import React from 'react'
import './Circle.css'

const Circle = (props) =>{

    return (
        <div className = "container">
            <div className = "circle" id = {String(props.index)} onClick={() =>{props.function(props.index)}} onMouseEnter = {() =>props.HandleHover(props.index)} onMouseLeave = {() =>props.HandleLeave(props.index)}></div>
        </div>
    )
}

export default Circle
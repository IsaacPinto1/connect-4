import React, {useState, useEffect} from 'react'
import './Board.css'
import Circle from '../Circle/Circle'


const Board = (props) =>{


    return(
        <div id = "boardContainer">
            <div id = "board">
                {props.boardVals.map((i, index)=><div className = "col">{i.map((x,y)=> <div className='tile'><Circle HandleHover = {props.HandleHover} HandleLeave = {props.HandleLeave} index = {[index,y]} function = {props.function}/></div>)}</div>)}
            </div>
        </div>
    )
}

export default Board
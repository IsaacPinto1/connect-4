import React, {useState, useEffect} from "react"
import Board from "../Board/Board"
import './Game.css'

const Game = () =>{

    const [boardVals, changeBoardVals] = useState(Array.apply("", Array(7)).map((i) => Array.apply("", Array(6)).map((i) => "")))

    const [myTurn, changeMyTurn] = useState(true)

    const [levels, changeLevels] = useState([5,5,5,5,5,5,5])

    const [gameState, changeGameState] = useState("going")

    const [winners, changeWinners] = useState([])

    const HandleClick = (pos) =>{
        if(boardVals[pos[0]][pos[1]] != "" || levels[pos[0]] != pos[1] || gameState != "going"){
            return
        }
        document.getElementById(String(pos)).style.backgroundColor = myTurn ? "red": "yellow";
        changeMyTurn(!myTurn)

        const newBoard = boardVals;
        newBoard[pos[0]][pos[1]] = myTurn ? "red": "yellow"
        changeBoardVals(newBoard)
        
        const newLevels = levels;
        levels[pos[0]]-= 1
        changeLevels(newLevels)

    }

    useEffect(()=>{
        const res = checkWin(boardVals)
        if(res.length == 4){
            changeGameState("winner")
            boardVals.forEach((x, i) => x.forEach((y, j) => {
                if(boardVals[i][j] == ""){
                    return
                }
                document.getElementById(String([i,j])).style.backgroundColor = "rgb(179, 179, 179)"
            res.forEach((val) =>{
                document.getElementById(String(val)).style.backgroundColor = boardVals[val[0]][val[1]]
            })
            changeWinners(res)
            }))
        } else if (res.length == 1){
            changeGameState("draw")
        }
    }, [myTurn])

    const Clear = () =>{
        changeBoardVals(Array.apply("", Array(7)).map((i) => Array.apply("", Array(6)).map((i) => "")))
        changeMyTurn(true)
        changeLevels([5,5,5,5,5,5,5])
        changeGameState("going")
        boardVals.forEach((x,i) => x.forEach((y,j)=> document.getElementById(String([i,j])).style.backgroundColor = 'white'))
        changeWinners([])
    }

    const HandleHover = (i) =>{
        if(i[1] != levels[i[0]] || gameState != "going"){
            return
        }
        document.getElementById(String(i)).style.backgroundColor = myTurn ? "lightcoral":"rgb(255, 255, 117)"
    }

    const HandleLeave = (i) =>{
        if(i[1] != levels[i[0]] || gameState != "going"){
            return
        }
        document.getElementById(String(i)).style.backgroundColor = "white"
    }

    const ShowHover = () =>{
        boardVals.forEach((x, i) => {x.forEach((y, j) => {
            if(boardVals[i][j] == ""){
                return
            }
            document.getElementById(String([i,j])).style.backgroundColor = boardVals[i][j]
        })})
    }

    const HideHover = (i) =>{
        boardVals.forEach((x,i) =>{x.forEach((y,j) =>{
            if(boardVals[i][j] == ""){
                return
            }
            document.getElementById(String([i,j])).style.backgroundColor = "rgb(179, 179, 179)"
            winners.forEach((val) =>{
                document.getElementById(String(val)).style.backgroundColor = boardVals[val[0]][val[1]]
            })
        })})
    }





    return (
        <div>
            <div id = "overallBoard">
                <Board boardVals = {boardVals} function = {HandleClick} HandleHover = {HandleHover} HandleLeave = {HandleLeave}/>
                <div id = "finish">
                    <div id = "stateAndShow">
                        {gameState == "going" ? "Next to move: " + (myTurn ? "Red": "Yellow"): gameState == "winner" ? (myTurn ? "Yellow": "Red") + " wins!": "It's a draw!"}
                        {gameState != "going" && <button onMouseEnter = {ShowHover} onMouseLeave = {HideHover} >Show</button>}
                    </div>
                </div>
            </div>
            <div id = "Reset">
                    <button onClick={Clear}>Reset</button>
                </div>
        </div>
    )
}

export default Game


const checkWin = (board) =>{
    let output = []
    let draw = true
    board.forEach((x, i) => x.forEach((val,j) =>{
        if(val == ""){
            draw = false
            return;
        }
        if(i < 4 && board[i][j]==board[i+1][j] && board[i+1][j] == board[i+2][j] && board[i+2][j] == board[i+3][j]){
            output = [[i,j],[i+1,j],[i+2,j],[i+3,j]]
            return true
        }
        if(j > 2 && board[i][j]==board[i][j-1] && board[i][j-1] == board[i][j-2] && board[i][j-2] == board[i][j-3]){
            output = [[i,j],[i,j-1],[i,j-2],[i,j-3]]
            return true
        }
        if(j > 2 && i < 4 && board[i][j]==board[i+1][j-1] && board[i+1][j-1] == board[i+2][j-2] && board[i+2][j-2] == board[i+3][j-3]){
            output = [[i,j],[i+1,j-1],[i+2,j-2],[i+3,j-3]]
            return true
        }
        if(i < 4 && j < 3 && board[i][j]==board[i+1][j+1] && board[i+1][j+1] == board[i+2][j+2] && board[i+2][j+2] == board[i+3][j+3]){
            output = [[i,j],[i+1,j+1],[i+2,j+2],[i+3,j+3]]
            return true
        }
        return false
    }) )
    if(draw && output.length == 0){
        return [-1]
    }
    return output
}
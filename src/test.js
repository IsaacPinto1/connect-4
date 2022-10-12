[["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""]]

const checkWin = (board) =>{
    let output = []
    board.forEach((x, i) => x.forEach((val,j) =>{
        if(val == ""){
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
    return output
}

console.log(checkWin([["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""]]))
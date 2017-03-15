/**
 * Created by Administrator on 2017/3/14.
 */
WIDTH=window.screen.availWidth;
HEIGHT=window.screen.availHeight;
gridContainerWidth=0.92*WIDTH;
cellSpace=0.04*WIDTH;
cellSlideWidth=0.18*WIDTH;

function getPos(i,j){
    let top=cellSpace+i*(cellSlideWidth+cellSpace);
    let left=cellSpace+j*(cellSlideWidth+cellSpace);
    return {
        top:top,
        left:left
    }
}
const backgroundColors={
    '2':'#eee4da',
    '4':'#ede0c8',
    '8':'#f2b179',
    '16':'#f59563',
    '32':'#f67c5f',
    '64':'#f65e3b',
    '128':'#edcf72',
    '256':'#edcc61',
    '512':'#9c0',
    '1024':'#33b5e5',
    '2048':'#09c',
    '4096':'#a6c',
    '8192':'#93c',
};

function getNumberColor(num) {
    if(num<=4)
        return '#776e65'
    return '#fff'
}

function noSpace(board) {
    for(let i =0;i<4;i++){
        for(let j=0;j<4;j++){
            if(board[i][j]===0){
                return false
            }
        }
    }
    return true
}

//生成随机数
function GetRandom(Min,Max) {
    return Min+Math.round((Max-Min)*Math.random())
}
//判断是否可以左移
function canMoveLeft(board) {
    for(let i=0;i<4;i++){
        for(let j=1;j<4;j++){
            if(board[i][j]!=0){
                if(board[i][j-1]==0||board[i][j-1]==board[i][j])
                    return true
            }
        }
    }
    return false
}
//判断是否可以右移
function canMoveRight(board) {
    for(let i=0;i<4;i++){
        for(let j=2;j>=0;j--){
            if(board[i][j]!=0){
                if(board[i][j+1]==0||board[i][j+1]==board[i][j]){
                    return true
                }
            }
        }
    }
    return false
}
//判断是否可以上移
function canMoveUp(board) {
    for(let j=0;j<4;j++){
        for(let i=1;i<4;i++){
            if(board[i][j]!=0){
                if(board[i-1][j]==0||board[i-1][j]==board[i][j]){
                    return true
                }
            }
        }
    }
    return false
}
////判断是否可以下移
function canMoveDown(board) {
    for(let j=0;j<4;j++){
        for(let i=2;i>=0;i--){
            if(board[i][j]!=0){
                if(board[i+1][j]==0||board[i+1][j]==board[i][j]){
                    return true
                }
            }
        }
    }
    return false
}
//判断横轴是否有障碍
function noBlockHorizontal(row,col1,col2,board){
    for(let i=col1+1;i<col2;i++){
        if(board[row][i]!=0){
            return false
        }
    }
    return true
}
//判断竖轴是否有障碍
function noBlockVertical(col,row1,row2,board) {
    for(let i=row1+1;i<row2;i++){
        if(board[i][col]!=0){
            return false
        }
    }
    return true
}

function noMove(board) {
    if(canMoveDown(board)||
        canMoveLeft(board)||
        canMoveRight(board)||
        canMoveUp(board))
        return false;

    return true;
}
/**
 * Created by Administrator on 2017/3/14.
 */
let board=new Array();
let score=0;
let hasConflict=new Array()

let startX=0;
let startY=0;
let endX=0;
let endY=0;


$(document).ready(function () {
    prepareForMobile()
    newGame()
});
function prepareForMobile(){
    console.log(WIDTH)
    if(WIDTH>500){
        gridContainerWidth=500;
        cellSpace=20;
        cellSlideWidth=100;
    }
    $('#grid-container').css('width',gridContainerWidth-2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth-2*cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth)

    $('.grid-cell').css('width',cellSlideWidth);
    $('.grid-cell').css('height',cellSlideWidth);
    $('.grid-cell').css('border-radius',cellSlideWidth*0.02);
}
$(document).keydown(function (e) {

    switch (e.keyCode){
        case 37: //left
            e.preventDefault();
           if( moveLeft()){
               setTimeout('generatorOneNumber()',210);
               setTimeout('isGameOver()',300);
           }
            break;
        case 38: //up
            e.preventDefault();
            if( moveUp()){
                setTimeout('generatorOneNumber()',210);
                setTimeout('isGameOver()',300);
            }
            break;
        case 39: //right
            e.preventDefault();
            if( moveRight()){
                setTimeout('generatorOneNumber()',210);
                setTimeout('isGameOver()',300);
            }
            break;
        case 40: //down
            e.preventDefault();
            if( moveDown()){
                setTimeout('generatorOneNumber()',210);
                setTimeout('isGameOver()',300);
            }
            break;
        default:
            break;
    }
})
document.addEventListener('touchstart',function (e) {
    startX=e.touches[0].pageX;  startY=e.touches[0].pageY;
})
document.addEventListener('touchmove',function (e) {
    e.preventDefault()
})
document.addEventListener('touchend',function (e) {
    endX=e.changedTouches[0].pageX;  endY=e.changedTouches[0].pageY;

    let changeX=endX-startX;
    let changeY=endY-startY;
    if(Math.abs(changeX)<WIDTH*0.2&&Math.abs(changeY)<WIDTH*0.2)
        return ;
    if(Math.abs(changeX)>=Math.abs(changeY)){
        if(changeX>0){
            if( moveRight()){
                setTimeout('generatorOneNumber()',210);
                setTimeout('isGameOver()',300);
            }
        }else{
            if( moveLeft()){
                setTimeout('generatorOneNumber()',210);
                setTimeout('isGameOver()',300);
            }
        }
    }else{
        if(changeY>0){
            if( moveDown()){
                setTimeout('generatorOneNumber()',210);
                setTimeout('isGameOver()',300);
            }
        }else {
            if( moveUp()){
                setTimeout('generatorOneNumber()',210);
                setTimeout('isGameOver()',300);
            }
        }
    }
})

function isGameOver() {
    if(noSpace(board)&&noMove(board)){
        gameover()
    }
}
function gameover() {
    alert('游戏失败')
}
function moveLeft() {
    if(!canMoveLeft(board))
        return false;
    for(let i=0;i<4;i++){
        for(let j=1;j<4;j++){
            if(board[i][j]!=0){
                for(let k=0;k<j;k++){
                    if(board[i][k]==0&& noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]===board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConflict[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        updateScore(score)
                        hasConflict[i][k]=true;
                        continue
                        //add
                    }
                }
            }
        }
    }
    setTimeout(function () {
        updateBoard();
    },200);
    return true
}
function moveRight() {
    if(!canMoveRight(board))
        return false;
    for(let i=0;i<4;i++){
        for(let j=2;j>=0;j--){
            if(board[i][j]!=0){
                for(let k=3;k>j;k--){
                    if(board[i][k]==0&& noBlockHorizontal(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]===board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasConflict[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        updateScore(score)
                        hasConflict[i][k]=true
                        continue
                        //add
                    }
                }
            }
        }
    }
    setTimeout(function () {
        updateBoard();
    },200);
    return true
}
function moveUp() {
    if(!canMoveUp(board))
        return false;
    for(let j=0;j<4;j++){
        for(let i=1;i<4;i++){
            if(board[i][j]!=0){
               for(let k=0;k<i;k++){
                   if(board[k][j]==0&&noBlockVertical(j,k,i,board)){
                       showMoveAnimation(i,j,k,j);
                       board[k][j]=board[i][j];
                       board[i][j]=0;
                       continue;
                   }else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)&&!hasConflict[k][j]){
                       showMoveAnimation(i,j,k,j);
                       board[k][j]+=board[i][j];
                       board[i][j]=0;
                       score+=board[k][j];
                       updateScore(score)
                       hasConflict[k][j]=true;
                       continue;
                   }
               }
            }
        }
    }
    setTimeout(function () {
        updateBoard();
    },200);
    return true
}
function moveDown() {
    if(!canMoveDown(board))
        return false;
    for(let j=0;j<4;j++){
       for(let i=2;i>=0;i--){
           if(board[i][j]!=0){
               for(let k=3;k>i;k--){
                   if(board[k][j]==0&&noBlockVertical(j,i,k,board)){
                       showMoveAnimation(i,j,k,j);
                       board[k][j]=board[i][j];
                       board[i][j]=0;
                       continue;
                   }else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)&&!hasConflict[k][j]){
                       showMoveAnimation(i,j,k,j);
                       board[k][j]+=board[i][j];
                       board[i][j]=0;
                       score+=board[k][j];
                       updateScore(score)
                       hasConflict[k][j]=true
                       continue;
                   }
               }
           }
       }
    }
    setTimeout(function () {
        updateBoard();
    },200);
    return true
}
function newGame() {
    //初始化棋盘格
    init()
    generatorOneNumber()
    generatorOneNumber()
}
//初始化init方法
function init() {
    for(let i=0;i<4;i++){

        for(let j=0;j<4;j++){

            let gridCell=$('#grid-cell-'+i+'-'+j);
            gridCell.css('top',getPos(i,j).top);
            gridCell.css('left',getPos(i,j).left);
        }
    }
    for(let i=0;i<4;i++){
        board[i]=new Array();
        hasConflict[i]=new Array
        for(let j=0;j<4;j++){
            board[i][j]=0;
            hasConflict[i][j]=false
        }
    }
    updateBoard()
}
function updateBoard() {
    $('.number-cell').remove();
    for(let i=0;i<4;i++) {
        for (let j=0;j<4;j++) {
            $('#grid-container').append(`<div class="number-cell" id="number-cell-${i}-${j}"></div>`)
            let numberCell=$("#number-cell-"+i+"-"+j)
            if(board[i][j]===0){
                numberCell.css('width','0px');
                numberCell.css('height','0px');
                numberCell.css('top',getPos(i,j).top+cellSlideWidth/2);
                numberCell.css('left',getPos(i,j).left+cellSlideWidth/2);
            }else{
                numberCell.css('width',cellSlideWidth);
                numberCell.css('height',cellSlideWidth);
                numberCell.css('top',getPos(i,j).top);
                numberCell.css('left',getPos(i,j).left);
                numberCell.css('background-color',backgroundColors[board[i][j]]);
                numberCell.css('color',getNumberColor(board[i][j]));
                numberCell.text(board[i][j])
            }
            hasConflict[i][j]=false
        }
        $('.number-cell').css('line-height',cellSlideWidth+'px');
        $('.number-cell').css('font-size',0.6*cellSlideWidth+'px')
    }
}
//生成一个随机数
function generatorOneNumber() {
    if(noSpace(board)){
        return false
    }
    let randomX=GetRandom(0,3)
    let randomY=GetRandom(0,3);
    if(board[randomX][randomY]===0){
        board[randomX][randomY]=GetRandom(1,2)*2;
    }else{
        generatorOneNumber()
    }
    showNumberAnimation(randomX,randomY,board[randomX][randomY])
}
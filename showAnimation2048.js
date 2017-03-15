/**
 * Created by Administrator on 2017/3/14.
 */
function showNumberAnimation(i, j, num) {
    let numberCell=$('#number-cell-'+i+'-'+j);
    numberCell.css('background-color',backgroundColors[num])
    numberCell.css('color',getNumberColor(num))
    numberCell.text(num)

    numberCell.animate({
        width:cellSlideWidth,
        height:cellSlideWidth,
        top:getPos(i,j).top,
        left:getPos(i,j).left
    },50)
}
function showMoveAnimation(fromx, fromy, tox, toy) {
    let numberCell=$('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        left:getPos(tox,toy).left,
        top:getPos(tox,toy).top
    },200)
}

function updateScore(score) {
    $('#score').text(score)
}
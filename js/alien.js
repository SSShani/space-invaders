const ALIEN_SPEED = 500 
var gIntervalAliens 
 
// The following two variables represent the part of the matrix (some rows) 
// that we should shift (left, right, and bottom) 
// We need to update those when: 
// (1) shifting down and (2) last alien was cleared from row 
var gAliensTopRowIdx 
var gAliensBottomRowIdx 
 
var gIsAlienFreeze = true 
 
function createAliens(board) {
    for (var j = 0; j < ALIEN_ROW_COUNT; j++){
    for (var i = 0; i < ALIEN_ROW_LENGTH; i++) {
        board[j][i].gameObject=ALIEN
        gGame.alienCount++
        // createCell(HERO)
        // console.log(board[j][i].gameObject)
    }}
    // console.log('createAliens ')
} 


function handleAlienHit(pos) {

  var upScore
    // if (target === ALIEN) {
       upScore = 10;
       gGame.alienCount--
    // } else {
    //  var upScore = 50;
    //   gIsAlienFreeze = true;
    //   setTimeout(() => {
    //     gIsAlienFreeze = false;
    //   }, 5000);
    // }
  
    // playSound("hit");
    updateScore(upScore);
    updateCell(pos, EXPLOSION);
    setTimeout(() => {
      updateCell(pos);
    }, 150);

    if(gGame.alienCount==0)GameOver(true)
} 



function updateScore(upScore){
  const elScore = document.querySelector('.score span')
 gGame.score += upScore
  elScore.innerText = gGame.score
}


function shiftBoardRight(board, fromI, toI) {} 
function shiftBoardLeft(board, fromI, toI) {} 
function shiftBoardDown(board, fromI, toI) {} 
 
// runs the interval for moving aliens side to side and down 
// it re-renders the board every time 
// when the aliens are reaching the hero row - interval stops 
function moveAliens() {}
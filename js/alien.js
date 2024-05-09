const ALIEN_SPEED = 500 
var gIntervalAliens
var DIRECTION = 'RIGHT'
var shouldMoveDown = false
var gIsAlienFreeze = false 
var gCandyInterval;
 
var alienXBounds = {
  ifToRight: true,
  ifToDown:false,
   right: 7,
   left:0,
  rightAliensCount:3,
  leftAliensCount:3
}
function restartalienXBounds(){
  alienXBounds
  alienXBounds.ifToRight=true
  alienXBounds.ifToDown=false
  alienXBounds.right=7,
  alienXBounds.left=0
  alienXBounds.rightAliensCount=3
  alienXBounds.leftAliensCount=3
}

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


function handleAlienHit(pos,Obj) {

  var upScore
    if (Obj === ALIEN) {
      updateBound(pos)
       upScore = 10;
       gGame.alienCount--
    } else {
      upScore = 50;
      gIsAlienFreefalseze = true;
      setTimeout(() => {
        gIsAlienFreeze = false;
      }, 5000);
    }
  
    updateScore(upScore);
    updateCell(pos, EXPLOSION);
    setTimeout(() => {
      updateCell(pos);
    }, 150);

    if(gGame.alienCount==0)GameOver(true)
} 


function updateBound(pos){
if (pos.j==alienXBounds.left){
  alienXBounds.leftAliensCount--
  if(alienXBounds.leftAliensCount==0){
    alienXBounds.left++
    console.log('updateBound1 ')
  }
}
else 
 if(pos.j==alienXBounds.right ){
  alienXBounds.rightAliensCount--
  if(alienXBounds.rightAliensCount==0){
    alienXBounds.right--
    console.log('updateBound 2')
    console.log( alienXBounds.right)
}
 }
}


function updateScore(upScore){
  const elScore = document.querySelector('.score span')
 gGame.score += upScore
  elScore.innerText = gGame.score
}

function shiftBoardDown(board, fromI, toI) {
  if(toI==11){
    GameOver()
    return}

  for (var i = toI; i >= fromI; i--) {
      for (var j = 0; j < BOARD_SIZE; j++) {
       
        if(board[i][j ].gameObject==null||board[i][j ].gameObject==ALIEN )
        {
           board[i + 1][j] = board[i][j]}
          if (i ===fromI)board[i][j] = createCell()  
      }
    }
  gAliensTopRowIdx++
  gAliensBottomRowIdx++
  alienXBounds.ifToDown=false
  renderBoard(gBoard)

  // start candy's after first row
  if (!fromI) {
    gCandyInterval = setInterval(() => {
      candyAppear();
    }, 1000);
}
}

  function shiftBoardRight(board, fromI, toI) {
    for (var i = fromI; i <= toI; i++) {
        for (var j = BOARD_SIZE - 1; j > 0; j--) {
          if(board[i][j - 1].gameObject==null||board[i][j-1 ].gameObject==ALIEN)
            board[i][j] = board[i][j - 1];
        }
        board[i][0] = createCell()
    }
    alienXBounds.left++
    alienXBounds.right++
    console.log(alienXBounds.right )
    if(alienXBounds.right==BOARD_SIZE - 1){
       (alienXBounds.ifToRight = !alienXBounds.ifToRight)
       alienXBounds.ifToDown=true
    }
    renderBoard( gBoard)
    console.log(alienXBounds.ifToRight )
}



function shiftBoardLeft(board, fromI, toI) {
  for (var i = fromI; i <= toI; i++) {
      for (var j = 0; j < BOARD_SIZE - 1; j++) {
        console.log( ' shiftBoardLeft')
        if(board[i][j + 1].gameObject==null||board[i][j+1 ].gameObject==ALIEN)
          board[i][j] = board[i][j + 1];
    
      board[i][BOARD_SIZE - 1] = createCell()
  }}
  alienXBounds.left--
  alienXBounds.right--
  // console.log( alienXBounds.left,' ',alienXBounds.right)
  if(alienXBounds.left==0){
    (alienXBounds.ifToRight = !alienXBounds.ifToRight)
    alienXBounds.ifToDown=true
 }
 renderBoard( gBoard)
 console.log(alienXBounds.ifToRight)
}

// alienXBounds



function moveAliens() {
  if (!gGame.isOn) return;
 
  gIntervalAliens = setInterval(() => {
    moveDirectionHandler()
  }, ALIEN_SPEED);

}

function moveDirectionHandler(){
  // if (  gIsAlienFreeze ) return
  if(alienXBounds.ifToDown )shiftBoardDown(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
    else{
         if(alienXBounds.ifToRight ) shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
  
  else {
    if(!alienXBounds.ifToRight )shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)}
  }
}

function candyAppear(){
  var randomInt=getRandomInt(0,BOARD_SIZE-1)
  var candyPos = {i:0,j:randomInt}
  updateCell(candyPos,CANDY)
  setTimeout(() => {
    updateCell(candyPos,'')
  }, 5000);
}
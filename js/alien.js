var ALIEN_SPEED = 500 
var gIntervalAliens
var DIRECTION = 'RIGHT'
var shouldMoveDown = false
var gIsAlienFreeze = false 
var gCandyInterval;
 var gAliensRockInterval
 var gIntervalRocks
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
      gIsAlienFreeze = true;
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

  gIntervalRocks=setInterval(() => {
    throwRocks()  
  },4000);
}

function moveDirectionHandler(){
  if (  gIsAlienFreeze ) return
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




function throwRocks() {
  var pos = getAlienPos(gBoard);

 gAliensRockInterval  = setInterval(() => {
    console.log('nnn')
    pos.i++;
    blinkRock(pos);
  }, 400);
}

function blinkRock(pos) {
  if (!pos || pos.i + 1 === gBoard.length - 1 || gBoard[pos.i + 1][pos.j].type === "BOTTOM") {
    clearInterval(gAliensRockInterval);
    updateCell(pos);
    // if (pos.i + 1 === gBoard.length - 1) {
      // updateCell({ pos });
    // }
    // console.log('hero?')
    // handleHeroCollision(pos)
    return;
  }
  var nextPos = { i: pos.i + 1, j: pos.j };
  if (gBoard[pos.i][pos.j].gameObject === HERO) {
    console.log("game over");
    stopRockBlinking();
    updateCell(nextPos, ROCK);
    updateCell(pos);
    handleHeroCollision(pos)
    GameOver();
    return;
  } 
  if (gBoard[pos.i][pos.j].gameObject === ALIEN) {
    updateCell(nextPos, ROCK);
  } else {
    updateCell(nextPos, ROCK);
    updateCell(pos);
  }
  updateCell(pos);
}




function getAlienPos(board) {
  const aliensPoses = [];

  for (let j = 0; j < board[gAliensBottomRowIdx].length; j++) {
    const cell = board[gAliensBottomRowIdx][j];
  
    if (cell.gameObject === ALIEN) {
      aliensPoses.push({ i: gAliensBottomRowIdx, j: j });
    }
  }
  
  var randomIdx = getRandomInt(0, aliensPoses.length - 1);
  return aliensPoses[randomIdx];
}
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
  gGame.alienCount=0
    for (var j = 0; j < ALIEN_ROW_COUNT; j++){
    for (var i = 0; i < ALIEN_ROW_LENGTH; i++) {
        board[j][i].gameObject=ALIEN
        gGame.alienCount++
    }}
} 

function handleAlienHit(pos,Obj) {

  var upScore=0
    if (Obj === ALIEN) {
      if (gGame.Sound){
        var audio = new Audio("sounds/Explosion.wav")
        audio.play();}

      updateBound(pos)
       upScore = 10;
       gGame.alienCount--
    }
    else { if (Obj === ROCK){
      console. log(' ROCKROCKROCK')
clearInterval(gIntervalRocks)
    }

     else {

      if (gGame.Sound){
        var audio = new Audio("sounds/candy.wav")
        audio.play();}

      upScore = 50;
      gIsAlienFreeze = true;
      setTimeout(() => {
        gIsAlienFreeze = false;
      }, 5000);
    }}
    
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
  if(toI==11||toI==10 ){
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
          // board[i][j] = board[i][j + 1];

       { board[i][j].type = board[i][j + 1].type;
        board[i][j].gameObject = board[i][j + 1].gameObject;}
    
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

function restartScore(){
  gGame.score = 0
  const elScore = document.querySelector('.score span')
   elScore.innerText = gGame.score

}

function moveAliens() {
  if (!gGame.isOn) return;
  gIntervalAliens = setInterval(() => {
    moveDirectionHandler()
  }, ALIEN_SPEED);
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
  // blinkRock(pos);
  const nextPos = { i: pos.i - 1, j: pos.j };
  gIntervalRocks  = setInterval(() => {
    console.log('throwRocks')
    // pos = { i: pos.i + 1, j: pos.j };
    blinkRock(nextPos);
  }, 400);
}

// function blinkRock(pos) {
//   console.log("blinkRock" )
//   if (!pos || gBoard[pos.i + 1][pos.j].type === "BOTTOM") {
//     clearInterval(gAliensRockInterval);
//     updateCell(pos);
//     // if (pos.i + 1 === gBoard.length - 1) {
//       // updateCell({ pos });
//     // }
//     // console.log('hero?')
//     // handleHeroCollision(pos)
//     return;
//   }
//   var nextPos = { i: pos.i + 1, j: pos.j };
//   if (gBoard[pos.i][pos.j].gameObject === HERO) {
//     InjuryToHero(pos, nextPos)
//     return;
//   } 
//   if (gBoard[pos.i][pos.j].gameObject === ALIEN) {
//     updateCell(nextPos, ROCK);
//   }
//    else {
//     updateCell( { i: pos.i + 1, j: pos.j }, ROCK);
//     updateCell(pos);
//     console.log("-----------------")
//   }
//   updateCell(pos);
// }

function blinkRock(pos) {
  console.log("blinkRock" )
const nextPos = { i: pos.i+ 1, j: pos.j };
const nextType = gBoard[nextPos.i][nextPos.j].type
const nextGameObject = gBoard[nextPos.i][nextPos.j].gameObject
if (nextGameObject===HERO || nextType ===BOTTOM||nextType===BUNKER) {
  clearInterval(gIntervalRocks);
  updateCell(pos);
  if (nextType ===BOTTOM||nextType===BUNKER ) {//end
    Bunkerhit(nextPos, nextType)
    return;}

  else if (nextGameObject===HERO) {
    InjuryToHero(pos)
    return
    }

} else {
  if (pos.i !== gHero.pos.i) {
    // if(pos.gameObject===null )
      updateCell(pos);
  pos.i++
    updateCell(pos,ROCK);
}
}
}

function Bunkerhit(nextPos, nextType){
  console.log( 'Bunkerhit')
  if( nextType===BUNKER)
    var elCell = getElCell(nextPos)
  if (elCell) {
    elCell.classList.add("Bunkerhit");
  }
    
}

function InjuryToHero(pos){
  console.log("InjuryToHero");
  clearInterval(gIntervalRocks)
  if(gHero.live===0){
    clearInterval(gAliensRockInterval)
    updateCell(pos, EXPLOSION);
    setTimeout(() => {
      updateCell(pos);
    }, 150);
    GameOver()
  }
  else {
    gHero.live--
    console.log('live:', gHero.live)
    // updateCell(pos, HERO)
      const elLive = document.querySelector('.live span')
     elLive.innerText = gHero.live
    }

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

// function isAlien(Obj ){
//   console.log('isAlien')
//   for (var j = 0; j < 4; j++){
//      var key = j;
//      Obj=ALIEN[key]
//      return true
//     }
//     return false
// }

//  const ALIEN = {
//     1:'👽',
//   2:'👻',
//   3:'👾',
//   4:' 👹'}
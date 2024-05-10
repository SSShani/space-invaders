const LASER_SPEED = 80 
var gHero = {pos: {i:12, j: 5}, isShoot: false,live:3} 
var SuperModecount=3;
 
function createHero(board) {
    // console.log('createHero ')
    board[gHero.pos.i][gHero.pos.j].gameObject=HERO
    // console.log(board[gHero.pos.i][gHero.pos.j].gameObject )
}

function onKeyDown(ev) {
    console.log('keyy',  ev.key)
    const key = ev.key
    if (!gGame.isOn) return

    switch (key) {
        case 'ArrowLeft':
            moveHero(-1) // Move left
            break;
        case 'ArrowRight':
            moveHero(1) // Move right
            break;
        case " ":
                shoot()
                break;
         case "n":
            updateNeighbors()
                  break;
           case "x":
            SuperMode()
                          break;
                          
        default:
            break;
    }
}


function moveHero(dir) {
  
    if (!gGame.isOn) return;
    const moveTo = gHero.pos.j + dir
    if (moveTo < 0 || moveTo > gBoard[0].length - 1) return
    updateCell(gHero.pos, null) 
    gHero.pos.j = moveTo 
    updateCell(gHero.pos, HERO) 
    // gBoard[gHero.pos.i][moveTo] .gameObject=HERO
    // gBoard[gHero.pos.i][gHero.pos.j] .gameObject=null
    // gHero.pos.j=gHero.pos.j+dir

} 
//  
function shoot() {
     if (gGame.isOn&& !gHero.isShoot) {
      
        console.log('shoot')
        gHero.isShoot = true;
        var laserPos = { i: gHero.pos.i, j: gHero.pos.j };
        blinkLaser(laserPos)
        if(gGame.isSuperMode){
          gLaserInterval = setInterval(() => {
            blinkLaser(laserPos);
          }, 70);
         
        }
else{
        gLaserInterval = setInterval(() => {
          blinkLaser(laserPos);
        }, 200);}
        // gGame.isSuperMode=false
}  }
 
function blinkLaser(pos) {
    const nextPos = { i: pos.i - 1, j: pos.j };
    const nextCell = gBoard[nextPos.i][nextPos.j].gameObject
    
    if (!nextPos.i || nextCell === ALIEN) {
      clearInterval(gLaserInterval);//stop
      gGame.isSuperMode=false
      gHero.isShoot = false;
      updateCell(pos);
      if (!pos.i) return;

      else if(nextCell === ALIEN){
        if( gGame.blowUpNeighborsisOn==true ){
           blowUpNeighbors(nextPos)
        }
        else{
        handleAlienHit(nextPos,ALIEN)}
      }
      else if(nextCell === CANDY){
        handleAlienHit(nextPos,CANDY)}
      
    } else {
      if (pos.i !== gHero.pos.i) updateCell(pos);
      --pos.i;
      if(gGame.isSuperMode){
        updateCell(pos,SUPERLASER )
        // gGame.isSuperMode=false
      }else
      updateCell(pos, LASER);
    }
}

function updateNeighbors(){
  // console.log('bbb')
  gGame.blowUpNeighborsisOn=true
  shoot()
 

}

function blowUpNeighbors(Pos){
 var I=Pos.i
 var J=Pos.j
  for (var row = Math.max(0, I - 1); row <= Math.min(BOARD_SIZE - 1, I + 1); row++) {
    for (var col = Math.max(0, J- 1); col <= Math.min(BOARD_SIZE - 1,J + 1); col++) {
      var posCell = { i:row, j:col };
      handleAlienHit(posCell,ALIEN)
    }
}
}

function SuperMode()
{
 
  if( SuperModecount==0)return
  gGame.isSuperMode=true
  shoot()
  updateSuperModecount()
}
  
  function updateSuperModecount(){
    SuperModecount--
    var Text
    const elCount = document.querySelector('.SuperMode ')
    // for(var i=0;i<SuperModecount;i++){
    //   Text -= '🔥'}
      elCount.innerText=SuperModecount
  }

  function  handleHeroCollision(pos){
    if( gHero.live==0)
      GameOver()
    else{
      gHero.live--
      console.log('live:',gHero.live)
      updateCell(pos,HERO)
    }

  }
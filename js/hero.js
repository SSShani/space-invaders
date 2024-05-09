
// const HERO = '♆' 
const LASER_SPEED = 80 
var gHero = {pos: {i:12, j: 5}, isShoot: false} 
 
// creates the hero and place it on board 
function createHero(board) {
    // console.log('createHero ')
    board[gHero.pos.i][gHero.pos.j].gameObject=HERO
    // console.log(board[gHero.pos.i][gHero.pos.j].gameObject )
}



function onKeyDown(ev) {
    console.log('keyy',  ev.key)
    const key = ev.key
    // if (!gGame.isOn) return

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
        default:
            break;
    }
}


// Move the hero right (1) or left (-1) 
function moveHero(dir) {
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
    // if (gGame.isOn&& !gHero.isShoot) 
      if(gHero.isShoot)return
        console.log('shoot')
        gHero.isShoot = true;
        var laserPos = { i: gHero.pos.i, j: gHero.pos.j };
        blinkLaser(laserPos)
        gLaserInterval = setInterval(() => {
          blinkLaser(laserPos);
        }, 200);
}  
 
function blinkLaser(pos) {
    const nextPos = { i: pos.i - 1, j: pos.j };
    const nextCell = gBoard[nextPos.i][nextPos.j].gameObject
    
    if (!nextPos.i || nextCell === ALIEN) {
      clearInterval(gLaserInterval);//stop
      gHero.isShoot = false;
      updateCell(pos);
      if (!pos.i) return;

      else if(nextCell === ALIEN){
        handleAlienHit(nextPos,ALIEN)
      }
      
    } else {
      if (pos.i !== gHero.pos.i) updateCell(pos);
      --pos.i;
      updateCell(pos, LASER);
    }
}

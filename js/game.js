const BOARD_SIZE = 14
const ALIEN_ROW_LENGTH = 8
var ALIEN_ROW_COUNT = 3

const HERO = '🛸'
const ALIEN = '👽'
const LASER = ' 📍'
const SUPERLASER= '🔥'
const EXPLOSION = '💥'
const CANDY = '🍭'
const ROCK ='❄️'
var gBoard;
const SKY = "SKY"
const BOTTOM = "BOTTOM"

var gAliensTopRowIdx=0
var gAliensBottomRowIdx =ALIEN_ROW_COUNT-1

function init() {
    console.log('init ')
    gBoard = createBoard()
    createAliens(gBoard)
    console.log(gGame.alienCount)
    createHero(gBoard)
    renderBoard(gBoard)
    console.table(gBoard)
}

var gGame = {
    isOn: false,
    alienCount: 0,
    score: 0,
    blowUpNeighborsisOn:false,
    isSuperMode:false
}



// Render the board as a <table> to the page 
function renderBoard(board) {
    console.log('renderBoard ')
    var strHTML = ''
    for (var i = 0; i < BOARD_SIZE; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < BOARD_SIZE; j++) {
            var cell = board[i][j]
            var cellClass = cell.type
            strHTML += `<td class="${cellClass}" data-i="${i}" data-j="${j}">${cell.gameObject || ""}</td>`;

        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('tbody.board')
    elBoard.innerHTML = strHTML
}




// position such as: {i: 2, j: 7} 
function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject
    var elCell = getElCell(pos)
    elCell.innerHTML = gameObject || ""
}

function createBoard() {
    var board = createMat(BOARD_SIZE, BOARD_SIZE)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var type = (i === BOARD_SIZE - 1) ? BOTTOM : SKY
            board[i][j] = createCell(type, null);
        }
    }
    return board
}
// 
function createCell(type = SKY, gameObject = null) {
    return {
        type: type,
        gameObject: gameObject
    }
}
function GameOver(gameResult = false) {
    clearInterval(gIntervalAliens)
    clearInterval(gCandyInterval)
    clearInterval(gIntervalAliens)
    
    console.log('GameOver', gameResult)
    document.querySelector('.modal').style.display = "block"
    gGame.isOn = false

    if (gameResult) handleVictory( )
    else handleDefeat( )

}
function handleVictory() {
    var modalText = document.querySelector('.modal p');
    modalText.innerText = "Congratulations! You won!";
}

function handleDefeat() {
    var modalText = document.querySelector('.modal p');
    modalText.innerText = "Oh you lost"}

function restartGame() {
    document.querySelector('.modal').style.display = "none"
    gGame.alienCount = 0
    restartScore()
    restartalienXBounds()
    init()

}



function restartScore(){
    gGame.score = 0
    const elScore = document.querySelector('.score span')
     elScore.innerText = gGame.score

}

function startGame(elBtn){
    elBtn.removeAttribute("onclick");
    elBtn.disabled = true;
      init()
     
    gGame.isOn = true
    gIsAlienFreeze=false
    moveAliens()
 }


 function changeSpeed(elBtn) {
    var level = elBtn.innerText;
    console.log(level);
    switch (level) {
      case "Medium":
        MediumLevel();
        break;
      case "Easy":
        LowLevel();
        break;
        case "Hard":
            HighLevel();
            break;
      default:
        MediumLevel();
        break;
    }
    // const elLevel = document.querySelector(".level span");
    // elLevel.innerText = level;
  }
  function MediumLevel(){
    ALIEN_SPEED = 500;
    ALIEN_ROW_COUNT=3
    createAliens(gBoard)
  }

  function  HighLevel(){
    ALIEN_SPEED = 800;
    ALIEN_ROW_COUNT=4

    gAliensBottomRowIdx=3
    init()
    // createAliens(gBoard)
  }

  function LowLevel(){
    ALIEN_SPEED = 300;
    ALIEN_ROW_COUNT=2
    gAliensBottomRowIdx=1
    createAliens(gBoard)
  }
function test1(){
    gIsAlienFreeze = true;
}
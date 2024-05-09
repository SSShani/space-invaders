const BOARD_SIZE = 14
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3

const HERO = '♆'
const ALIEN = '👽'
const LASER = '⤊'
const EXPLOSION = '💥'
var gBoard;
const SKY = "SKY"
const BOTTOM = "BOTTOM"


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
    score: 0
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
    init()

}

function testt(){
GameOver(true)
}

function restartScore(){
    gGame.score = 0
    const elScore = document.querySelector('.score span')
     elScore.innerText = gGame.score

}
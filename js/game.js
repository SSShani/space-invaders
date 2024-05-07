const BOARD_SIZE = 14 
const ALIEN_ROW_LENGTH = 8 
const ALIEN_ROW_COUNT = 3 
 
const HERO = '♆' 
const ALIEN = '👽' 
const LASER = '⤊' 
var gBoard;
const SKY = "SKY"
const BOTTOM="BOTTOM"


function init(){
    console.log('init ')
 gBoard =createBoard( )
 createAliens(gBoard);
createHero(gBoard)
renderBoard(gBoard)
console.table(gBoard)
}

var gGame = { 
    isOn: false, 
    alienCount: 0 
} 
 

 
// Render the board as a <table> to the page 
function renderBoard(board) {
    console.log('renderBoard ')
    var strHTML = ''
    for (var i = 0; i < BOARD_SIZE; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < BOARD_SIZE; j++) {
            var cell = board[i][j]
            if (cell.type==BOTTOM){
                strHTML += '<td class="ground"> </td>';
            }
            else{
            strHTML += `<td>${cell.gameObject}</td>`
            }
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('tbody.board')
    elBoard.innerHTML = strHTML
}
 
// if (cell.gameObject === null) {
//     strHTML += '<td class="null"></td>';
// } else {
//     strHTML += `<td>${cell.gameObject}</td>`;

 


// position such as: {i: 2, j: 7} 
function updateCell(pos, gameObject = null) { 
    gBoard[pos.i][pos.j].gameObject = gameObject 
    var elCell = getElCell(pos) 
    elCell.innerHTML = gameObject || '' 
}


function createBoard( ) {
    var board=createMat(BOARD_SIZE,BOARD_SIZE)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var type = (i === BOARD_SIZE-1) ? BOTTOM:SKY
            board[i][j] = createCell(type,null);
        }
    }
return board
}

function createCell(type=SKY,gameObject = null) { 
    return { 
        type:type,
        gameObject: gameObject 
    } 
} 




function onKeyDown(ev) {
    console.log('key pressed:', ev.key)

    if (!gGame.isOn) return

    switch (ev.key) {
        case 'ArrowLeft':
            moveHero(-1) // Move left
            break;
        case 'ArrowRight':
            moveHero(1) // Move right
            break;
        case ' ':
            shoot() // Shoot laser
            break;
        case 'n':
            blowUpNeighbors() // Blow up alien neighbors
            break;
        case 'x':
            fasterLaser()
            break;
        case 'z':
            activateShield()
            break;
        default:
            break;
    }
}
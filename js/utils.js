'use strict'
// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN} 
function createCell(gameObject = null) { 
  return { 
    type: SKY, 
    gameObject: gameObject 
  } 
} 
 
// function getElCell(pos) { 
//   return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`) 
// } 
 
function getElCell(pos) {
    return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`);
  }









function copyMat(mat) {
    var newMat = []
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = []
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j]
        }
    }
    return newMat
}

function countNeighbors(rowIdx, colIdx, mat) {
    var neighborsCount = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue//margin

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue//margin
            if (i === rowIdx && j === colIdx) continue//itself

            if (mat[i][j] === LIFE) neighborsCount++
        }
    }
    return neighborsCount}

    function createMat(ROWS, COLS) {
        const mat = []
        for (var i = 0; i < ROWS; i++) {
            const row = []
            for (var j = 0; j < COLS; j++) {
                row.push('')
            }
            mat.push(row)
        }
        return mat
    }


function showModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hide')
}

function hideModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hide')
}

function getRandEmptyCell() {
    const emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === EMPTY) {
                emptyCells.push({ i, j })
            }
        }
    }
    const randInt = getRandomIntInclusive(0, emptyCells.length - 1)
    return emptyCells[randInt]
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}













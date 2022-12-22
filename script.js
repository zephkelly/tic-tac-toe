let currentPlayer
let gameOver = false

const gameStatus = document.getElementById("game-status")

//Player factory function
const playerFactory = (name, symbol) => {
  return { name, symbol }
}

const player1 = playerFactory("Player1", "X")
const player2 = playerFactory("Player2", "O")

//Gameboard module
const gameboard = (() => {
  const gameboard = buildGameboard().gameboard

  const getGameboard = () => {
    return gameboard
  }

  const makePlay = (x, y, symbol) => {
    gameboard[x][y] = symbol
    console.log(gameboard)
  }

  return { getGameboard, makePlay }
})()

function buildGameboard() {
  let gameboard = new Array()

  gameboard[0] = new Array("", "", "")
  gameboard[1] = new Array("", "", "")
  gameboard[2] = new Array("", "", "")

  return {
    gameboard: gameboard,
  }
}

//Game module
const gameManager = (() => {
  currentPlayer = player1
  gameStatus.textContent = `${currentPlayer.symbol}'s turn`

  const play = (x, y, targetDiv) => {
    if (canMakePlay(x, y) == false) return

    gameboard.makePlay(x, y, currentPlayer.symbol)
    targetDiv.target.innerHTML = currentPlayer.symbol

    currentPlayer = currentPlayer === player1 ? player2 : player1
    gameStatus.textContent = `${currentPlayer.symbol}'s turn`
    checkWinner()
  }

  function canMakePlay(x, y) {
    if (gameboard.getGameboard()[x][y] == "") return true
    else return false
  }

  const checkWinner = () => {
    //TODO

    //Check rows
    for (let i = 0; i < 3; i++) {
      if (
        gameboard.getGameboard()[i][0] == gameboard.getGameboard()[i][1] &&
        gameboard.getGameboard()[i][1] == gameboard.getGameboard()[i][2] &&
        gameboard.getGameboard()[i][0] != ""
      ) {
        endGame()
      }
    }

    //Check columns
    for (let i = 0; i < 3; i++) {
      if (
        gameboard.getGameboard()[0][i] == gameboard.getGameboard()[1][i] &&
        gameboard.getGameboard()[1][i] == gameboard.getGameboard()[2][i] &&
        gameboard.getGameboard()[0][i] != ""
      ) {
        endGame()
      }
    }

    //Check diagonals
    if (
      gameboard.getGameboard()[0][0] == gameboard.getGameboard()[1][1] &&
      gameboard.getGameboard()[1][1] == gameboard.getGameboard()[2][2] &&
      gameboard.getGameboard()[0][0] != ""
    ) {
      endGame()
    }

    if (
      gameboard.getGameboard()[0][2] == gameboard.getGameboard()[1][1] &&
      gameboard.getGameboard()[1][1] == gameboard.getGameboard()[2][0] &&
      gameboard.getGameboard()[0][2] != ""
    ) {
      endGame()
    }

    //Check for draw
    let draw = true
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameboard.getGameboard()[i][j] == "") draw = false
      }
    }

    if (draw) endGame(true)

    return
  }

  const endGame = (draw = false) => {
    gameOver = true
    document.getElementById("reset").textContent = "Play again"

    if (draw) {
      gameStatus.textContent = `It's a draw!`
      return
    } else {
      //Change the current player to be the winner
      currentPlayer = currentPlayer === player1 ? player2 : player1
      gameStatus.textContent = `${currentPlayer.symbol} is the winner!`
    }
  }

  return { play, checkWinner, endGame }
})()

document.getElementById("gameboard").addEventListener("click", function (e) {
  let x = e.target.getAttribute("data-x")
  let y = e.target.getAttribute("data-y")

  //x and y are reversed due to gameboard storage structure
  if (gameOver) return
  gameManager.play(y, x, e)
})

const resetButton = document
  .getElementById("reset")
  .addEventListener("click", function (e) {
    location.reload()
  })

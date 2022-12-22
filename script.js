let currentPlayer

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

  const setGameboard = (x, y, symbol) => {
    gameboard[x][y] = symbol
    console.log(gameboard)
  }

  return { getGameboard, setGameboard }
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

  const play = (x, y) => {
    gameboard.setGameboard(x, y, currentPlayer.symbol)
    currentPlayer = currentPlayer === player1 ? player2 : player1

    checkWinner()
  }

  const checkWinner = () => {
    //TODO
  }

  const endGame = () => {}

  return { play, checkWinner, endGame }
})()

document.getElementById("gameboard").addEventListener("click", function (e) {
  let x = e.target.getAttribute("data-x")
  let y = e.target.getAttribute("data-y")

  gameManager.play(x, y)
})

let mode = 1; // 1 = modo solo, 2 = modo 2 jogadores
let scores = [0, 0]; // Pontuação [jogador1, jogador2]
let turn = 0; // 0 = jogador1, 1 = jogador2
let boardSize = 4; // Tamanho inicial do tabuleiro menor (4x4)
let bombs = new Set();
let revealedCells = [];
let flaggedCells = [];
let totalPoints = [0, 0]; // Pontos acumulados para aumentar dificuldade

function startGame(selectedMode) {
  mode = selectedMode;
  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";
  if (mode === 2) {
    document.getElementById("player2-score").style.display = "block";
  }
  generateBoard(boardSize, boardSize, 6); // Menos bombas no começo
  updateScore();
}

function generateBoard(rows, cols, bombCount) {
  const board = document.getElementById("board");
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  board.style.gap = "0";

  const totalCells = rows * cols;
  bombs = new Set();
  revealedCells = [];
  flaggedCells = [];

  while (bombs.size < bombCount) {
    bombs.add(Math.floor(Math.random() * totalCells));
  }

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("button");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.onclick = () => handleLeftClick(cell);
    cell.oncontextmenu = (e) => handleRightClick(e, cell);
    board.appendChild(cell);
  }
}

function handleLeftClick(cell) {
  const index = parseInt(cell.dataset.index);
  if (cell.disabled || flaggedCells.includes(index)) return;

  if (bombs.has(index)) {
    cell.classList.add("bomb");
    cell.innerText = "💣";
    cell.style.backgroundColor = "#f88";
    cell.disabled = true;
    scores[turn] = Math.max(0, scores[turn] - 1);
    totalPoints[turn] = Math.max(0, totalPoints[turn] - 1);
    alert(`Player ${turn + 1} errou! Perdeu 1 ponto.`);
    nextTurn();
  } else {
    revealCell(cell, index);
    scores[turn]++;
    totalPoints[turn]++;
    checkDifficulty();
  }

  updateScore();
  checkGameStatus();
}

function handleRightClick(event, cell) {
  event.preventDefault();
  const index = parseInt(cell.dataset.index);
  if (cell.disabled) return;

  if (flaggedCells.includes(index)) {
    flaggedCells = flaggedCells.filter(i => i !== index);
    cell.innerText = "";
    cell.style.backgroundColor = "";
  } else {
    flaggedCells.push(index);
    cell.innerText = "🚩";
    cell.style.backgroundColor = "#f88";
  }
}

function revealCell(cell, index) {
  if (revealedCells.includes(index)) return;
  revealedCells.push(index);
  cell.disabled = true;
  cell.classList.add("safe");
  const adjacentBombs = countAdjacentBombs(index);
  if (adjacentBombs > 0) {
    cell.innerText = adjacentBombs;
  }
  cell.style.backgroundColor = "#8f8";
}

function countAdjacentBombs(index) {
  return getNeighbors(index).filter(i => bombs.has(i)).length;
}

function getNeighbors(index) {
  const row = Math.floor(index / boardSize);
  const col = index % boardSize;
  const neighbors = [];

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i;
      const newCol = col + j;
      const neighborIndex = (newRow * boardSize) + newCol;
      if (
        newRow >= 0 && newRow < boardSize &&
        newCol >= 0 && newCol < boardSize &&
        neighborIndex !== index
      ) {
        neighbors.push(neighborIndex);
      }
    }
  }

  return neighbors;
}

function updateScore() {
  document.getElementById("player1-score").innerText = `Player 1:${scores[0]}  `;
  if (mode === 2) {
    document.getElementById("player2-score").innerText = ` Player 2:${scores[1]}`;
  }
}

function nextTurn() {
  if (mode === 2) turn = (turn + 1) % 2;
}

function checkDifficulty() {
  // O tabuleiro não cresce mais após 18 pontos
  if (totalPoints[turn] >= 18) {
    totalPoints[turn] = 18; // Mantém o limite de 18 pontos
  } else if (totalPoints[turn] >= 5) {
    totalPoints[turn] = 0;
    boardSize++;
    if (boardSize > 6) boardSize = 6; // Máximo de tamanho de tabuleiro
    const bombCount = Math.floor(boardSize * boardSize * 0.15);
    generateBoard(boardSize, boardSize, bombCount);
  }
}

function checkGameStatus() {
  const totalCells = boardSize * boardSize;
  if (revealedCells.length === totalCells - bombs.size) {
    // Não termina o jogo, apenas reinicia o tabuleiro
    alert(`Todos os espaços foram clicados! Reiniciando...`);
    resetGame();
  }
}

function resetGame() {
  scores = [0, 0];
  totalPoints = [0, 0];
  boardSize = 4; // Reinicia com tamanho de tabuleiro menor
  turn = 0;
  generateBoard(boardSize, boardSize, 6); // Menos bombas
  updateScore();
}

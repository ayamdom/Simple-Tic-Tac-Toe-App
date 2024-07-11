document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('grid');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popupContent');
    const newGameButton = document.getElementById('newGameButton');
    const winnerMessage = document.getElementById('winnerMessage');
    
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.addEventListener('click', handleCellClick);
      grid.appendChild(cell);
    }
  
    restartButton.addEventListener('click', restartGame);
    newGameButton.addEventListener('click', startNewGame);
  
    function handleCellClick(event) {
      const clickedCell = event.target;
      const cellIndex = clickedCell.dataset.index;
  
      if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        checkWin();
        checkDraw();
        togglePlayer();
        updateStatus();
      }
    }
  
    function togglePlayer() {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  
    function updateStatus() {
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  
    function checkWin() {
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          gameActive = false;
          showPopup(`Player ${currentPlayer} wins!`);
          return;
        }
      }
    }
  
    function checkDraw() {
      if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        showPopup('It\'s a draw!');
      }
    }
  
    function showPopup(message) {
      winnerMessage.textContent = message;
      popup.style.display = 'flex';
    }
  
    function restartGame() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      currentPlayer = 'X';
      grid.childNodes.forEach(cell => cell.textContent = '');
      updateStatus();
      popup.style.display = 'none';
    }
  
    function startNewGame() {
      restartGame();
      popup.style.display = 'none';
    }
  });
  
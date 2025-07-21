export const getInitialBoard = () => {
  const board = Array.from({ length: 8 }, () => Array(8).fill(null))

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (row === 1 || row === 2) {
        board[row][col] = { player: 'white', type: 'yoz' }
      } else if (row === 5 || row === 6) {
        board[row][col] = { player: 'black', type: 'yoz' }
      }
    }
  }

  return board
}

export const getValidMoves = (board, piece, row, col) => {
  const directions = piece.type === 'yoz'
    ? (piece.player === 'white' ? [[1, 0], [0, -1], [0, 1]] : [[-1, 0], [0, -1], [0, 1]])
    : [[1, 0], [-1, 0], [0, -1], [0, 1]]

  const moves = []

  for (let [dr, dc] of directions) {
    const newRow = row + dr
    const newCol = col + dc

    if (
      newRow >= 0 && newRow < 8 &&
      newCol >= 0 && newCol < 8 &&
      board[newRow][newCol] === null
    ) {
      moves.push({ row: newRow, col: newCol })
    }

    // Yeme kontrolü
    const enemyRow = row + dr
    const enemyCol = col + dc
    const landRow = row + dr * 2
    const landCol = col + dc * 2

    if (
      landRow >= 0 && landRow < 8 &&
      landCol >= 0 && landCol < 8 &&
      board[enemyRow]?.[enemyCol] &&
      board[enemyRow][enemyCol].player !== piece.player &&
      board[landRow][landCol] === null
    ) {
      moves.push({
        row: landRow,
        col: landCol,
        capture: { row: enemyRow, col: enemyCol }
      })
    }
  }

  return moves
}

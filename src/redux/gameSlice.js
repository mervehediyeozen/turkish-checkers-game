import { createSlice } from '@reduxjs/toolkit'
import { getValidMoves, getInitialBoard } from './gameLogic'

const initialState = {
  board: getInitialBoard(),
  currentPlayer: 'white',
  selectedPiece: null,
  validMoves: [],
  winner: null,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    selectPiece: (state, action) => {
      const { row, col } = action.payload
      const piece = state.board[row][col]

      if (!piece || piece.player !== state.currentPlayer) return

      const moves = getValidMoves(state.board, piece, row, col)

    
      if (moves.length > 0) {
        state.selectedPiece = { row, col }
        state.validMoves = moves
      }
    },

    movePiece: (state, action) => {
      if (state.winner) return

      const { toRow, toCol } = action.payload
      const { row: fromRow, col: fromCol } = state.selectedPiece
      const piece = state.board[fromRow][fromCol]

      if (!piece) return

      const move = state.validMoves.find(m => m.row === toRow && m.col === toCol)

      // Hamleyi uygula
      state.board[toRow][toCol] = { ...piece }
      state.board[fromRow][fromCol] = null

      if (move?.capture) {
        const { row: capRow, col: capCol } = move.capture
        state.board[capRow][capCol] = null
      }

      // Dama kontrolü
      const damaRow = piece.player === 'white' ? 7 : 0
      if (piece.type === 'yoz' && toRow === damaRow) {
        state.board[toRow][toCol].type = 'dama'
      }

      // Zincirleme yeme kontrolü
      const newPiece = state.board[toRow][toCol]
      const nextMoves = getValidMoves(state.board, newPiece, toRow, toCol)
      const captureMoves = nextMoves.filter(m => m.capture)

      if (move?.capture && captureMoves.length > 0) {
        state.selectedPiece = { row: toRow, col: toCol }
        state.validMoves = captureMoves
        return
      }

      // Oyun bitiş kontrolü
      let whiteCount = 0, blackCount = 0
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const p = state.board[row][col]
          if (p) {
            if (p.player === 'white') whiteCount++
            if (p.player === 'black') blackCount++
          }
        }
      }

      if (whiteCount === 0) {
        state.winner = 'black'
        return
      }
      if (blackCount === 0) {
        state.winner = 'white'
        return
      }
      if (whiteCount === 1 && blackCount === 1) {
        state.winner = 'draw'
        return
      }

      // Sıra değiştir
      state.currentPlayer = piece.player === 'white' ? 'black' : 'white'
      state.selectedPiece = null
      state.validMoves = []
    },

    resetGame: (state) => {
      Object.assign(state, initialState)
    },
  },
})

export const { selectPiece, movePiece, resetGame } = gameSlice.actions
export default gameSlice.reducer

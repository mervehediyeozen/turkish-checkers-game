import { Box, Grid } from "@chakra-ui/react"
import { useSelector, useDispatch } from "react-redux"
import { movePiece , selectPiece } from "../redux/gameSlice"
import Piece from "./piece"

const GameBoard = () => {
  const board = useSelector(state => state.game.board)
  const selectedPiece = useSelector(state => state.game.selectedPiece)
  const validMoves = useSelector(state => state.game.validMoves)
  const winner = useSelector(state => state.game.winner)
  const dispatch = useDispatch()

  const isValidMove = (row, col) => validMoves.some(m => m.row === row && m.col === col)

  const handleClick = (row, col) => {
    if (
      selectedPiece &&
      validMoves.length > 0 &&
      !isValidMove(row, col)
    ) return

    const move = validMoves.find(m => m.row === row && m.col === col)
    if (move && selectedPiece) {
      dispatch(movePiece({ toRow: row, toCol: col }))
    } else {
      dispatch(selectPiece({ row, col }))
    }
  }

  return (
    <Box>
      <Grid templateColumns="repeat(8, 60px)" templateRows="repeat(8, 60px)">
        {board.map((row, rIdx) =>
          row.map((cell, cIdx) => {
            const isSelected =
              selectedPiece && selectedPiece.row === rIdx && selectedPiece.col === cIdx
            const isTarget = isValidMove(rIdx, cIdx)

            return (
              <Box
                key={`${rIdx}-${cIdx}`}
                bg={(rIdx + cIdx) % 2 === 0 ? "gray.300" : "gray.600"}
                w="60px"
                h="60px"
                border={isSelected ? "2px solid yellow" : isTarget ? "2px solid lime" : "1px solid black"}
                onClick={() => handleClick(rIdx, cIdx)}
              >
                {cell && <Piece player={cell.player} type={cell.type} />}
              </Box>
            )
          })
        )}
      </Grid>

      {winner && (
        <Box mt={4} p={4} textAlign="center" bg="gray.100" borderRadius="md" fontSize="17px" fontFamily="monospace" fontWeight="bold">
          {winner === 'draw' ? "Oyun Berabere (Gayyım)" : `Kazanan: ${winner.toUpperCase()}`}
        </Box>
      )}
    </Box>
  )
}

export default GameBoard

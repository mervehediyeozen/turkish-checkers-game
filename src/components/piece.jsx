import { Box } from "@chakra-ui/react"

const Piece = ({ player, type }) => {
  const color = player === "white" ? "white" : "black"
  const border = type === "dama" ? "3px solid gold" : "none"

  return (
    <Box
      w="40px"
      h="40px"
      m="auto"
      mt="10px"
      borderRadius="full"
      bg={color}
      border={border}
    />
  )
}

export default Piece

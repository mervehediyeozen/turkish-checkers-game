import { Box, Flex , Text } from '@chakra-ui/react'
import GameBoard from './components/gameBoard'
import Info from './components/information'


function App() {
  return (
    <>
    <Flex flexDirection="column">
        <Box bg="#dae1e3" textAlign="center" p="6px" borderBottom="4px" borderColor="#bcc8cc"  >
        <Text color="black" fontFamily="monospace" fontSize="30px" >Turkish Draughts </Text>
        </Box>
  
    <Flex w="full" h="full" flexDirection="row"  bg="#242a2b"  pb="100px">
      <Box width={["70%" , "78%"]} justifyItems="center" textAlign="center" >
      <Flex flexDirection="column" pt="70px" ml="200px"  >
     
        <Box >
        <GameBoard />
        </Box>
        </Flex>
        </Box>
        <Box width={["30%" , "22%"]}>
          <Info/>
        </Box>
   
        </Flex>
          </Flex>
          </>
  )
}

export default App


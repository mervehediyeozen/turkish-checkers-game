import { Flex, Box ,Text , Heading, Button } from "@chakra-ui/react"
import { useState } from "react"
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons"

function Info() {
    const [collapseInfo , setCollapseInfo] = useState(true);
    const handleClick = () => {
        setCollapseInfo(!collapseInfo)
    }
  return (
    <>
    {collapseInfo && (
        <>
        <Flex flexDirection="row" h="730px" gap="15px">
            <Box w={["10%" , "4%"]} >
                    <Button onClick={handleClick} size="sm" variant="solid" h="full" rounded="none" bg="#a2afb3"> 
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Button>
            </Box>
            <Box w={["90%" , "96%"]} h="full">
            <Flex   bg="#cbd4d6" flexDirection="column" borderLeft="4px" borderBottom="4px"  h="full" >
        <Box justifyItems="center" pt="30px" >
           
           <Heading  fontFamily="monospace" textDecoration="underline" fontSize="23px"> The Rules</Heading>
            </Box>
           <Box justifyItems="left" p="5px">
           <Text textDecoration="underline" >Board & Pieces</Text>
           <Text fontSize="13px">Played on an 8x8 board. <br/>Each player starts with 16 pieces, placed on the entire second and third rows from their side.  <br/>Unlike some other draughts variants, all squares are used, not just the dark ones.</Text>
               <Text textDecoration="underline" >Movement</Text>
           <Text fontSize="13px">Men (normal pieces) move forward or sideways, one square at a time. <br/>
They cannot move diagonally or backward.<br/>
Kings (promoted pieces) move any number of squares horizontally or vertically (like a rook in chess).</Text>
               <Text textDecoration="underline" >Capturing</Text>
           <Text fontSize="13px">Captures are mandatory.<br/>

Capturing is done by jumping over an opponent's piece in a straight line (forward, backward, or sideways).<br/>

Multiple captures (in one move) are allowed and required if possible.<br/>

A piece is captured and removed only after the full capturing sequence is completed.</Text>
   <Text textDecoration="underline" >Promotion to King</Text>
           <Text fontSize="13px">A man becomes a king when it reaches the last row on the opponent’s side.<br/>

Kings are very powerful and move like a rook (orthogonally, any distance).</Text>
<Text textDecoration="underline" >Winning</Text>
           <Text fontSize="13px">The game ends when one player has no legal moves left or loses all their pieces.<br/>

A draw is possible if no player can force a win.</Text>
           </Box>
           
         
       
     </Flex>
     </Box>
     </Flex>
     </>
    )}
    {!collapseInfo && (
                   <Flex h="700px" w="full" justifyContent="right">
                    <Box w={["10%" , "15%"]}>
                    <Button  w="full" h="full" onClick={handleClick} size="sm" variant="solid" rounded="none" bg="#a2afb3"> 
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Button>
                    </Box>
               
                    </Flex>
         

           
   
    )}
    
    </>
  )
}

export default Info
import { Button, Heading, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaScroll } from 'react-icons/fa'
import React from 'react'

const Home = () => {
  return (
    <>
      <Stack width={['80%', '60%']} py={4} spacing={4} mx='auto'>
        <Heading as='h4' fontSize={['lg', 'xl']} textAlign='center'>
          How can we help? Pick from options below:
        </Heading>
        <Button as={Link} variant='outline' to='new-ticket' leftIcon={<FaQuestionCircle/>}>
          <Heading as='h4' fontSize={["lg", "xl"]}>Create a new ticket</Heading>
        </Button>
        <Button as={Link} variant='outline' colorScheme='blackAlpha' to='tickets' leftIcon={<FaScroll/>}>
        <Heading as='h4' fontSize={["lg", "xl"]}>View my tickets</Heading>
        </Button>
      </Stack>
    </>
  )
}

export default Home
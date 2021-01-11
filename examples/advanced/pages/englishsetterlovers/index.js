import Link from 'next/link';
import { Box, Text, Image, Grid, GridItem, Link as ChakraLink, Button } from '@chakra-ui/react';

function Index() {
  return (
    <Box>
      <Grid gridTemplateColumns="400px 1fr" gridColumnGap={10}>
        <GridItem>
          <Image src="https://images.unsplash.com/photo-1605293313417-ec7506adadca?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
          <Text pt={2}>
            Picture by{' '}
            <ChakraLink href="https://unsplash.com/@iameddiejr" target="_blank">
              Eddie Junior
            </ChakraLink>{' '}
            on Unsplash
          </Text>
        </GridItem>
        <GridItem>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac posuere risus. Nam arcu
            nibh, luctus vitae sapien sed, feugiat mattis nisl. Donec maximus nisl enim. Cras ac dui
            eget augue consectetur rutrum. Nulla lectus quam, placerat eget aliquet id, pellentesque
            vel ipsum. Etiam vulputate turpis lectus, ac vulputate odio luctus quis. Vestibulum
            vitae nisi id sapien venenatis volutpat non a risus. Cras vel sem eu dui feugiat
            facilisis. Vivamus velit mi, auctor sed pulvinar ut, vulputate eget orci.
          </Text>
          <Box pt={2}>
            <Link href="/pictures">
              <Button colorScheme="green" size="sm">
                {' '}
                See pictures{' '}
              </Button>
            </Link>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Index;

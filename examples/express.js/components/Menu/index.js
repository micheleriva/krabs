import Link from 'next/link';
import { Flex, Box, Text, Grid, GridItem } from '@chakra-ui/react';

function Menu() {
  return (
    <Box bg="cyan.200" p={5}>
      <Flex justifyContent="center" alignItems="center">
        <Box maxWidth="90vw" w={1200}>
          <Flex justifyContent="space-between">
            <Text>
              {' '}
              <b>
                {' '}
                <Link href="/">English Setter Lovers</Link>{' '}
              </b>{' '}
            </Text>
            <Grid alignSelf="flex-end" gridTemplateColumns="repeat(2, 1fr)">
              <GridItem>
                {' '}
                <Link href="/about">About</Link>{' '}
              </GridItem>
              <GridItem>
                {' '}
                <Link href="/pictures">Pictures</Link>{' '}
              </GridItem>
            </Grid>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default Menu;

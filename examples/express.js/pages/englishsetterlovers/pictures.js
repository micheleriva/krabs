import { Image, Text, Grid, GridItem, Link as ChakraLink } from '@chakra-ui/react';

function About() {
  return (
    <Grid gridTemplateColumns="repeat(3, 1fr)" columnGap={10}>
      <GridItem>
        <Image src="https://images.unsplash.com/photo-1600431970752-5c35d6f81ac6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
        <Text pt={2}>
          {' '}
          <ChakraLink href="https://unsplash.com/@philhearing">@Phil Hearing</ChakraLink>{' '}
        </Text>
      </GridItem>
      <GridItem>
        <Image src="https://images.unsplash.com/photo-1605460375648-278bcbd579a6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
        <Text pt={2}>
          {' '}
          <ChakraLink href="https://unsplash.com/@lukasz_rawa">@Łukasz Rawa</ChakraLink>{' '}
        </Text>
      </GridItem>
      <GridItem>
        <Image src="https://images.unsplash.com/photo-1596482241357-169ec0de8a56?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80" />
        <Text pt={2}>
          {' '}
          <ChakraLink href="https://unsplash.com/@ehrman">@Jake Ehrman</ChakraLink>{' '}
        </Text>
      </GridItem>
    </Grid>
  );
}

export default About;

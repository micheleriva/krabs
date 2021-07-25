import { ChakraProvider } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import Menu from '../Menu';

function Layout(props) {
  return (
    <ChakraProvider>
      <Box bg="cyan.50" minHeight="100vh">
        <Menu />
        <Box maxWidth="90vw" width={1200} margin="auto" pt={10}>
          {props.children}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Layout;

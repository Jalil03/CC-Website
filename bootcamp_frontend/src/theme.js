import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
    fonts: {
      heading: `'Tektur', sans-serif`,
      body: `'Tektur', sans-serif`,
    },
  });
export default theme;

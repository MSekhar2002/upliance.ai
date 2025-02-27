// src/theme/theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.100',
      },
    },
  },
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
  },
  colors: {
    brand: {
      50: '#e6f7ff',
      100: '#b3e0ff',
      200: '#80caff',
      300: '#4db5ff',
      400: '#1a9fff',
      500: '#0080ff',
      600: '#0066cc',
      700: '#004d99',
      800: '#003366',
      900: '#001a33',
    },
    glassBg: 'rgba(23, 25, 35, 0.8)',
    glassHover: 'rgba(38, 41, 56, 0.8)',
    gradientStart: '#4158D0',
    gradientMid: '#C850C0',
    gradientEnd: '#FFCC70',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'lg',
        _focus: {
          boxShadow: 'none',
        },
      },
      variants: {
        glass: {
          bg: 'glassBg',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'whiteAlpha.200',
          _hover: {
            bg: 'glassHover',
            transform: 'translateY(-2px)',
            shadow: 'lg',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
        gradient: {
          bg: 'linear-gradient(45deg, var(--chakra-colors-gradientStart), var(--chakra-colors-gradientMid))',
          color: 'white',
          _hover: {
            bg: 'linear-gradient(45deg, var(--chakra-colors-gradientStart), var(--chakra-colors-gradientEnd))',
            transform: 'translateY(-2px)',
            shadow: 'lg',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        p: 6,
        bg: 'glassBg',
        backdropFilter: 'blur(10px)',
        borderRadius: 'xl',
        border: '1px solid',
        borderColor: 'whiteAlpha.200',
        boxShadow: 'xl',
        transition: 'all 0.3s ease',
      },
    },
  },
});

export default theme;
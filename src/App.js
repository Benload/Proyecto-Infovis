import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MainViz from './components/MainViz';
import backgroundImage from './cristiano-ronaldo-hd.png';
import data from './data.json';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00BFFF',
    },
    secondary: {
      main: '#FFFFFF',
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0,0,0,0.7)',
          transition: 'all 0.3s ease'
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          padding: '20px',
        }}
      >
        <MainViz data={data} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
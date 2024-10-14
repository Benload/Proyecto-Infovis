import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import YearlyGoals from './components/YearlyGoals';
import ClubGoals from './components/ClubGoals';
import GoalTypes from './components/GoalTypes';
import LeagueGoals from './components/LeagueGoals';
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
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
      fontSize: '3.5rem', // Aumentado de 3rem
      color: '#00BFFF',
    },
    h5: {
      fontSize: '1.8rem', // Aumentado de 1.5rem
      fontWeight: 600,
      color: '#00BFFF',
    },
    h6: {
      fontSize: '1.4rem', // Añadido
      color: '#FFFFFF',
    },
    body1: {
      fontSize: '1.3rem', // Aumentado de 1.2rem
      color: '#FFFFFF',
    },
    body2: {
      fontSize: '1.1rem', // Aumentado de 1rem
      color: '#FFFFFF',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
        }}

      >
        <Typography variant="h2" align="center" gutterBottom>
          Cristiano Ronaldo: 700 Goles
        </Typography>
        <Grid container spacing={4} sx={{ flexGrow: 1 }}>
          <Grid item xs={12} md={6}>
            <YearlyGoals data={data.anos} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <ClubGoals data={data.clubes} />
              </Grid>
              <Grid item xs={12}>
                <GoalTypes data={data.tipos_goles} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <LeagueGoals data={data.ligas} />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
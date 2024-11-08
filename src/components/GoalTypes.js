import React from 'react';
import { Box, Typography, Grid, Avatar } from '@mui/material';

const GoalTypes = ({ data }) => {
  const emojis = {
    "penales": "⚽",
    "cabeza": "🤯",
    "pie_derecho": "👟",
    "pie_izquierdo": "👞",
    "tiros_libres": "🎯",
    "in_game": "🏃‍♂️"
  };

  const translateType = (type) => {
    const translations = {
      "penales": "Penales",
      "cabeza": "Cabeza",
      "pie_derecho": "Pie derecho",
      "pie_izquierdo": "Pie izquierdo",
      "tiros_libres": "Tiros libres",
      "in_game": "En juego"
    };
    return translations[type] || type.replace('', ' ');
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Tipos de Goles
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {Object.entries(data).map(([type, count]) => (
          <Grid item xs={4} sm={2} key={type}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ width: 70, height: 70, bgcolor: '#00BFFF', marginBottom: 1, fontSize: '2rem' }}>
                {emojis[type] || '❓'}
              </Avatar>
              <Typography variant="body2" align="center">{translateType(type)}</Typography>
              <Typography variant="h6" color="primary" align="center">{count}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GoalTypes;
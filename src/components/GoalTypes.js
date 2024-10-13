import React from 'react';
import { Box, Typography, Grid, Avatar } from '@mui/material';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AdjustIcon from '@mui/icons-material/Adjust';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

const GoalTypes = ({ data }) => {
  const icons = {
    "penales": <SportsScoreIcon />,
    "cabeza": <SportsKabaddiIcon />,
    "pie_derecho": <DirectionsRunIcon />,
    "pie_izquierdo": <AccessibilityNewIcon />,
    "tiros_libres": <AdjustIcon />,
    "in_game": <SportsSoccerIcon />
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
              <Avatar sx={{ width: 70, height: 70, bgcolor: '#00BFFF', marginBottom: 1 }}>
                {icons[type]}
              </Avatar>
              <Typography variant="body2" align="center">{type.replace('_', ' ')}</Typography>
              <Typography variant="h6" color="primary" align="center">{count}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GoalTypes;
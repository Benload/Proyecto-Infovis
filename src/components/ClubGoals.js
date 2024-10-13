import React from 'react';
import { Box, Typography, Grid, Avatar } from '@mui/material';

const clubLogos = {
  "Real Madrid": "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
  "Juventus FC": "https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg",
  "Al-Nassr FC": "https://upload.wikimedia.org/wikipedia/en/a/a0/Al_Nassr_FC.svg",
  "Sporting CP": "https://upload.wikimedia.org/wikipedia/en/2/2d/Sporting_CP.svg",
  "Manchester United": "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg"
};

const ClubGoals = ({ data }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Goles por Club
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(data).map(([club, goals]) => (
          <Grid item xs={6} key={club}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={clubLogos[club]} alt={club} sx={{ width: 70, height: 70, marginRight: 2 }} />
              <Box>
                <Typography variant="body1">{club}</Typography>
                <Typography variant="h6" color="primary">{goals}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ClubGoals;
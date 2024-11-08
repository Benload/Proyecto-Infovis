import React from 'react';
import { Box, Typography, Grid, Avatar } from '@mui/material';

const clubLogos = {
  "Real Madrid": "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
  "Juventus FC": "https://upload.wikimedia.org/wikipedia/commons/a/a8/Juventus_FC_-_pictogram_black_%28Italy%2C_2017%29.svg",
  "Al-Nassr FC": "https://upload.wikimedia.org/wikipedia/en/a/ac/Al_Nassr_FC_Logo.svg",
  "Sporting CP": "https://upload.wikimedia.org/wikipedia/en/e/e1/Sporting_Clube_de_Portugal_%28Logo%29.svg",
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
          <Grid item xs={12} sm={6} key={club}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={clubLogos[club]}
                  alt={club}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    backgroundColor: 'transparent',
                  }}
                />
              </Box>
              <Typography variant="h6" sx={{ marginLeft: 2 }}>
                {club}: {goals} goles
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ClubGoals;
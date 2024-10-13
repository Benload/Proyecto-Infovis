import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const LeagueGoals = ({ data }) => {
  const sortedLeagues = Object.entries(data).sort((a, b) => b[1] - a[1]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Goles por Liga
      </Typography>
      <Grid container spacing={2}>
        {sortedLeagues.map(([league, goals]) => (
          <Grid item xs={6} sm={3} key={league}>
            <Typography variant="body1" color="primary">
              {league}
            </Typography>
            <Typography variant="h6">
              {goals}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LeagueGoals;
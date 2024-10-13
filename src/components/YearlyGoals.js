import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

const YearlyGoals = ({ data }) => {
  const chartData = Object.entries(data).map(([year, goals]) => ({ year, goals }));

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Goles por Año
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
          <XAxis type="number" tick={{ fill: 'white' }} />
          <YAxis dataKey="year" type="category" tick={{ fill: 'white' }} />
          <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }} />
          <Bar dataKey="goals" fill="#00BFFF" barSize={20} label={{ position: 'right', fill: 'white' }} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default YearlyGoals;
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Box, Typography, IconButton } from '@mui/material';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const InteractiveGoalsViz = ({ data }) => {
    const [selectedYear, setSelectedYear] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [oscillator, setOscillator] = useState(null);
    const [audioContext, setAudioContext] = useState(null);

    // Inicializar el contexto de audio
    useEffect(() => {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(context);
        return () => {
            if (context) {
                context.close();
            }
        };
    }, []);

    // Procesar datos para el gráfico de línea
    const yearlyData = Object.entries(data.anos)
        .map(([year, goals]) => ({
            year: parseInt(year),
            goals,
        }))
        .sort((a, b) => a.year - b.year);

    // Función para reproducir sonido
    const playGoalSound = (goals) => {
        if (!isMuted && audioContext) {
            // Detener oscilador anterior si existe
            if (oscillator) {
                oscillator.stop();
            }

            // Crear nuevo oscilador
            const osc = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            // Mapear goles a frecuencia (entre 220Hz y 880Hz)
            const frequency = 220 + (goals / 60) * 660;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(frequency, audioContext.currentTime);

            // Configurar envelope del sonido
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);

            osc.connect(gainNode);
            gainNode.connect(audioContext.destination);

            osc.start();
            osc.stop(audioContext.currentTime + 0.3);

            setOscillator(osc);
        }
    };

    // Reproducción automática
    useEffect(() => {
        let interval;
        if (isPlaying) {
            let index = 0;
            interval = setInterval(() => {
                if (index < yearlyData.length) {
                    setSelectedYear(yearlyData[index].year);
                    playGoalSound(yearlyData[index].goals);
                    index++;
                } else {
                    setIsPlaying(false);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, audioContext]);

    return (
        <Box sx={{ width: '100%', p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
                Evolución de Goles por Año
            </Typography>

            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <IconButton
                    onClick={() => setIsPlaying(!isPlaying)}
                    sx={{
                        bgcolor: 'primary.main',
                        '&:hover': { bgcolor: 'primary.dark' },
                        color: 'white'
                    }}
                >
                    {isPlaying ? <Pause /> : <Play />}
                </IconButton>
                <IconButton
                    onClick={() => setIsMuted(!isMuted)}
                    sx={{
                        bgcolor: 'primary.main',
                        '&:hover': { bgcolor: 'primary.dark' },
                        color: 'white'
                    }}
                >
                    {isMuted ? <VolumeX /> : <Volume2 />}
                </IconButton>
            </Box>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={yearlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    onClick={(data) => {
                        if (data && data.activePayload) {
                            const year = data.activePayload[0].payload.year;
                            setSelectedYear(year);
                            playGoalSound(data.activePayload[0].payload.goals);
                        }
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis
                        dataKey="year"
                        stroke="#fff"
                    />
                    <YAxis stroke="#fff" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            border: '1px solid #666',
                            color: 'white'
                        }}
                        formatter={(value) => [`${value} goles`]}
                    />
                    <Line
                        type="monotone"
                        dataKey="goals"
                        stroke="#00bfff"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "#00bfff" }}
                        activeDot={{ r: 8, fill: "#fff" }}
                    />
                </LineChart>
            </ResponsiveContainer>

            {selectedYear && (
                <Box sx={{
                    mt: 4,
                    p: 2,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    borderRadius: 2,
                    textAlign: 'center'
                }}>
                    <Typography variant="h6">
                        Año {selectedYear}: {yearlyData.find(d => d.year === selectedYear)?.goals} goles
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Haz clic en los puntos del gráfico para escuchar el sonido correspondiente a cada año.
                        Más goles = tono más alto
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default InteractiveGoalsViz;
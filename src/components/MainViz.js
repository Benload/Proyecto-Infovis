import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    ReferenceDot
} from 'recharts';
import {
    Box,
    Typography,
    IconButton,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    Fade
} from '@mui/material';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const CareerPhases = {
    'Formación (2002-2006)': {
        color: '#4CAF50',
        description: 'Inicio de carrera en Sporting CP y primeros años en Manchester United',
        detailedDescription: `Periodo de formación inicial en Sporting CP antes de su histórico 
    fichaje por el Manchester United en 2003. Durante estos años, Ronaldo desarrolló su 
    característico estilo de juego y comenzó a mostrar destellos de su futura grandeza.`,
        baseNote: 261.63 // Do4
    },
    'Ascenso (2007-2009)': {
        color: '#2196F3',
        description: 'Consolidación en Manchester United y primer Balón de Oro',
        detailedDescription: `Etapa de consolidación en el Manchester United donde alcanzó su 
    primer Balón de Oro en 2008. Sus actuaciones llevaron al equipo a ganar la Champions 
    League y establecerse como uno de los mejores jugadores del mundo.`,
        baseNote: 329.63 // Mi4
    },
    'Dominio (2010-2018)': {
        color: '#FFC107',
        description: 'Era dorada en Real Madrid',
        detailedDescription: `Periodo más exitoso en el Real Madrid, donde se convirtió en el 
    máximo goleador histórico del club. Ganó cuatro Champions League y cuatro Balones de 
    Oro, estableciendo numerosos récords de goles.`,
        baseNote: 392.00 // Sol4
    },
    'Madurez (2019-2022)': {
        color: '#9C27B0',
        description: 'Etapa en Juventus y regreso a Manchester United',
        detailedDescription: `Periodo en Juventus donde ganó dos Series A y regreso al Manchester 
    United. Demostró su capacidad goleadora en nuevos desafíos y superó el récord de goles 
    internacionales con Portugal.`,
        baseNote: 440.00 // La4
    },
    'Etapa Final (2023-)': {
        color: '#FF5722',
        description: 'Periodo en Al-Nassr',
        detailedDescription: `Nueva fase en Al-Nassr donde continúa demostrando su capacidad 
    goleadora y expandiendo su influencia global en el fútbol. Mantiene su nivel competitivo 
    y sigue rompiendo récords.`,
        baseNote: 523.25 // Do5
    }
};

const getPhaseForYear = (year) => {
    if (year <= 2006) return 'Formación (2002-2006)';
    if (year <= 2009) return 'Ascenso (2007-2009)';
    if (year <= 2018) return 'Dominio (2010-2018)';
    if (year <= 2022) return 'Madurez (2019-2022)';
    return 'Etapa Final (2023-)';
};

const formatTitle = (title) => {
    // Reemplazar guiones bajos por espacios y capitalizar palabras
    return title
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
};

const MainViz = ({ data }) => {
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedPhase, setSelectedPhase] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackIndex, setPlaybackIndex] = useState(0);
    const intervalRef = useRef(null);
    const audioContextRef = useRef(null); // Referencia al AudioContext

    const yearlyData = useMemo(() => {
        return Object.entries(data.anos)
            .map(([year, goals]) => {
                const phase = getPhaseForYear(parseInt(year));
                return {
                    year: parseInt(year),
                    goals,
                    phase,
                    phaseColor: CareerPhases[phase].color
                };
            })
            .sort((a, b) => a.year - b.year);
    }, [data.anos]);

    const totalGoals = useMemo(() => {
        return Object.values(data.clubes).reduce((a, b) => a + b, 0);
    }, [data.clubes]);

    // Calcular goles mínimos y máximos
    const minGoals = useMemo(() => Math.min(...yearlyData.map(d => d.goals)), [yearlyData]);
    const maxGoals = useMemo(() => Math.max(...yearlyData.map(d => d.goals)), [yearlyData]);

    const playNote = (frequency) => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        const audioContext = audioContextRef.current;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);

        // Desconectar después de detenerse
        oscillator.onended = () => {
            oscillator.disconnect();
            gainNode.disconnect();
        };
    };

    const playGoalSound = (goals) => {
        if (!isMuted) {
            const minFrequency = 220; // La3
            const maxFrequency = 880; // La5

            // Mapear goles a frecuencia
            const frequency = ((goals - minGoals) / (maxGoals - minGoals)) * (maxFrequency - minFrequency) + minFrequency;

            playNote(frequency);
        }
    };

    useEffect(() => {
        if (isPlaying) {
            setPlaybackIndex(0); // Reiniciar playbackIndex al iniciar
            intervalRef.current = setInterval(() => {
                setPlaybackIndex((prevIndex) => {
                    if (prevIndex < yearlyData.length - 1) {
                        return prevIndex + 1;
                    } else {
                        clearInterval(intervalRef.current);
                        setIsPlaying(false);
                        return prevIndex + 1; // Asegurar que la última nota se reproduzca
                    }
                });
            }, 2000);
            return () => clearInterval(intervalRef.current);
        } else {
            clearInterval(intervalRef.current);
        }
    }, [isPlaying, yearlyData.length]);

    useEffect(() => {
        if (playbackIndex < yearlyData.length) {
            const currentData = yearlyData[playbackIndex];
            setSelectedYear(currentData.year);
            if (isPlaying) {
                playGoalSound(currentData.goals);
            }
        }
    }, [playbackIndex, isPlaying, yearlyData]);

    const handlePlayPause = () => {
        if (!isPlaying) {
            setPlaybackIndex(0); // Reiniciar playbackIndex al iniciar
        }
        setIsPlaying(!isPlaying);
    };

    const handlePhaseClick = (phase) => {
        setSelectedPhase(phase === selectedPhase ? null : phase);
    };

    const handleDataClick = (data) => {
        if (data && data.activePayload) {
            const payload = data.activePayload[0].payload;
            setSelectedYear(payload.year);
            playGoalSound(payload.goals);
        }
    };

    return (
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: 3 }}>
            <Typography
                variant="h2"
                align="center"
                gutterBottom
                sx={{
                    color: '#00BFFF',
                    fontSize: '4rem',
                    mb: 4,
                    fontWeight: 'bold'
                }}
            >
                La Carrera Goleadora de Cristiano Ronaldo
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card sx={{ bgcolor: 'rgba(0,0,0,0.6)', mb: 3 }}>
                        <CardContent>
                            <Grid container spacing={2}>
                                {Object.entries(CareerPhases).map(
                                    ([phase, { color, description }]) => (
                                        <Grid item xs={12} md={2.4} key={phase}>
                                            <Box
                                                onClick={() => handlePhaseClick(phase)}
                                                sx={{
                                                    cursor: 'pointer',
                                                    p: 1,
                                                    borderRadius: 1,
                                                    bgcolor:
                                                        selectedPhase === phase
                                                            ? `${color}22`
                                                            : 'transparent',
                                                    '&:hover': { bgcolor: `${color}11` }
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: '100%',
                                                        height: 4,
                                                        bgcolor: color,
                                                        mb: 1
                                                    }}
                                                />
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        color: color,
                                                        fontSize: '1.3rem',
                                                        fontWeight:
                                                            selectedPhase === phase
                                                                ? 'bold'
                                                                : 'normal'
                                                    }}
                                                >
                                                    {phase}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    )
                                )}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card sx={{ bgcolor: 'rgba(0,0,0,0.6)' }}>
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 2,
                                    mb: 2
                                }}
                            >
                                <IconButton
                                    onClick={handlePlayPause}
                                    sx={{
                                        bgcolor: 'primary.main',
                                        '&:hover': { bgcolor: 'primary.dark' },
                                        color: 'white',
                                        p: 2
                                    }}
                                >
                                    {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                                </IconButton>
                                <IconButton
                                    onClick={() => setIsMuted(!isMuted)}
                                    sx={{
                                        bgcolor: 'primary.main',
                                        '&:hover': { bgcolor: 'primary.dark' },
                                        color: 'white',
                                        p: 2
                                    }}
                                >
                                    {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
                                </IconButton>
                            </Box>

                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart
                                    data={yearlyData}
                                    margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                                    onClick={handleDataClick}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                    <XAxis
                                        dataKey="year"
                                        stroke="#fff"
                                        tickFormatter={(year) =>
                                            `'${year.toString().slice(2)}`
                                        }
                                        label={{
                                            value: 'Año',
                                            position: 'bottom',
                                            offset: 0,
                                            fill: '#fff',
                                            fontSize: 18
                                        }}
                                        tick={{ fontSize: 16 }}
                                    />
                                    <YAxis
                                        stroke="#fff"
                                        label={{
                                            value: 'Goles por Año',
                                            angle: -90,
                                            position: 'insideLeft',
                                            offset: -10,
                                            fill: '#fff',
                                            fontSize: 18
                                        }}
                                        tick={{ fontSize: 16 }}
                                    />
                                    <Tooltip
                                        content={({ active, payload }) => {
                                            if (active && payload?.length) {
                                                const data = payload[0].payload;
                                                return (
                                                    <Box
                                                        sx={{
                                                            bgcolor: 'rgba(0,0,0,0.9)',
                                                            p: 2,
                                                            borderRadius: 1
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                color: data.phaseColor,
                                                                fontSize: '1.3rem'
                                                            }}
                                                        >
                                                            {data.phase}
                                                        </Typography>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                color: '#fff',
                                                                fontSize: '1.5rem'
                                                            }}
                                                        >
                                                            {data.year}: {data.goals} goles
                                                        </Typography>
                                                    </Box>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="goals"
                                        stroke="#00bfff"
                                        strokeWidth={2}
                                        dot={({ cx, cy, payload }) => (
                                            <circle
                                                cx={cx}
                                                cy={cy}
                                                r={payload.year === selectedYear ? 6 : 4}
                                                fill={payload.phaseColor}
                                                stroke="#fff"
                                                strokeWidth={
                                                    payload.year === selectedYear ? 2 : 0
                                                }
                                            />
                                        )}
                                        activeDot={{ r: 8, fill: '#fff' }}
                                    />
                                    {selectedYear && (
                                        <ReferenceDot
                                            x={selectedYear}
                                            y={0} // Posicionar en el eje X
                                            r={8}
                                            fill="#fff"
                                            stroke="#00bfff"
                                            strokeWidth={3}
                                            ifOverflow="extendDomain" // Asegurar que el punto se muestre
                                        />
                                    )}
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {selectedYear && (
                    <Grid item xs={12}>
                        <Fade in>
                            <Card sx={{ bgcolor: 'rgba(0,0,0,0.6)' }}>
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={4}>
                                            <Typography
                                                variant="h5"
                                                gutterBottom
                                                sx={{
                                                    color: '#00BFFF',
                                                    fontSize: '2.2rem',
                                                    mb: 2
                                                }}
                                            >
                                                Año {selectedYear}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    mb: 2,
                                                    fontSize: '1.8rem',
                                                    color:
                                                        CareerPhases[
                                                            getPhaseForYear(selectedYear)
                                                        ].color
                                                }}
                                            >
                                                {
                                                    yearlyData.find(
                                                        (d) => d.year === selectedYear
                                                    )?.goals
                                                }{' '}
                                                goles
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    mt: 2,
                                                    color: '#fff',
                                                    lineHeight: 1.8,
                                                    textAlign: 'justify',
                                                    fontSize: '1.3rem'
                                                }}
                                            >
                                                {
                                                    CareerPhases[
                                                        getPhaseForYear(selectedYear)
                                                    ].detailedDescription
                                                }
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} md={8}>
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                                sx={{
                                                    color: '#00BFFF',
                                                    fontSize: '1.8rem',
                                                    mb: 3
                                                }}
                                            >
                                                Proporción de goles por tipo en carrera completa
                                            </Typography>
                                            {Object.entries(data.tipos_goles).map(
                                                ([tipo, cantidad]) => {
                                                    const porcentaje =
                                                        (cantidad / totalGoals) * 100;
                                                    return (
                                                        <Box key={tipo} sx={{ mb: 2 }}>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    mb: 1,
                                                                    fontSize: '1.3rem',
                                                                    color: '#fff'
                                                                }}
                                                            >
                                                                {formatTitle(tipo)}: {cantidad} (
                                                                {porcentaje.toFixed(1)}%)
                                                            </Typography>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                value={porcentaje}
                                                                sx={{
                                                                    height: 8,
                                                                    borderRadius: 4,
                                                                    bgcolor:
                                                                        'rgba(255,255,255,0.1)',
                                                                    '& .MuiLinearProgress-bar': {
                                                                        bgcolor:
                                                                            CareerPhases[
                                                                                getPhaseForYear(
                                                                                    selectedYear
                                                                                )
                                                                            ].color
                                                                    }
                                                                }}
                                                            />
                                                        </Box>
                                                    );
                                                }
                                            )}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Fade>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default MainViz;

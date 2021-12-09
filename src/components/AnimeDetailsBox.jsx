import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


export default function AnimeDetailsBox({titleEn,titleEnJp,titleJaJp,synonyms,showType,
    episodeCount,status,startDate,endDate,totalLength,episodeLength, posterImage}) {
    const convertedLength = convertLength(totalLength);
    
    return (
            <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
                    <img 
                        src={posterImage}
                        loading="lazy"
                        alt={titleEn}
                    />
                    <Typography variant="h6" gutterBottom>
                        Anime Details
                    </Typography>
                    <ul style={{textAlign: 'left'}}>
                        <Typography><strong>English</strong>&emsp;{titleEn}</Typography>
                        <Typography><strong>Japanese</strong>&emsp;{titleJaJp}</Typography>
                        <Typography><strong>Japanese (Romaji)</strong>&emsp;{titleEnJp}</Typography>
                        <Typography><strong>Synonyms</strong>&emsp;{synonyms}</Typography>
                        <Typography><strong>Episodes</strong>&emsp;{episodeCount}</Typography>
                        <Typography><strong>Status</strong>&emsp;{status}</Typography>
                        <Typography><strong>Aired</strong>&emsp;{startDate} to {endDate}</Typography>
                        <Typography><strong>Length</strong>&emsp;{convertedLength}</Typography>
                        <Typography><strong>Episode Length</strong>&emsp;{episodeLength}</Typography>
                    </ul>
                </Paper>
            </Grid>
    )
}

const convertLength = (length) => {
    const lengthI = parseInt(length);
    const hours = Math.floor(lengthI / 60);
    const minutes = lengthI % 60;
    return `${hours} hours, ${minutes} minutes total`;
}
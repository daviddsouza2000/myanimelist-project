import React from 'react'
import Grid from '@mui/material/Grid';

export default function AnimeMain({title, synopsis}) {
    return (
            <Grid
                item
                xs={12}
                md={8}
            >
                <h1>{title}</h1>
                {synopsis}
            </Grid>
    )
}

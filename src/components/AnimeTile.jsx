import React, { useState } from 'react';
import './AnimeTile.css';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';

export default function AnimeTile({ id, title, posterImage, synopsis }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const url = `/anime/${id}`;
    return (
        <Grid item
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}>
            <Link to={url}>
                <Paper elevation={5} sx={{ p: 2, bgcolor: 'grey.200' }}>
                    <img className="AnimeTile"
                        src={posterImage}
                        loading="lazy"
                        alt={title}
                    />
                </Paper>
            </Link>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1 }} variant="h6">{title}</Typography>
                <Typography sx={{ p: 1 }}>{synopsis}</Typography>
            </Popover>
        </Grid>
    )
}

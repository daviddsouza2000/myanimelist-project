import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

import AnimeListAddDialogBox from './AnimeListAddDialogBox';

export default function AnimeTileAdd(props) {
    const { username,
        docID,
        id,
        anime_id,
        episodes_watched,
        episode_count,
        title,
        image,
        score,
        watch_status,
        isDisabled
     } = props;

    const [openDialog, setOpenDialog] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Grid item
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}>
                <Button disabled={isDisabled} onClick={() => {setOpenDialog(true)}}>
                    <Paper elevation={5} sx={{ p: 2, bgcolor: 'grey.200' }}>
                        <img className="AnimeTile"
                            src={image}
                            loading="lazy"
                            alt={title}
                            style={isDisabled ? {"WebkitFilter": "grayscale(1)"} : null}
                        />
                    </Paper>
                </Button>
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
                </Popover>
            </Grid>
            <AnimeListAddDialogBox openDialog={openDialog} 
            username={username}
            docID={docID}
            id={id}
            anime_id={anime_id}
            episodes_watched={episodes_watched}
            episode_count={episode_count}
            title={title}
            image={image}
            score={score}
            watch_status={watch_status}></AnimeListAddDialogBox>
        </>
    )
}

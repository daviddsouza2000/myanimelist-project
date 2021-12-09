import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';

import { firestore } from '../firebase';

const watch_status_options = ["completed", "watching", "on hold", "dropped", "plan to watch"];

const score_options = [
    {
        value: 1,
        label: "(1) Appalling"
    },
    {
        value: 2,
        label: "(2) Horrible"
    },
    {
        value: 3,
        label: "(3) Very Bad"
    },
    {
        value: 4,
        label: "(4) Bad"
    },
    {
        value: 5,
        label: "(5) Average"
    },
    {
        value: 6,
        label: "(6) Fine"
    },
    {
        value: 7,
        label: "(7) Good"
    },
    {
        value: 8,
        label: "(8) Very Good"
    },
    {
        value: 9,
        label: "(9) Great"
    },
    {
        value: 10,
        label: "(10) Masterpiece"
    },
]

export default function AnimeListDialogBox({ openDialog, docID, username, id, anime_id, episodes_watched, episode_count, image, score, title, watch_status, currentUid }) {
    const [open, setOpen] = useState(openDialog);

    const [watchStatus, setWatchStatus] = useState(watch_status);
    const watchStatusRef = useRef();

    const [episodesWatched, setEpisodesWatched] = useState(episodes_watched);

    const [scoreState, setScoreState] = useState(score);
    const scoreStateRef = useRef();

    useEffect(() => {
        setOpen(openDialog);
    }, [openDialog]);

    const ref = firestore.collection("animelists");

    const episodesWatchedInputProps = {
        step: 1,
        min: 0,
        max: { episode_count },
        type: 'number',
        'aria-labelledby': 'input-slider',
    }

    const handleSliderChange = (event, newValue) => {
        setEpisodesWatched(newValue);
    };

    const handleInputChange = (event) => {
        if (event.target.value < 0) {
            setEpisodesWatched(0);
        } else if (event.target.value > episode_count) {
            setEpisodesWatched(episode_count);
        } else {
            setEpisodesWatched(event.target.value === '' ? '' : Number(event.target.value));
        }
    };

    const handleBlur = () => {
        if (episodesWatched < 0) {
            setEpisodesWatched(0);
        } else if (episodesWatched > episode_count) {
            setEpisodesWatched(episode_count);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        setOpen(false);
        const updatedEntry = {
            docID, 
            id,
            anime_id,
            episodes_watched: episodesWatched,
            episode_count,
            image,
            score: scoreState,
            title,
            watch_status: watchStatus,
            username,
            uid: currentUid
        };
        ref.doc(docID).set(updatedEntry).catch((err) => {console.log(err)});
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
                <DialogTitle><Link to={`/anime/${id}`} >{title}</Link></DialogTitle>
                <DialogContent>
                    <div>
                        <TextField
                            id="select-watch-status"
                            select
                            label="Status"
                            value={watchStatus}
                            onChange={(event) => {
                                setWatchStatus(event.target.value);
                            }}
                            inputRef={watchStatusRef}
                            variant="standard"
                        >
                            {watch_status_options.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div>
                        <Typography id="input-slider" gutterBottom>
                            Episodes Watched
                        </Typography>
                        <Slider
                            value={typeof episodesWatched === 'number' ? episodesWatched : 0}
                            onChange={handleSliderChange}
                            aria-labelledby="input-slider"
                            min={0}
                            max={episode_count}
                        />
                        <Input
                            value={episodesWatched}
                            size="small"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            inputProps={episodesWatchedInputProps}
                        />
                    </div>
                    <div>
                        <TextField
                            id="select-score"
                            select
                            label="Your Score"
                            value={scoreState}
                            onChange={(event) => {
                                setScoreState(event.target.value);
                            }}
                            inputRef={scoreStateRef}
                            variant="standard"
                        >
                            {score_options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

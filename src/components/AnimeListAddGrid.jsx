import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from "uuid";

import AnimeTileAdd from './AnimeTileAdd';

import { useAuth } from '../contexts/AuthContext';

const style = {
    marginTop: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

export default function AnimeListAddGrid({stuff, username}) {
    const [results, setResults] = useState('');
    const [loading, setLoading] = useState(false);

    const [animeGrid, setAnimeGrid] = useState([]);

    const { currentUser } = useAuth();

    useEffect(() => {
        const res = filterData(results);
        setAnimeGrid(res);
    }, [results]);

    const checkInStuff = (currentID) => {
        for(const val of stuff) {
            if (val.id === currentID ) {
                return true;
            }
        }
        return false;
    }

    const filterData = (dataStr) => {
        const res = [];
        if (dataStr){
            var data = JSON.parse(dataStr);
            data = data.data;
            data.forEach((animeData) => {
                res.push(createAnimeTileObject(animeData));
            });
        }
        return res;
    }
    
    const createAnimeTileObject = (animeData) => {
        const currentUsername = username.slice();
        const docID = uuidv4();
        const id = parseInt(animeData.id);
        const anime_id = parseInt(animeData.id);
        const episodes_watched = 0;
        const episode_count = animeData.attributes.episodeCount;
        const title = animeData.attributes.canonicalTitle;
        const image = animeData.attributes.posterImage.tiny;
        const score = 10;
        const watch_status = "completed";
        const isDisabled = checkInStuff(id);
        return {
            username: currentUsername,
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
        };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const searchParam = data.get("searchBox");

        if (searchParam) {
            try {
                setLoading(true);
                const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${searchParam}&page[limit]=20`);
                const data = await response.json();
                setResults(JSON.stringify(data));
            } catch {
            }
        }

        setLoading(false);
    }

    return (
        <Box
            sx={style}
        >
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={0}>
                    <Grid item xs={9}>
                        <TextField
                            margin="normal"
                            id="searchBox"
                            label="Search Anime"
                            name="searchBox"
                            autoFocus
                            size="large"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            disabled={loading}
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={3}>
                {animeGrid.map((animeTile, animeTileIdx) => {
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
                     } = animeTile;
                    return (
                        <AnimeTileAdd
                            key={animeTileIdx}
                            username={username}
                            docID={docID}
                            id={id}
                            anime_id={anime_id}
                            episodes_watched={episodes_watched}
                            episode_count={episode_count}
                            title={title}
                            image={image}
                            score={score}
                            watch_status={watch_status}
                            isDisabled={isDisabled}
                            currentUid={currentUser.uid}
                            ></AnimeTileAdd>
                    );
                })}
            </Grid>
        </Box>
    )
}


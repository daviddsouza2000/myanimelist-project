import React, { useState } from 'react';
import AnimeGrid from '../components/AnimeGrid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function AnimePage() {
    const [results, setResults] = useState('');
    const [loading, setLoading] = useState(false);

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

    // useEffect(
    //     () => {
    //         const fetchResults = async () => {
    //             if (searchParam) {
    //                 const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${searchParam}&page[limit]=20`);
    //                 const data = await response.json();
    //                 setResults(JSON.stringify(data));
    //             }
    //         }
    //         fetchResults();
    //     }, [searchParam]
    // );

    return (
        <div className="AnimePage">
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
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
            </Box>
            <AnimeGrid dataStr={results}></AnimeGrid>
        </div>
    )
}

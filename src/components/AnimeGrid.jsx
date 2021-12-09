import React, {useState, useEffect } from 'react'
import AnimeTile from './AnimeTile';
import Grid from '@mui/material/Grid';

export default function AnimeGrid({dataStr}) {
    const [animeGrid, setAnimeGrid] = useState([]);

    useEffect(() =>{
        const res = filterData(dataStr);
        setAnimeGrid(res);
    }, [dataStr]);

    return (
        <div className="AnimeGrid">
            <Grid container spacing={3}>
                {animeGrid.map((animeTile, animeTileIdx) => {
                    const {id, title, posterImage, synopsis} = animeTile;
                    return (
                        <AnimeTile
                            key={animeTileIdx}
                            id={id}
                            title={title}
                            posterImage={posterImage}
                            synopsis={synopsis}></AnimeTile>
                    );
                })}
            </Grid>
        </div>
    );
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
    const id = animeData.id;
    const title = animeData.attributes.canonicalTitle;
    const posterImage = animeData.attributes.posterImage.small;
    const synopsis = animeData.attributes.synopsis;
    return {
        id,
        title,
        posterImage,
        synopsis
    };
}
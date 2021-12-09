import React, { useState, useEffect } from 'react'
import {
    useParams
  } from "react-router-dom";
import AnimeDetailsBox from '../components/AnimeDetailsBox';
import AnimeMain from '../components/AnimeMain';  
import Grid from '@mui/material/Grid';

export default function AnimePageSingle() {
    let { id } = useParams();
    const [animeDetails, setAnimeDetails] = useState([]);
    const [animeMain, setAnimeMain] = useState([]);

    useEffect(
        () => {
            const fetchResults = async () => {
                const response = await fetch(`https://kitsu.io/api/edge/anime/${id}`);
                const data = await response.json();
                const dataStr = JSON.stringify(data)
                setAnimeDetails(extractAnimeDetails(dataStr));
                setAnimeMain(extractAnimeMain(dataStr));
            }
            fetchResults();
        }, [id]
    );

    return (
        <div className="AnimePageSingle">
            <Grid container spacing={2}>
            {animeDetails.map((details, animeDetailsIdx) => {
                const {titleEn,titleEnJp,titleJaJp,synonyms,showType,episodeCount,status,
                    startDate,endDate,totalLength,episodeLength, posterImage} = details;
                return (
                    <AnimeDetailsBox
                        key={animeDetailsIdx}
                        titleEn={titleEn}
                        titleEnJp={titleEnJp}
                        titleJaJp={titleJaJp}
                        synonyms={synonyms}
                        showType={showType}
                        episodeCount={episodeCount}
                        status={status}
                        startDate={startDate}
                        endDate={endDate}
                        totalLength={totalLength}
                        episodeLength={episodeLength}
                        posterImage={posterImage}
                        ></AnimeDetailsBox>
                );
            })}
            {animeMain.map((obj, Idx) => {
                const {title, synopsis} = obj;
                return (
                    <AnimeMain
                        key={Idx}
                        title={title}
                        synopsis={synopsis}></AnimeMain>
                );
            })}
            </Grid>
        </div>
    )
}

const extractAnimeMain = (dataStr) => {
    const res = [];
    if (dataStr){
        var data = JSON.parse(dataStr);
        data = data.data;
        const title = data.attributes.canonicalTitle;
        const synopsis = data.attributes.synopsis;
        res.push({
            title,
            synopsis
        });
    }
    return res;
}

const extractAnimeDetails = (dataStr) => {
    const res = [];
    if (dataStr){
        var data = JSON.parse(dataStr);
        data = data.data;
        const titleEn = data.attributes.titles.en;
        const titleEnJp = data.attributes.titles.en_jp;
        const titleJaJp = data.attributes.titles.ja_jp;
        const synonyms = (data.attributes.abbreviatedTitles).join(", ");
        const showType = data.attributes.showType;
        const episodeCount = data.attributes.episodeCount;
        const status = data.attributes.status;
        const startDate = data.attributes.startDate;
        const endDate = data.attributes.endDate;
        // add producers, licensors, studios here
        const totalLength = data.attributes.totalLength;
        const episodeLength = data.attributes.episodeLength;
        const posterImage = data.attributes.posterImage.small;
        res.push({
            titleEn,
            titleEnJp,
            titleJaJp,
            synonyms,
            showType,
            episodeCount,
            status,
            startDate,
            endDate,
            totalLength,
            episodeLength,
            posterImage
        });
    }
    return res;
}


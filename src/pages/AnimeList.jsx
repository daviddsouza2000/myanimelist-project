import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { firestore } from '../firebase';

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useAuth } from '../contexts/AuthContext';

import AnimeListDialogBox from '../components/AnimeListDialogBox';
import AnimeListAddGrid from '../components/AnimeListAddGrid';
import CopyToClipBoard from '../components/CopyToClipboard';

const animelist_rows = [
  {
    id: 100,
    anime_id: 100,
    image: "https://media.kitsu.io/anime/poster_images/100/tiny.jpg",
    title: "Fullmetal Alchemist",
    episodes_watched: 50,
    episode_count: 51,
    score: 9,
    watch_status: "watching"
  }
]

export default function AnimeList() {
  const [stuff, setStuff] = useState([]);

  const [value, setValue] = React.useState(0);

  let { username } = useParams();

  const { currentUser } = useAuth();

  const ref = firestore.collection("animelists");

  function getDocument() {
    ref.where("username", "==", username).onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      })
      setStuff(items);
    });
  }

  useEffect(() => {
    getDocument();
  }, []);


  const animelist_columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.05
    },
    {
      field: "image",
      headerName: "Image",
      sortable: false,
      flex: 0.08,
      renderCell: (params) => (
        <img
          width={70}
          src={params.value}
          loading="lazy"
          alt={params.value}
        />
      )
    },
    {
      field: 'title',
      headerName: 'Anime Title',
      flex: 1.3,
      renderCell: (params) => (
        <Link to={`/anime/${params.id}`}>{params.row.title}</Link>
      )
    },
    {
      field: 'score',
      headerName: 'score',
      flex: 0.1
    },
    {
      field: 'episodes_watched',
      headerName: 'Progress',
      flex: 0.1,
      renderCell: (params) => (
        `${params.row.episodes_watched} / ${params.row.episode_count}`
      )
    },
    {
      field: 'watch_status',
      headerName: 'Status',
      flex: 0.15
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 0.1,
      renderCell: (params) => (
        <AnimeListDialogBox {...params.row} currentUid={currentUser.uid}></AnimeListDialogBox>
      )
    }
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="View Anime List" />
        <Tab label="Add to Anime List" />
        <Tab label="Share Your Anime List" />
      </Tabs>
    </Box>
    {value===0 ?
      <DataGrid
        autoHeight={true}
        disableColumnMenu={true}
        rowHeight={75}
        disableSelectionOnClick={true}
        rows={stuff} columns={animelist_columns} />
    : null}
    {value===1 ? <AnimeListAddGrid stuff={stuff} username={username}></AnimeListAddGrid> : null}
    {value===2 ? <CopyToClipBoard></CopyToClipBoard> : null}
    </>
  )
}

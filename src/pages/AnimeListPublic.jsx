import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { firestore } from '../firebase';
import { DataGrid } from '@mui/x-data-grid';

export default function AnimeListPublic() {
  const [stuff, setStuff] = useState([]);
  let { username } = useParams();

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
  ];

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        disableColumnMenu={true}
        rowHeight={75}
        disableSelectionOnClick={true}
        rows={stuff} columns={animelist_columns} />
    </div>
  )
}

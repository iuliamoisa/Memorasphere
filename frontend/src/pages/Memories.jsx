import React, { useState } from "react";
import Masonry from '@mui/lab/Masonry';
import { Box, Button, Typography } from "@mui/material";
import "../styles/Memories.css"
import Card from '../components/Card'
import FilterBar from '../components/FilterBar'
import PropTypes from "prop-types";
import { useEffect } from "react";
import axios from "axios";
import api from '../api'
import Entry from '../components/Entry'
import noEntryImg from '../images/no-entries.svg';
import { useNavigate } from "react-router-dom";
import BackButton from '../components/BackButton';

function Memories() {
  const [entry, setEntries] = useState([])
  const [content, setContent] = useState("")

  useEffect(() => {
      getEntries()
  }, [])
  const getEntries = () => {
      api
          .get('/api/entries/')
          .then((res) => res.data)
          .then((data) => {
              setEntries(data); console.log(data);
          })
          .catch((err) => alert(err));
  };

  const deleteEntry = (id) => {
      api
          .delete(`/api/entries/delete/${id}/`)
          .then((res) => {
              if (res.status === 204) alert("Entry deleted")
              else alert("Failed to delete entry")
              getEntries()
          }).catch((err) => alert(err));
          
  }
  let navigate = useNavigate(); 
  const createMemory = () =>{ 
    let path = `/create-memo`; 
    navigate(path);
  }

  const generateAlbum = () => {
    navigate('/generate-album');
};


  return (
    <div className="memories-page">
        <BackButton></BackButton>
        <h1 className="memories-title">Your Digital Memories</h1>
        <div className="create-entry-button">
                <button className="submit-button" onClick={createMemory}>Create entry</button>
                {entry.length != 0 ? ( <button className="submit-button" onClick={generateAlbum}>Generate Album</button>) : null}
                
            </div>
            
          {/* {entry.map((entry) => <Entry entry={entry} onDelete={deleteEntry} key={entry.id}/>)} */}
          {entry.length === 0 ? (
                <div className="no-entry-message">
                    <img className="no-entries-img" src={noEntryImg} alt="0 results found" />
                    <p className="no-entries-txt">There are currently no <i>entries</i> in your diary.</p>
                </div>
            ) : (
                // <div className="entries">
                //     {entry.map((entry) => (
                //         <Entry className="entry" entry={entry} onDelete={deleteEntry} key={entry.id} />
                //     ))}
                // </div>
                <Box sx={{ width: '100%', minHeight: 400 }}>
                <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2} >
                    {entry.map((entry) => (
                    <Box key={entry.id} sx={{ mb: 4 }}>
                        <Entry entry={entry} onDelete={deleteEntry} />
                    </Box>
                    ))}
                </Masonry>
                </Box>
            )}
    </div>
  );
}

export default Memories;
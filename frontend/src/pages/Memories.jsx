import React, { useState } from "react";
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
  return (
    <div className="memories-page">

        <h1 className="memories-title">Your Digital Memories</h1>
        <div className="create-entry-button">
                <button className="submit-button" onClick={createMemory}>Create entry</button>
            </div>
          {/* {entry.map((entry) => <Entry entry={entry} onDelete={deleteEntry} key={entry.id}/>)} */}
          {entry.length === 0 ? (
                <div className="no-entry-message">
                    <img className="no-entries-img" src={noEntryImg} alt="0 results found" />
                    <p className="no-entries-txt">There are currently no <i>entries</i> in your diary.</p>
                </div>
            ) : (
                <div className="entries">
                    {entry.map((entry) => (
                        <Entry className="entry" entry={entry} onDelete={deleteEntry} key={entry.id} />
                    ))}
                </div>
            )}
    </div>
  );
}

export default Memories;
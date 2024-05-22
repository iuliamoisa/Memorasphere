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

//   const createEntry = (e) => {
//       e.preventDefault()
//       api
//           .post('/api/entries/', {content})
//           .then((res) => {
//               if (res.status === 201) alert("Entry created")
//               else alert("Failed to create entry")
//               getEntries()
//           }).catch((err) => alert(err));
          
//   }

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
            
      {/* <h2>Create entry</h2>
      <form onSubmit={createEntry}>
          <label htmlFor='content'>Content</label>
          <br></br>
          <textarea
              id="content"
              name="content"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="I'm thinking about..."
          ></textarea>
          <button className="submit-button" type="submit" value="submit">Create</button>
      </form> */}
    </div>
  );
}

export default Memories;
// function Memories() {
//     const [filter, setFilter] = useState({ month: "", year: "" });
//     const [memories, setMemories] = useState([]); // Lista completă de amintiri
//     const [filteredMemories, setFilteredMemories] = useState([]);
  
//     const fetchMemories = () => {
//         // Înlocuiți această funcție cu apeluri reale către API-ul dvs. pentru a obține datele amintirilor
//         // Aici amintirile sunt hardcodate pentru scopul de demonstrație
//         const memoriesData = [
//           { id: 1, image: "memory1.jpg", dateAdded: "2022-04-15" },
//           { id: 2, image: "memory2.jpg", dateAdded: "2023-03-22" },
//           { id: 3, image: "memory3.jpg", dateAdded: "2024-02-10" },
//           // Adăugați mai multe amintiri după nevoie
//         ];
//         setMemories(memoriesData);
//         setFilteredMemories(memoriesData); // Inițializați lista filtrată cu toate amintirile
//       };

    

//     useEffect(() => {
//         fetchMemories(); // Apelați funcția de preluare a amintirilor când componenta este montată
//     }, []);

//   // Funcție pentru a actualiza filtrul și a filtra cardurile
//   const handleFilterChange = (month, year) => {
//     setFilter({ month, year });

//     // Filtrare carduri bazat pe luna și anul selectat
//     const filtered = memories.filter((memory) => {
//       if (month && year) {
//         return (
//           new Date(memory.dateAdded).getMonth() + 1 === parseInt(month) &&
//           new Date(memory.dateAdded).getFullYear() === parseInt(year)
//         );
//       } else if (month) {
//         return new Date(memory.dateAdded).getMonth() + 1 === parseInt(month);
//       } else if (year) {
//         return new Date(memory.dateAdded).getFullYear() === parseInt(year);
//       }
//       return true; // Fără filtru
//     });

//     setFilteredMemories(filtered);
//   };
//   return (
//     <div className="memories-page">
//       <h1 className="memories-title">Your Digital Memories</h1>
//       <div>
//       <FilterBar onFilterChange={handleFilterChange} />
//       <div className="memory-gallery">
//         {filteredMemories.map((memory) => (
//           <Card key={memory.id} memory={memory} />
//         ))}
//       </div>
//     </div>
//     </div>
//   );
// }

// Memories.propTypes = {
//     memories: PropTypes.arrayOf(PropTypes.object).isRequired, // Validează prop-ul memories
//   };
  
// export default Memories;

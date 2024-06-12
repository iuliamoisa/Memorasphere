import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import '../styles/GenerateAlbum.css';

function GenerateAlbum() {
    const [entries, setEntries] = useState([]);
    const [selectedEntries, setSelectedEntries] = useState([]);
    const [albumName, setAlbumName] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        getEntries();
    }, []);

    const getEntries = () => {
        api.get('/api/entries/')
            .then((res) => setEntries(res.data))
            .catch((err) => alert(err));
    };

    const handleSelectEntry = (id) => {
        setSelectedEntries((prev) => {
            if (prev.includes(id)) {
                return prev.filter((entryId) => entryId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handleSubmit = () => {
        const data = {
            name: albumName,
            entries: selectedEntries,
        };

        console.log('Data being sent:', data); 

        api.post('/api/albums/', data)
            .then((res) => {
                alert('Album created');
                navigate('/memories');
            })
            .catch((err) => {
                alert('Failed to create album');
                console.error(err);
            });
    };

    return (
        <div className="generate-album-page">
            <BackButton></BackButton>
            <h1 className="generate-album-title">Generate Album</h1>
            <input
                    className='album-name-input'
                    type="text"
                    placeholder="Album Name"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                />
                
                
            <div className="entries">
                {entries.map((entry) => (
                    <div key={entry.id} className="entry">
                        <input
                        className='entry-checkbox'
                            type="checkbox"
                            checked={selectedEntries.includes(entry.id)}
                            onChange={() => handleSelectEntry(entry.id)}
                        />
                        {entry.image && <img src={entry.image} alt="Entry" className="entry-image" />}
                        <span>{entry.content}</span>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit} className="generate-album-button">Create Album</button>
        </div>
    );
}

export default GenerateAlbum;



// import React, { useState, useEffect } from 'react';
// import api from '../api';
// import { useNavigate } from 'react-router-dom';
// import BackButton from '../components/BackButton';
// // import '../styles/GenerateAlbum.css';

// function GenerateAlbum() {
//     const [entries, setEntries] = useState([]);
//     const [selectedEntries, setSelectedEntries] = useState([]);
//     const [albumName, setAlbumName] = useState('');
//     let navigate = useNavigate();

//     useEffect(() => {
//         getEntries();
//     }, []);

//     const getEntries = () => {
//         api.get('/api/entries/')
//             .then((res) => setEntries(res.data))
//             .catch((err) => alert(err));
//     };

//     const handleSelectEntry = (id) => {
//         setSelectedEntries((prev) => {
//             if (prev.includes(id)) {
//                 return prev.filter((entryId) => entryId !== id);
//             } else {
//                 return [...prev, id];
//             }
//         });
//     };

//     const handleSubmit = () => {
//         const data = {
//             name: albumName,
//             entries: selectedEntries,
//         };

//         console.log('Data being sent:', data); 

//         api.post('/api/albums/', data)
//             .then((res) => {
//                 alert('Album created');
//                 navigate('/albums');
//             })
//             .catch((err) => {
//                 alert('Failed to create album');
//                 console.error(err);
//             });
//     };

//     return (
//         <div className="generate-album-page">
//             <BackButton></BackButton>
//             <h1>Generate Album</h1>
//             <input
//                 type="text"
//                 placeholder="Album Name"
//                 value={albumName}
//                 onChange={(e) => setAlbumName(e.target.value)}
//             />
//             <div className="entries">
//                 {entries.map((entry) => (
//                     <div key={entry.id} className="entry">
//                         <input
//                             type="checkbox"
//                             checked={selectedEntries.includes(entry.id)}
//                             onChange={() => handleSelectEntry(entry.id)}
//                         />
//                         {entry.image && <img src={entry.image} alt="Entry" className="entry-image" />}
//                         <span>{entry.content}</span>
//                     </div>
//                 ))}
//             </div>
//             <button onClick={handleSubmit}>Create Album</button>
//         </div>
//     );
// }

// export default GenerateAlbum;


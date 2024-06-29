import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import '../styles/GenerateAlbum.css';
import { Grid, Box, Button, Checkbox, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function GenerateAlbum() {
    const [entries, setEntries] = useState([]);
    const [selectedEntries, setSelectedEntries] = useState([]);
    const [albumName, setAlbumName] = useState('');
    const [albums, setAlbums] = useState([]);
    const [entryAlbums, setEntryAlbums] = useState({});
    const [selectedAlbums, setSelectedAlbums] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        getEntries();
        getAlbums();
    }, []);

    const getEntries = () => {
        api.get('/api/entries/')
            .then((res) => {
                setEntries(res.data);
                const initialSelectedAlbums = {};
                res.data.forEach(entry => {
                    initialSelectedAlbums[entry.id] = entry.albums || [];
                });
                setSelectedAlbums(initialSelectedAlbums);
            })
            .catch((err) => alert(err));
    };

    const getAlbums = () => {
        api.get('/api/albums/')
            .then((res) => setAlbums(res.data))
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

    const handleAlbumChange = (entryId, event) => {
        setSelectedAlbums({
            ...selectedAlbums,
            [entryId]: event.target.value,
        });
    };

    const handleAddToAlbum = (entryId) => {
        api.post(`/api/entries/${entryId}/add_to_albums/`, { albums: selectedAlbums[entryId] })
            .then(() => {
                alert('Entry added to album(s)');
                setSelectedAlbums({
                    ...selectedAlbums,
                    [entryId]: [],
                });
            })
            .catch((err) => {
                alert('Failed to add entry to album(s)');
                console.error(err);
            });
    };

    const handleSubmit = () => {
        const data = {
            name: albumName,
            entries: selectedEntries,
        };

        api.post('/api/albums/', data)
            .then((res) => {
                alert('Album created');
                navigate('/albums');
            })
            .catch((err) => {
                alert('Failed to create album');
                console.error(err);
            });
    };

    return (
        <div className="generate-album-page">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <BackButton />
                <button className="generate-album-button" onClick={() => navigate('/albums')}>
                    See Albums
                </button>
            </Box>
            <h1 className="generate-album-title">Generate Album</h1>

            {selectedEntries.length > 0 && (
                <Grid container spacing={2} alignItems="center" my={2}>
                    <Grid item xs={12} md={8}>
                        <TextField
                            className='album-name-input'
                            label="Album Name"
                            variant="outlined"
                            value={albumName}
                            onChange={(e) => setAlbumName(e.target.value)}
                            style={{ margin: '1rem'  }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <button onClick={handleSubmit} className="generate-album-button">
                            Create Album
                        </button>
                    </Grid>
                </Grid>
            )}

            <Box className="entries">
                {entries.map((entry) => (
                    <Box key={entry.id} className="entry">
                        <Checkbox
                            className='entry-checkbox'
                            checked={selectedEntries.includes(entry.id)}
                            onChange={() => handleSelectEntry(entry.id)}
                        />
                        {entry.image && <img src={entry.image} alt="Entry" className="entry-image" />}
                        <span>{entry.content}</span>

                        {selectedEntries.includes(entry.id) && (
                            <FormControl fullWidth variant="outlined" className="album-dropdown">
                                <InputLabel id={`album-dropdown-label-${entry.id}`}
                                style={{ color: '#b384e1'  }}>Add to Album(s)</InputLabel>
                                <Select
                                    labelId={`album-dropdown-label-${entry.id}`}
                                    id={`album-dropdown-${entry.id}`}
                                    multiple
                                    value={selectedAlbums[entry.id] || []}
                                    onChange={(e) => handleAlbumChange(entry.id, e)}
                                    label="Add to Album(s)"
                                    style={{ margin: '2rem'  }}
                                >
                                    {albums.map((album) => (
                                        <MenuItem key={album.id} value={album.id}>
                                            <Checkbox checked={(selectedAlbums[entry.id] || []).includes(album.id)} />
                                            {album.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <button onClick={() => handleAddToAlbum(entry.id)} className="add-button">
                                    Add to Album(s)
                                </button>
                            </FormControl>
                        )}
                    </Box>
                ))}
            </Box>
        </div>
    );
}

export default GenerateAlbum;

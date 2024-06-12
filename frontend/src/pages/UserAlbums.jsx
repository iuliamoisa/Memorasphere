import React, { useState, useEffect } from 'react';
import api from '../api';
import Album from '../components/Album';
import BookViewer from '../components/BookViewer';
import BackButton from '../components/BackButton';
import '../styles/UserAlbum.css';

function UserAlbums() {
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    useEffect(() => {
        getAlbums();
    }, []);

    const getAlbums = () => {
        api.get('/api/albums/')
            .then((res) => {
                console.log('Fetched albums:', res.data);
                res.data.forEach(album => {
                    console.log(`Album ID: ${album.id}`);
                    if (Array.isArray(album.entries)) {
                        if (album.entries.length > 0) {
                            album.entries.forEach(entry => {
                                console.log(`Entry:`, entry);
                            });
                        } else {
                            console.log(`Album ID ${album.id} has no entries.`);
                        }
                    } else {
                        console.log(`Entries not found or not an array for album ID: ${album.id}`);
                    }
                });
                setAlbums(res.data);
            })
            .catch((err) => alert(err));
    };

    const handleAlbumClick = (album) => {
        console.log('Selected album:', album); 
        setSelectedAlbum(album);
    };

    const handleCloseBook = () => {
        setSelectedAlbum(null);
    };

    return (
        <div className="user-albums-page">
            <BackButton></BackButton>
            <h1 className="user-albums-title">Your Albums</h1>
            <div className="albums">
                {albums.map((album) => (
                    <Album key={album.id} album={album} onClick={() => handleAlbumClick(album)} />
                ))}
            </div>
            {selectedAlbum && (
                <BookViewer album={selectedAlbum} onClose={handleCloseBook} />
            )}
        </div>
    );
}

export default UserAlbums;

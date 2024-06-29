// BookViewer.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/BookViewer.css'; 

function BookViewer({ album, onClose, onDelete, onModify  }) {
    const [currentPage, setCurrentPage] = useState(0);

    const nextPage = () => {
        if (currentPage < album.entries.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const renderPage = () => {
        const entry = album.entries[currentPage];
        console.log('Current entry:', entry); 
        if (entry && entry.image) {
            console.log('Rendering image:', entry.image);
            return <img src={entry.image} alt="Entry" />;
        }
        return <p>No image available</p>;
    };

    return (
        <div className="book-viewer">
            <button className="close-button" onClick={onClose}>Close</button>
            <div className="book">
                <button className="prev-page" onClick={prevPage}>&lt;</button>
                <div className="page">
                    {renderPage()}
                </div>
                <button className="next-page" onClick={nextPage}>&gt;</button>
            </div>
            <div className="button-container">
                <button onClick={() => onDelete(album.id)} className="delete-button">Delete</button>
                <button onClick={() => onModify(album.id)} className="modify-button">Modify</button>
            </div>
        </div>
    );
}

BookViewer.propTypes = {
    album: PropTypes.shape({
        id: PropTypes.number.isRequired,
        entries: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                image: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onModify: PropTypes.func.isRequired
};

export default BookViewer;

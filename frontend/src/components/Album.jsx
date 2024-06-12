// Album.js
import React from 'react';
import PropTypes from 'prop-types';

function Album({ album, onClick }) {
    return (
        <div className="album" onClick={() => onClick(album)}>
            <h2>{album.name}</h2>
        </div>
    );
}

Album.propTypes = {
    album: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Album;

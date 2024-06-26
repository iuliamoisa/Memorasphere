import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import '../styles/Album.css';

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
function Album({ album, onClick }) {
    return (
        <Card className="album-card" onClick={onClick}>
            <CardActionArea className="album-content">
                <CardContent className="album-inner-content">
                    <Typography variant="h5" component="div" className="album-title">
                        {album.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="album-date">
                        {formatDate(album.created_at)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

Album.propTypes = {
    album: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        entries: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                image: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Album;

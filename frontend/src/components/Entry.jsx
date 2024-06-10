import React from "react";
import "../styles/Entry.css"
import PropTypes from 'prop-types';

function Entry({ entry, onDelete }) {
    const formattedDate = new Date(entry.created_at).toLocaleDateString("en-US");
  return (
    <div className="entry-container">
      <p className="entry-content">{entry.content}</p>
      {entry.image && <img src={entry.image} alt="Generated" className="entry-image" />}
      <p className="entry-date">{formattedDate}</p>
      <button onClick={() => onDelete(entry.id)} className="delete-button">
        Delete
      </button>
    </div>
  );
}


Entry.propTypes = {
  entry: PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      image: PropTypes.string,
      created_at: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Entry;
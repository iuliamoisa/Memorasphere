import React from "react";
import "../styles/Card.css";
import PropTypes from "prop-types";

function Card({ memory }) {
  return (
    <div className="card">
      <img src={memory.image} alt="Memory" className="card-image" />
      <div className="card-footer">
        <p className="card-date">Date Added: {memory.dateAdded}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
    memory: PropTypes.shape({
      image: PropTypes.string.isRequired,
      dateAdded: PropTypes.string.isRequired // Validate the dateAdded property
    }).isRequired
  };

export default Card;

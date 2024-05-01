import React from "react";
import "../styles/Entry.css"
function Entry({ entry, onDelete }) {
    const formattedDate = new Date(entry.created_at).toLocaleDateString("en-US");


  return (
    <div className="entry-container">
      <p className="entry-content">{entry.content}</p>
      <p className="entry-date">{formattedDate}</p>
      <button onClick={() => onDelete(entry.id)} className="delete-button">
        Delete
      </button>
    </div>
  );
}

export default Entry;

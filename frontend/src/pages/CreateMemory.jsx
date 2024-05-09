import React, { useState } from 'react';
import "../styles/CreateMemory.css";
import LoadingIndicator from '../components/LoadingIndicator';
import api from '../api';

function CreateMemory() {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [summary, setSummary] = useState("");
    const handleGenerate = () => {
        setLoading(true);
        // Make an API call to generate the image based on the content
        // Replace 'api.generateImage' with your actual API endpoint
        api.generateImage(content)
            .then((response) => {
                setGeneratedImage(response.data.imageUrl);
            })
            .catch((error) => {
                console.error("Error generating image:", error);
                // Handle error
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSave = () => {
        // Implement save functionality
    };

    const handleCancel = () => {
        // Implement cancel functionality
        setGeneratedImage(null); // Reset generated image
    };

        const createEntry = (e) => {
        e.preventDefault()
        api
            .post('/api/entries/', {content})
            .then((res) => {
                if (res.status === 201) alert("Entry created")
                else alert("Failed to create entry")
                // getEntries()
            }).catch((err) => alert(err));
            
    }

    return (
        <div className="create-memory-page">
            <h1 className="create-memory-title">What is in your mind?</h1>
            <div className="create-memory-content">
                <div className="left-panel">
                    <textarea
                        className="text-area"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter your thoughts..."
                    />
                    <button className="generate-button" onClick={createEntry}>
                        Generate
                    </button>
                </div>
                <div className="right-panel">
                    {loading ? (
                        <LoadingIndicator />
                    ) : (
                        generatedImage ? (
                            <div className="generated-image-container">
                                <img className="generated-image" src={generatedImage} alt="Generated" />
                                <div className="button-container">
                                    <button className="save-button" onClick={handleSave}>Save</button>
                                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="placeholder">Placeholder for generated image</div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateMemory;


// import {useState, useEffect} from 'react'
// import api from '../api'
// import Entry from '../components/Entry'
// import "../styles/CreateMemory.css"

// function CreateMemory() {
//     const [entry, setEntries] = useState([])
//     const [content, setContent] = useState("")

//     useEffect(() => {
//         getEntries()
//     }, [])
//     const getEntries = () => {
//         api
//             .get('/api/entries/')
//             .then((res) => res.data)
//             .then((data) => {
//                 setEntries(data); console.log(data);
//             })
//             .catch((err) => alert(err));
//     };

//     const deleteEntry = (id) => {
//         api
//             .delete(`/api/entries/delete/${id}/`)
//             .then((res) => {
//                 if (res.status === 204) alert("Entry deleted")
//                 else alert("Failed to delete entry")
//                 getEntries()
//             }).catch((err) => alert(err));
            
//     }

//     const createEntry = (e) => {
//         e.preventDefault()
//         api
//             .post('/api/entries/', {content})
//             .then((res) => {
//                 if (res.status === 201) alert("Entry created")
//                 else alert("Failed to create entry")
//                 getEntries()
//             }).catch((err) => alert(err));
            
//     }
//     return (
//       <div>
//         <div>
//             <h2>Entries</h2>
//             {entry.map((entry) => <Entry entry={entry} onDelete={deleteEntry} key={entry.id}/>)}
//         </div>
//         <h2>Create entry</h2>
//         <form onSubmit={createEntry}>
//             <label htmlFor='content'>Content</label>
//             <br></br>
//             <textarea
//                 id="content"
//                 name="content"
//                 required
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder="I'm thinking about..."
//             ></textarea>
//             <button className="submit-button" type="submit" value="submit">Create</button>
//         </form>
//       </div>
//     );
//   }
//   export default CreateMemory;
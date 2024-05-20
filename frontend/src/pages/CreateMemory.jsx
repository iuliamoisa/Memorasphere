import React, { useState } from 'react';
import "../styles/CreateMemory.css";
import LoadingIndicator from '../components/LoadingIndicator';
import api from '../api';
import axios from "axios";



function CreateMemory() {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [summary, setSummary] = useState("");

    const handleGenerate = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://127.0.0.1:8000/api/sumarizare/", {
                text: content
            });
            console.log("Răspuns de la backend:", response); 
            console.log("Sumarizare primită:", response.data.text); 
    
            setSummary(response.data.text); 
            // pauza 10 seunde
            //await new Promise(resolve => setTimeout(resolve, 20000));
            //handleImageDisplay();
            setImageLoading(true); // Start image loading
            await pollForImage();
        } catch (error) {
            console.error("Error generating summary:", error);
        } finally {
            setLoading(false);
        }
    };

    const pollForImage = async () => {
        const maxAttempts = 20; // Numărul maxim de încercări
        const interval = 10000; // Intervalul de timp între încercări (10 secunde)
        let attempts = 0;

        setImageLoading(true);
    
        while (attempts < maxAttempts) {
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/download_image/", {}, {
                    responseType: 'blob'
                });
    
                if (response.status === 200) {
                    console.log("Imaginea a fost găsită");
                    const url = URL.createObjectURL(response.data);
                    setGeneratedImage(url);
                    setImageLoading(false);
                    return; // Ieșim din funcție dacă imaginea este găsită
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.log("Imaginea nu a fost găsită, mai încercăm...");
                } else {
                    console.error("Error downloading image:", error);
                    setImageLoading(false);
                    return;
                }
            }
    
            // Așteaptă intervalul specificat înainte de următoarea încercare
            await new Promise(resolve => setTimeout(resolve, interval));
            attempts++;
        }
    
        console.error("Imaginea nu a fost găsită după mai multe încercări");
        setImageLoading(false);
    };
    
    const handleImageDisplay = async () => {
        try {
            setLoading(true);

            const response = await axios.post("http://127.0.0.1:8000/api/download_image/", {}, {
                responseType: 'blob'
            });
            console.log("Răspuns de la backend:", response);

            if (response.status === 200) {
                const url = URL.createObjectURL(response.data);
                setGeneratedImage(url);
            } else {
                console.error("Error: Response status is not 200");
            }
        } catch (error) {
            console.error("Error downloading image:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        // Implement save functionality
    };

    const handleCancel = () => {
        // Implement cancel functionality
        setGeneratedImage(null);
        setSummary(""); // Resetează sumarul la anulare
    };

    const createEntry = (e) => {
        e.preventDefault();
        axios.post('/api/entries/', { content })
            .then((res) => {
                if (res.status === 201) alert("Entry created");
                else alert("Failed to create entry");
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
                    <button className="generate-button" onClick={handleGenerate} disabled={loading}>
                        {loading ? 'Generating...' : 'Generate'}
                    </button>
                </div>
                <div className="right-panel">
                    {loading || imageLoading ? (
                        <LoadingIndicator />
                    ) : (
                        summary ? (
                            <div className="summary-container">
                                <span className="summary-text-area" role="textbox" >{summary}</span>
                                {/* <textarea
                                    className="summary-text-area"
                                    value={summary}
                                    readOnly
                                /> */}
                                {generatedImage && (
                                    <img
                                        className="generated-image"
                                        src={generatedImage}
                                        alt="Generated"
                                    />
                                )}
                                <div className="button-container">
                                    <button className="save-button" onClick={handleSave}>Save</button>
                                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="placeholder">Placeholder for summary</div>
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
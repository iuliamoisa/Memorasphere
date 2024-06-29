import React, { useState } from 'react';
import "../styles/CreateMemory.css";
import LoadingIndicator from '../components/LoadingIndicator';
import api from '../api';
import axios from "axios";
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';

function CreateMemory() {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [summary, setSummary] = useState("");
    const navigate = useNavigate();
    
    const handleGenerate = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://127.0.0.1:8000/api/sumarizare/", {
                text: content
            });
            console.log("Răspuns de la backend:", response); 
            console.log("Sumarizare primită:", response.data.text); 
    
            setSummary(response.data.text); 
            setImageLoading(true); 
            await pollForImage();
        } catch (error) {
            console.error("Error generating summary:", error);
        } finally {
            setLoading(false);
        }
    };

    const pollForImage = async () => {
        const maxAttempts = 20; 
        const interval = 10000; 
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
                    return; 
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
            await new Promise(resolve => setTimeout(resolve, interval));
            attempts++;
        }
    
        console.error("Imaginea nu a fost găsită după mai multe încercări");
        setImageLoading(false);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            let imageDataUrl = "";

            if (generatedImage) {
                const response = await fetch(generatedImage);
                const blob = await response.blob();
                const reader = new FileReader();

                reader.onloadend = () => {
                    imageDataUrl = reader.result;
                    saveEntry(summary, imageDataUrl);
                };
                reader.readAsDataURL(blob);
            } else {
                saveEntry(summary, imageDataUrl);
            }
        } catch (error) {
            console.error("Error saving entry:", error);
        } finally {
            setLoading(false);
        }
    };
    const saveEntry = (summary, imageDataUrl) => {
        const payload = {
            content: summary,
            image: imageDataUrl 
        };
    
        console.log("Payload being sent to the server:", payload);
    
        api.post('/api/entries/', payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.status === 201) {
                alert("Entry created");
                navigate('/memories');
            } else {
                alert("Failed to create entry");
            }
        })
        .catch((err) => {
            if (err.response) {
                console.error("Error in API request:", err.response.data);
                alert(`Failed to create entry: ${err.response.data.detail}`);
            } else {
                console.error("Error in API request:", err.message);
                alert("Failed to create entry: An unknown error occurred");
            }
        });
    };

    const handleCancel = () => {
        setGeneratedImage(null);
        setSummary(""); // 
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
            <BackButton></BackButton>
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
                            <div className="placeholder"></div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateMemory;
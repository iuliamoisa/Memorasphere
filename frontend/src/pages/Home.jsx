import React from "react";
import "../styles/Home.css"
import { useNavigate } from "react-router-dom";


function Home() {
  let navigate = useNavigate(); 
  const seeMemories = () =>{ 
    let path = `/memories`; 
    navigate(path);
  }
  return (
    <div className="main-home">
      <h1 className="home-title">Where Words Paint Pictures</h1>
      <h3 className="home-subtitle">Your Digital Diary 
awaits.</h3>
      <div className="home-buttons">
        <button onClick={seeMemories} className="home-button">Start here</button>
        <button onClick={() => console.log("Button 2 clicked")} className="home-button">Learn More</button>
      </div>
    </div>
  );
}

export default Home;

import React, { useState } from "react";
import BackButton from '../components/BackButton';
import "../styles/Learn.css"

function Learn() {
  
  return (
    <div className="learn-page">
        <BackButton></BackButton>
        <div className="learn-page-content">
            <h1 className="learn-page-title">About Memorasphere</h1>
            <div className="learn-page-text"> 
            <span>Memorsphere is for those who believe in the power of stories, the magic of technology, and the art of preserving memories. This is a sanctuary where your thoughts find voice, your memories come to life, and your imagination knows no bounds.

</span> <br></br><br></br>
<span>With Memorasphere, your diary becomes more than just a collection of words. It becomes a visual journey through your life, filled with moments and memories that you can revisit anytime you want. Start your journey with Memorasphere today and see your stories come to life.</span>
            </div>
            
        </div>
    </div>
  );
}

export default Learn;
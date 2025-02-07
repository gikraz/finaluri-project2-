import React, { useState } from 'react';
import sitelogo from './assets/sitelogo.png';
import moon from './assets/moon.png';
import './App.css';  

export default function Header() {
  const [toggled, setToggled] = useState(false);
  const [show, setShow] = useState(false);

  const changeFont = (font) => {
    document.body.style.fontFamily = font;
  };

  const changeTheme = () => {
    document.documentElement.classList.toggle('dark');  
  };

  return (
    <header>
      <h1>
        <img src={sitelogo} alt="Site Logo" className="sitelogo" />
      </h1>

      <div className="buttons-container button-text">
        <a href="https://github.com/gikraz/finaluri1">finaluri project 1</a>
        <button className='button-text' onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button>
        <button
          className={`darklight ${toggled ? 'toggled' : ''}`}
          onClick={() => {
            setToggled(!toggled); 
            changeTheme();        
          }}
          >
          <div className="thumb"></div>
        </button>
        <img src={moon} alt="Moon" />
        {show && (
          <div className="fontBox">
            <button className='button-text' onClick={() => changeFont('monospace')}>Monospace</button>
            <button className='button-text' onClick={() => changeFont('cursive')}>Cursive</button>
            <button className='button-text' onClick={() => changeFont('fantasy')}>Fantasy</button>
          </div>
        )}
      </div>
    </header>
  );
}

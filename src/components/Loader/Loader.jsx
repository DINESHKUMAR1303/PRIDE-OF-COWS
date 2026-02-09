
import React from 'react';
import './Loader.css';

const Loader = ({ text }) => {
    return (
        <div className="loader-container">
            <div className="spinner"></div>
            {text && <p className="loader-text">{text}</p>}
        </div>
    );
};

export default Loader;

import React, { useEffect, useState } from 'react';
import './AddedToBagPopup.css';

// Default truck icon if none provided
import defaultTruck from '../../pages/Milk/ProductDetail/images/delivery_vehicle.png';

const AddedToBagPopup = ({ isVisible, onClose }) => {
    const [render, setRender] = useState(isVisible);

    useEffect(() => {
        if (isVisible) setRender(true);
    }, [isVisible]);

    const handleAnimationEnd = () => {
        if (!isVisible) setRender(false);
        if (!isVisible && onClose) onClose();
    };

    if (!render) return null;

    return (
        <div
            className={`added-bag-popup ${isVisible ? 'visible' : ''}`}
            onTransitionEnd={handleAnimationEnd}
        >
            <div className="popup-arrow"></div>
            <div className="icon-box">
                <img src={defaultTruck} alt="success" />
            </div>
            <div className="text-content">
                <p className="title">ADDED TO BAG</p>
                <p className="subtitle">Item successfully added</p>
            </div>
        </div>
    );
};

export default AddedToBagPopup;

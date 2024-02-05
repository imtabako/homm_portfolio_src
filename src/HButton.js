import React, { useState } from 'react';

const HButton = ({ id, x, y, width, height, image, callback, isAnimated, isActive }) => {
    const [clickSound] = useState(new Audio('assets/click.mp3'));
    
    const [isMouseDown, setIsMouseDown] = useState(false);

    const playClickSound = () => {
      clickSound.currentTime = 0;
      clickSound.play();
    };

    const handleMouseDown = () => {
        setIsMouseDown(true);
        // Play the sound here
        // You can use the Audio API or another library to handle sound playback
        // For simplicity, we'll just log a message for now
        console.log('Sound played!');
        clickSound.currentTime = 0;
        clickSound.play();
    };

    const handleMouseUp = () => {
        if (isMouseDown) {
            setIsMouseDown(false);
            callback(id); // Call the provided callback
        }
    };

    const handleMouseLeave = () => {
        setIsMouseDown(false);
    };

    // Prevent the default drag-and-drop behavior
    const handleDragStart = (event) => {
      event.preventDefault();
    };

    const wrapperStyle = {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: 'black',
    };

    const buttonStyle = {
        width: '100%',
        height: '100%',
        userSelect: 'none',
        transform: isAnimated && isMouseDown ? 'scale(0.97)' : 'scale(1)',
        filter: isAnimated && isMouseDown ? 'brightness(0.8)' : 'brightness(1)',
        border: `1px solid ${isActive ? '#dece8c' : '#000'}`, // Set border color based on active state
        transformOrigin: 'bottom right',
    };

    return (
        <div style={wrapperStyle}>
            <div
                style={buttonStyle}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave} // Ensure the button returns to full size if mouse leaves while down
            >
                <img 
                    src={image} 
                    alt="hero" 
                    style={{ width: '100%', height: '100%', draggable: 'false' }}
                    onDragStart={handleDragStart}
                />
            </div>
        </div>
    );
};

export default HButton;

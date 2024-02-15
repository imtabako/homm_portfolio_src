import React, { useEffect, useRef, useState } from 'react';
import './HButton.css';

const HButton = ({ id, x, y, width, height, image, callback, isAnimated, isActive, shortcutKey }) => {
    const [clickSound] = useState(new Audio('assets/click.mp3'));

    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleMouseDown = () => {
        setIsMouseDown(true);
        clickSound.currentTime = 0;
        clickSound.play();
    };

    const handleMouseUp = () => {
        if (isMouseDown) {
            setIsMouseDown(false);
            if (typeof callback === 'function') {
                callback(id); // Call the provided callback
            }
        }
    };

    const handleMouseLeave = () => {
        setIsMouseDown(false);
    };

    // Prevent the default drag-and-drop behavior
    const handleDragStart = (event) => {
        event.preventDefault();
    };

    // Shortcut key
    // const handleKeyDown = (e) => {
    //     console.log({a: e.key.toLowerCase(), b:shortcutKey.toLowerCase() });
    //     if (e.key.toLowerCase() === shortcutKey.toLowerCase()) {
    //         console.log('got here');
    //         buttonRef.current.dispatchEvent(new Event('click'));
    //     }
    // };
    //
    // useEffect(() => {
    //     if (shortcutKey) {
    //         document.addEventListener('keydown', handleKeyDown);
    //     }

    //     return () => {
    //         document.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, [handleKeyDown]);

    const isPositionAbsolute = typeof x !== 'undefined' && typeof y !== 'undefined';

    const wrapperStyle = isPositionAbsolute? {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: 'black',
    } : {
        position: 'relative',
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
        border: `1px solid ${isActive ? '#dece8c' : '#000'}`,
        transformOrigin: 'bottom right',
    };

    return (
        <div className='h-button' style={wrapperStyle}>
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

import React, { useState } from 'react';

const Minimap = ({ onDrag, offset, scaleX, scaleY }) => {
    const offsetX = -offset.x;
    const offsetY = -offset.y;

    const minimapContainerStyle = {
        position: 'absolute',
        top: '26px',
        left: '630px',
        width: '144px',
        height: '144px',
        overflow: 'hidden',
    };
    const viewportStyle = {
        position: 'absolute',
        width: '38px',
        height: '34px',
        border: '2px dashed #FF4B7D',
        top: `${offsetY / scaleY - 20}px`,
        left: `${offsetX / scaleX - 17}px`,
    };

    const [dragging, setDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleMouseMove = (e) => {
        if (dragging) {
            const offsetX = e.clientX - dragStart.x;
            const offsetY = e.clientY - dragStart.y;
            console.log('jopa');
            onDrag(offsetX, offsetY);
            setDragStart({ x: e.clientX, y: e.clientY });

            console.log({offsetX, offsetY});
        }
    };

    const handleMouseLeave = () => {
        setDragging(false);
    };

    const handleDragStart = (e) => {
      e.preventDefault();
    };

    return (
        <div
            style={minimapContainerStyle}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            // onMouseLeave={handleMouseLeave}
        >
            <img 
                src="assets/minimap.png" 
                alt="Minimap" 
                style={{ width: '100%', height: '100%', userSelect: 'none' }} 
                onDragStart={handleDragStart}/>
            <div style={viewportStyle} onDragStart={handleDragStart}></div>
        </div>
    );
};

export default Minimap;

import React, { useState } from 'react';
import './Advmap.css'

const OBJ_SIZE = 32;

// Ranges of objects
const ranges = [
  { x1: 171, x2: 171 + OBJ_SIZE, y1: 60, y2: 60 + OBJ_SIZE },
];

const Advmap = ({ offset, appOffset, scaleX, scaleY }) => {
  const imageStyle = {
    position: 'relative',
    left: `${offset.x}px`,
    top: `${offset.y}px`,
  };

  // Logic for clicking different objects on Adventure Map
  const [isInRange, setIsInRange] = useState(new Array(ranges.length).fill(false));

  const handleMouseMove = (e) => {
    const relativeX = Math.floor((e.clientX - appOffset.x) / scaleX) - offset.x;
    const relativeY = Math.floor((e.clientY - appOffset.y) / scaleY) - offset.y;

    const updatedIsInRange = ranges.map((range) =>
      relativeX >= range.x1 && relativeX <= range.x2 && relativeY >= range.y1 && relativeY <= range.y2
    );

    setIsInRange(updatedIsInRange);
  };

  const getMapClassName = () => {
    let className = 'advmap functional ';
    if (isInRange.some((inRange) => inRange)) {
      className += 'in-range';
    }
    return className;
  };

  return (
    <div 
      className={getMapClassName()}
      onMouseMove={handleMouseMove} 
    >
      <img
        src="assets/advmap.webp"
        alt="Adventure Map"
        style={imageStyle}
      />
      <div className="advmap-lu"></div>
      <div className="advmap-ru"></div>
      <div className="advmap-ld"></div>
      <div className="advmap-rd"></div>
      <div className="advmap-u"></div>
      <div className="advmap-l"></div>
      <div className="advmap-r"></div>
      <div className="advmap-d"></div>
    </div>
  );
};

export default Advmap;

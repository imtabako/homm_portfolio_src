import React, { useState } from 'react';
import './Advmap.css'

const OBJ_SIZE = 32;

// Ranges of objects
const ranges = [
  { x1: 1274, x2: 1274 + OBJ_SIZE, y1: 2176, y2: 2176 + OBJ_SIZE, cursorClass: 'in-range-hero' }, // hero (me)
  { x1: 1306, x2: 1306 + 4*OBJ_SIZE, y1: 2080, y2: 2080 + 2*OBJ_SIZE, cursorClass: 'in-range-town' }, // town (main)
  { x1: 1370, x2: 1370 + OBJ_SIZE, y1: 2144, y2: 2144 + OBJ_SIZE, cursorClass: 'in-range-town' }, // town (gates)
];

const Advmap = ({ offset, appOffset, scaleX, scaleY, onClickHero, onClickTown }) => {
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

  const handleMouseDown = (e) => {
    if (e.button !== 0) {
      return;
    }
    const ind = isInRange.findIndex((inRange) => inRange);
    switch (ind) {
      case 0:
        onClickHero();
        break;
      case 1:
      case 2:
        onClickTown();
        break
      default:
        break;
    }
  };

  const getMapClassName = () => {
    let className = 'advmap functional ';
    const ind = isInRange.findIndex((inRange) => inRange);
    if (ind >= 0) {
      className += ranges[ind].cursorClass;
    }
    return className;
  };

  return (
    <div 
      className={getMapClassName()}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
    >
      <img
        src="assets/TheMap.png"
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

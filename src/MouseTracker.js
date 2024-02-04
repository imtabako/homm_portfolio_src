import React from 'react';

const MouseTracker = ({ offset }) => {
  const handleClick = (e) => {
    const relativeX = offset.x;
    const relativeY = offset.y;

    console.log({x: e.clientX, y: e.clientY});
    console.log(offset);

    // Additional logic based on the position range [20x40, 100,120]
    if (relativeX >= 20 && relativeX <= 40 && relativeY >= 100 && relativeY <= 120) {
      // Additional logic here...
      console.log('Inside the specified range');
    }
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
      <div onClick={handleClick} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default MouseTracker;

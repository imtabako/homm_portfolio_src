import React from 'react';
import './Advmap.css'

const Advmap = ({ offset }) => {
    const imageStyle = {
        position: 'relative',
        left: `${offset.x}px`,
        top: `${offset.y}px`,
    };
  
//   <div style={{ width: '600px', height: '500px', overflow: 'hidden' }}>
//   <img src="your-image-source.jpg" alt="Map" style={imageStyle} />
// </div>

  return (
    <div className="advmap functional">
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

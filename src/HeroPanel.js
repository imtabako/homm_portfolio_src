import React, { useState } from 'react';
import './HeroPanel.css'
import HButton from './HButton';

const HeroPanel = ({onHeroLeave}) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleRMouseDown = (e) => {
    if (e.button === 2) {
      // Right mouse button clicked
      console.log('hold');
      setShowDescription(true);
    }
  };

  const handleRMouseUp = () => {
    if (showDescription) {
        console.log('release');
        setShowDescription(false);
    }
  };

  const preventRClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="panel-wrapper" onMouseUp={handleRMouseUp}>
        <div className="hero-panel panel" >
            <div className="hero-avatar" onContextMenu={preventRClick} onMouseDown={handleRMouseDown}></div>
            <HButton id={13} x={610} y={515} width={52} height={36} image={'assets/okButton.png'} callback={onHeroLeave} isAnimated={true}/>
            {showDescription && <div className="hero-description panel"></div>}
        </div>
    </div>
  );
};

export default HeroPanel;

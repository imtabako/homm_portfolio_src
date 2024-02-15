import React, { useState } from 'react';
import './HeroPanel.css'
import HButton from './HButton';
import DialogueWindow from './DialogueWindow';

const HeroPanel = ({onHeroLeave}) => {
  const [showDescription, setShowDescription] = useState(false);

  const [isFiring, setIsFiring] = useState(false);
  const dContent = "Вы уверены, что желаете уволить этого героя?";

  const [isFiredOk, setIsFiredOk] = useState(false);
  const dCannotDelete = "Вы безуспешно пытаетесь уволить Юрия Пешкина, так как не можете найти ни одной причины для увольнения столь ценного разработчика.";

  const handleRMouseDown = (e) => {
    if (e.button === 2 || e.button === 0) {
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

  const fireHero = () => {
    console.log('fired');
    setIsFiring(true);
  };

  const showTask = () => {
    console.log('task');
  };

  return (
    <div className="panel-wrapper" onMouseUp={handleRMouseUp}>
        <div className="hero-panel panel" >
            <div className="hero-avatar" onContextMenu={preventRClick} onMouseDown={handleRMouseDown}></div>
            <HButton id={11} x={610} y={515} width={52} height={36} image={'assets/okButton.png'} callback={onHeroLeave} isAnimated={true} shortcutKey={'Enter'} />
            <HButton id={12} x={454} y={429} width={52} height={36} image={'assets/fireButton.png'} callback={fireHero} isAnimated={true} shortcutKey={'f'} />
            <HButton id={13} x={315} y={429} width={52} height={36} image={'assets/taskButton.png'} callback={showTask} isAnimated={true} shortcutKey={'t'} />
            {showDescription && <div className="hero-description panel"></div>}
            {isFiring && <DialogueWindow 
              content={dContent} 
              width={320}
              type={2}
              onOk={() => {setIsFiring(false); setIsFiredOk(true)}} 
              onCancel={() => setIsFiring(false)} 
            />}
            {isFiredOk && <DialogueWindow 
              content={dCannotDelete} 
              width={320}
              type={1}
              onOk={() => setIsFiredOk(false)}
            />}
        </div>
    </div>
  );
};

export default HeroPanel;

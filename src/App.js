import { useCallback, useEffect, useRef, useState } from "react";
import MouseTracker from './MouseTracker.js';
import Advmap from "./Advmap.js";
import RightPanel from "./RightPanel.js";
import './App.css';


// Translation values to translate map A px each B ms
const DELTA_TIME = 80; // ms
const DELTA_AMAP = 40;  // px
// Advmap dimensions
const MAX_X = 1920; // px
const MAX_Y = 1080; // px
const WIDTH = 607;  // px
const HEIGHT = 556; // px

const App = () => {
  // State for scaling HoMM UI to full screen
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  // State for UI offset if not fits whole screen
  const [appOffset, setAppOffset] = useState({ x: 0, y: 0 });
  const appRef = useRef(null);

  // State for moving adventure map via mouse approaching borders
  const [translationOffset, setTranslationOffset] = useState({ x: 0, y: 0 });
  // State to translate map with some period of time
  const intervalRef = useRef(null);

  // Resize to fit whole screen
  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const layoutWidth = 800;
      const layoutHeight = 600;

      const _scaleX = viewportWidth / layoutWidth;
      const _scaleY = viewportHeight / layoutHeight;

      const newScale = Math.min(_scaleX, _scaleY);

      const newHeight = layoutHeight * newScale;
      const newWidth = newHeight * 16 / 9;

      const newScaleX = newWidth / layoutWidth;
      const newScaleY = newHeight / layoutHeight;

      setScaleX(newScaleX);
      setScaleY(newScaleY);
      
      setTimeout(() => {
        if (appRef.current) {
          const layoutRect = appRef.current.getBoundingClientRect();
          setAppOffset({ x: Math.floor(layoutRect.left), y: Math.floor(layoutRect.top) });
        }
      }, 50);
    };
    
    // Initial calculation on component mount
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Logic for moving adventure map via mouse approaching borders
  const updateTranslationOffset = (callback) => {
    setTranslationOffset((prevOffset) => {
      const updatedX = Math.min(callback(prevOffset).x, 0);
      const updatedY = Math.min(callback(prevOffset).y, 0);
  
      const cappedX = Math.max(updatedX, -MAX_X + WIDTH);
      const cappedY = Math.max(updatedY, -MAX_Y + HEIGHT);

      return { x: cappedX, y: cappedY };
    });
  }

  const handleMouseEnterBorder = (direction) => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      switch (direction) {
        case 'u':
          updateTranslationOffset((prevOffset) => ({ ...prevOffset, y: prevOffset.y + DELTA_AMAP }));
          break;
        case 'b':
          updateTranslationOffset((prevOffset) => ({ ...prevOffset, y: prevOffset.y - DELTA_AMAP }));
          break;
        case 'l':
          updateTranslationOffset((prevOffset) => ({ ...prevOffset, x: prevOffset.x + DELTA_AMAP }));
          break;
        case 'r':
          updateTranslationOffset((prevOffset) => ({ ...prevOffset, x: prevOffset.x - DELTA_AMAP }));
          break;
        case 'ul':
          updateTranslationOffset((prevOffset) => ({ ...prevOffset, x: prevOffset.x + DELTA_AMAP, y: prevOffset.y + DELTA_AMAP }));
          break;
        case 'bl':
          updateTranslationOffset((prevOffset) => ({ ...prevOffset, x: prevOffset.x + DELTA_AMAP, y: prevOffset.y - DELTA_AMAP }));
          break;
        case 'br':
          updateTranslationOffset((prevOffset) => ({ ...prevOffset, x: prevOffset.x - DELTA_AMAP, y: prevOffset.y - DELTA_AMAP }));
          break;
        case 'ur':
          updateTranslationOffset((prevOffset) => ({ ...prevOffset, x: prevOffset.x - DELTA_AMAP, y: prevOffset.y + DELTA_AMAP }));
          break;
        default:
          break;
      }
    }, DELTA_TIME)
  };

  const handleMouseLeaveBorder = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div className="wrapper">
      <div 
        ref={appRef}
        className="App"
        style={{ transform: `scale(${scaleX}, ${scaleY})` }}
      >
        <Advmap offset={translationOffset} appOffset={appOffset} scaleX={scaleX} scaleY={scaleY} />
        {/* space below adventure map */}
        <div className="advmap-bottom">
          <div className="advmap-bottom-l"></div>
          <div className="advmap-bottom-r"></div>
          <div className="advmap-bottom-m"></div>
          <div className="advmap-statusbar functional"></div>
          <div className="advmap-aresmap"></div>
        </div>
        {/* right panel */}
        <RightPanel />
        <div className="panel-right-date">
          <div className="panel-right-date-inner functional"></div>
          <div className="panel-right-date-border"></div>
        </div>
        {/* borders */}
        <div 
          className="border b-u" 
          onMouseEnter={() => handleMouseEnterBorder('u')} 
          onMouseLeave={handleMouseLeaveBorder}
        ></div>
        <div 
          className="border b-ul" 
          onMouseEnter={() => handleMouseEnterBorder('ul')} 
          onMouseLeave={handleMouseLeaveBorder}
        ></div>
        <div 
          className="border b-l" 
          onMouseEnter={() => handleMouseEnterBorder('l')} 
          onMouseLeave={handleMouseLeaveBorder}
        ></div>
        <div 
          className="border b-bl" 
          onMouseEnter={() => handleMouseEnterBorder('bl')} 
          onMouseLeave={handleMouseLeaveBorder}
        ></div>
        <div 
          className="border b-b" 
          onMouseEnter={() => handleMouseEnterBorder('b')} 
          onMouseLeave={handleMouseLeaveBorder}
        ></div>
        <div 
          className="border b-br" 
          onMouseEnter={() => handleMouseEnterBorder('br')} 
          onMouseLeave={handleMouseLeaveBorder}
        ></div>
        <div 
          className="border b-r" 
          onMouseEnter={() => handleMouseEnterBorder('r')} 
          onMouseLeave={handleMouseLeaveBorder}
        ></div>
        <div 
          className="border b-ur" 
          onMouseEnter={() => handleMouseEnterBorder('ur')} 
          onMouseLeave={handleMouseLeaveBorder}
        ></div>
      </div>
    </div>
  );
}

export default App;

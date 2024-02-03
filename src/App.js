import { useEffect, useRef, useState } from "react";
import MouseTracker from './MouseTracker.js';
import Advmap from "./Advmap.js";
import './App.css';

const App = () => {
  const DELTA_TIME = 80; // ms
  const DELTA_AMAP = 40;  // px

  const MAX_X = 1920; // px
  const MAX_Y = 1080; // px

  const WIDTH = 607;  // px
  const HEIGHT = 556; // px

  // State for scaling HoMM UI to full screen
  const [scale, setScale] = useState(1);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  const advmapRef = useRef(null);
  const imageAdvmapRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Border refs
  const borderURef  = useRef(null);
  const borderULRef = useRef(null);
  const borderLRef  = useRef(null);
  const borderBLRef = useRef(null);
  const borderBRef  = useRef(null);
  const borderBRRef = useRef(null);
  const borderRRef  = useRef(null);
  const borderURRef = useRef(null);

  // State to translate map with some period of time
  const intervalRef = useRef(null);
  
  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const a169 = 16 / 9;
      const a43 = 4 / 3;

      const layoutWidth = 800;
      const layoutHeight = 600;

      const _scaleX = viewportWidth / layoutWidth;
      const _scaleY = viewportHeight / layoutHeight;

      const newScale = Math.min(_scaleX, _scaleY);

      const newHeight = layoutHeight * newScale;
      const newWidth = newHeight * 16 / 9;

      const newScaleX = newWidth / layoutWidth;
      const newScaleY = newHeight / layoutHeight;

      // setScale(newScale);
      setScaleX(newScaleX);
      setScaleY(newScaleY);
    };

    // Initial calculation on component mount
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseClick = (position) => {
    console.log(position);
    console.log(translationOffset);
  }

  // Logic for moving adventure map via mouse approaching borders
  const [translationOffset, setTranslationOffset] = useState({ x: 0, y: 0 });

  const updateTranslationOffset = (callback) => {
    setTranslationOffset((prevOffset) => {
      const updatedX = Math.min(callback(prevOffset).x, 0);
      const updatedY = Math.min(callback(prevOffset).y, 0);
  
      const cappedX = Math.max(updatedX, -MAX_X + WIDTH);
      const cappedY = Math.max(updatedY, -MAX_Y + HEIGHT);

      return { x: cappedX, y: cappedY };
    });
  }

  const handleMouseEnter = (direction) => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      console.log(direction);
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

  const handleMouseLeave = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div className="wrapper">
      <div 
        ref={advmapRef} 
        className="App"
        style={{ transform: `scale(${scaleX}, ${scaleY})` }}
      >
        <MouseTracker onClick={handleMouseClick}/>
        {/* <div className="advmap functional">
          <img
            ref={imageAdvmapRef}
            src="assets/advmap.webp"
            alt="Adventure Map"
            style={{ transform: `translate(${translationOffset.x}px, ${translationOffset.y}px)` }}
          />
          <div className="advmap-lu"></div>
          <div className="advmap-ru"></div>
          <div className="advmap-ld"></div>
          <div className="advmap-rd"></div>
          <div className="advmap-u"></div>
          <div className="advmap-l"></div>
          <div className="advmap-r"></div>
          <div className="advmap-d"></div>
        </div> */}
        <Advmap offset={translationOffset} />
        <div className="advmap-bottom">
          <div className="advmap-bottom-l"></div>
          <div className="advmap-bottom-r"></div>
          <div className="advmap-bottom-m"></div>
          <div className="advmap-statusbar  functional"></div>
          <div className="advmap-aresmap"></div>
        </div>
        <div className="panel-right"></div>
        <div className="panel-right-date">
          <div className="panel-right-date-inner functional"></div>
          <div className="panel-right-date-border"></div>
        </div>
        {/* borders */}
        <div 
          className="border b-u" 
          ref={borderURef} 
          onMouseEnter={() => handleMouseEnter('u')} 
          onMouseLeave={handleMouseLeave}
        ></div>
        <div 
          className="border b-ul" 
          ref={borderULRef} 
          onMouseEnter={() => handleMouseEnter('ul')} 
          onMouseLeave={handleMouseLeave}
        ></div>
        <div 
          className="border b-l" 
          ref={borderLRef} 
          onMouseEnter={() => handleMouseEnter('l')} 
          onMouseLeave={handleMouseLeave}
        ></div>
        <div 
          className="border b-bl" 
          ref={borderBLRef} 
          onMouseEnter={() => handleMouseEnter('bl')} 
          onMouseLeave={handleMouseLeave}
        ></div>
        <div 
          className="border b-b" 
          ref={borderBRef} 
          onMouseEnter={() => handleMouseEnter('b')} 
          onMouseLeave={handleMouseLeave}
        ></div>
        <div 
          className="border b-br" 
          ref={borderBRRef} 
          onMouseEnter={() => handleMouseEnter('br')} 
          onMouseLeave={handleMouseLeave}
        ></div>
        <div 
          className="border b-r" 
          ref={borderRRef} 
          onMouseEnter={() => handleMouseEnter('r')} 
          onMouseLeave={handleMouseLeave}
        ></div>
        <div 
          className="border b-ur" 
          ref={borderURRef} 
          onMouseEnter={() => handleMouseEnter('ur')} 
          onMouseLeave={handleMouseLeave}
        ></div>
        {/* end borders */}
      </div>
    </div>
  );
}

export default App;

import { useEffect, useRef, useState } from "react";
import Advmap from "./Advmap.js";
import RightPanel from "./RightPanel.js";
import './App.css';
import DateDisplay from "./DateDisplay.js";
import Minimap from "./Minimap.js";
import HeroPanel from "./HeroPanel.js";
import EventWindowHero from "./EventWindowHero.js";
import EventWindowTown from "./EventWindowTown.js";


// Translation values to translate map A px each B ms
const DELTA_TIME = 80; // ms
const DELTA_AMAP = 40;  // px
// Advmap dimensions, 2864x2752 pixels; UI dimensions
const MAX_X = 2864; // px
const MAX_Y = 2752; // px
const WIDTH = 607;  // px
const HEIGHT = 556; // px

const BORDER_W = 280;
const BORDER_H = 280;

const HERO_X = 1274 - BORDER_W;
const HERO_Y = 2176 - BORDER_H;
const HERO_T_X = -970; // 1320 640
const HERO_T_Y = -1920;
const HERO_OFFSET_X = WIDTH / 2;
const HERO_OFFSET_Y = HEIGHT / 2;

const TOWN_X = 1384 - BORDER_W;
const TOWN_Y = 2136 - BORDER_H;
const TOWN_T_X = -970;
const TOWN_T_Y = -1920;
const TOWN_OFFSET_X = WIDTH / 2;
const TOWN_OFFSET_Y = HEIGHT / 2;

const App = () => {
  const [isAmbient, setIsAmbient] = useState(false);
  const [ambientSound] = useState(new Audio('assets/GRASS.MP3'));

  // Play ambient sound on component mount
  useEffect(() => {
    ambientSound.loop = true;
    // ambientSound.play();
    return () => {
      ambientSound.pause();
      ambientSound.currentTime = 0;
    };
  }, [ambientSound]);

  const playAmbientSound = (e) => {
    // Check if the user has interacted with the document
    if (!isAmbient) {
      setIsAmbient(true);
      ambientSound.play();
    }
  };

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

  // States for Hero/Town panels
  const [heroClickCount, setHeroClickCount] = useState(0);
  const [townClickCount, setTownClickCount] = useState(0);

  const handleHeroButtonClick = () => {
    console.log('show hero: ' + heroClickCount);
    setTownClickCount(0);

    if (heroClickCount == 1 && !(
        (-translationOffset.x >= HERO_X - HERO_OFFSET_X && -translationOffset.x <= HERO_X + HERO_OFFSET_X) && 
        (-translationOffset.y >= HERO_Y - HERO_OFFSET_Y && -translationOffset.y <= HERO_Y + HERO_OFFSET_Y))) {
      setTranslationOffset({ x: HERO_T_X, y: HERO_T_Y });
    } else {
      setHeroClickCount(heroClickCount + 1);
    }
  };

  const handleTownButtonClick = () => {
    console.log('show town: ' + townClickCount);
    setHeroClickCount(0);

    if (townClickCount == 1 && !(
        (-translationOffset.x >= TOWN_X - TOWN_OFFSET_X && -translationOffset.x <= TOWN_X + TOWN_OFFSET_X) && 
        (-translationOffset.y >= TOWN_Y - TOWN_OFFSET_Y && -translationOffset.y <= TOWN_Y + TOWN_OFFSET_Y))) {
      setTranslationOffset({ x: TOWN_T_X, y: TOWN_T_Y });
    } else {
      setTownClickCount(townClickCount + 1);
    }
  };

  const closeHeroPanel = () => {
    setHeroClickCount(1);
  };

  const closeTownPanel = () => {
    setTownClickCount(1);
  };

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
    if (heroClickCount < 2) {
      setTranslationOffset((prevOffset) => {
        const updatedX = Math.min(callback(prevOffset).x, 0);
        const updatedY = Math.min(callback(prevOffset).y, 0);

        const cappedX = Math.max(updatedX, -MAX_X + WIDTH);
        const cappedY = Math.max(updatedY, -MAX_Y + HEIGHT);

        return { x: cappedX, y: cappedY };
      });
    }
  };

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

  // Logic for dragging screen across minimap
  const handleMinimapDrag = (dragX, dragY) => {
    if (heroClickCount < 2) {
      const newOffset = {
        x: translationOffset.x - dragX * 6.5,
        y: translationOffset.y - dragY * 8.5
      };

      const cappedX = Math.max(Math.min(newOffset.x, 0), -MAX_X + WIDTH);
      const cappedY = Math.max(Math.min(newOffset.y, 0), -MAX_Y + HEIGHT);

      setTranslationOffset({ x: cappedX, y: cappedY });
    }
  };

  // const dContent = "Когда дьяволы наводнили Эрафию, Игнатиус понял, что его единственный шанс на спасение состоит в том, чтобы примкнуть к ним. Ему удалось убедить их в своей преданности, но он трепещет при мысли, что когда-нибудь им больше не понадобятся услуги человека.";
  // const dContent = "Специальность Боеприколы.";

  return (
    <div className="wrapper" onClick={playAmbientSound}>
      <div
        ref={appRef}
        className="App"
        style={{ transform: `scale(${scaleX}, ${scaleY})` }}
      >
        <Advmap 
          offset={translationOffset} appOffset={appOffset} scaleX={scaleX} scaleY={scaleY} 
          onClickHero={handleHeroButtonClick}
          onClickTown={handleTownButtonClick}
        />
        {/* space below adventure map */}
        <div className="advmap-bottom">
          <div className="advmap-bottom-l"></div>
          <div className="advmap-bottom-r"></div>
          <div className="advmap-bottom-m"></div>
          <div className="advmap-statusbar functional"></div>
          <div className="advmap-aresmap"></div>
        </div>
        {/* right panel */}
        <RightPanel onHeroClick={handleHeroButtonClick} onTownClick={handleTownButtonClick} />
        <Minimap onDrag={handleMinimapDrag} offset={translationOffset} scaleX={MAX_X / 180} scaleY={MAX_Y / 180} />
        <div className="panel-right-date">
          <DateDisplay />
        </div>
        {/* Current Hero/Event window */}
        {heroClickCount >= 1 && <EventWindowHero />}
        {townClickCount >= 1 && <EventWindowTown />}
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
        {/* Hero panel */}
        {heroClickCount >= 2 && <HeroPanel onHeroLeave={closeHeroPanel}/>}
        {/* Delete Hero ? */}
        {/* <DialogueWindow content={dContent} width={320} height={192}/> */}
      </div>
    </div>
  );
}

export default App;

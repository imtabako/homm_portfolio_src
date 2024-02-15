import React, { useState } from 'react';
import HButton from "./HButton.js";
import './RightPanel.css';


// Hero avatar dimensions
const HERO_X = 14;
const HERO_Y = 212;
const HERO_WIDTH = 48;
const HERO_HEIGHT = 32;

// Town avatar dimensions
const TOWN_X = 144;
const TOWN_Y = 212;
const TOWN_WIDTH = 48;
const TOWN_HEIGHT = 32;

const RightPanel = ({ onHeroClick, onTownClick }) => {
    const [activeButtonId, setActiveButtonId] = useState(null);
  
    const handleClick = (id) => {
        console.log('jopa');
        setActiveButtonId(id);
    };

    const heroClick = (id) => {
        setActiveButtonId(id);
        onHeroClick();
    };

    const townClick = (id) => {
        setActiveButtonId(id);
        onTownClick();
    };

    const heroes = [
        { id: 0, x: HERO_X, y: HERO_Y + 0*HERO_HEIGHT, width: HERO_WIDTH, height: HERO_HEIGHT, image: 'assets/HeroSmall.bmp', callback: heroClick },
        // { id: 1, x: HERO_X, y: HERO_Y + 1*HERO_HEIGHT, width: HERO_WIDTH, height: HERO_HEIGHT, image: 'assets/Hero2.jpeg' },
        // { id: 2, x: HERO_X, y: HERO_Y + 2*HERO_HEIGHT, width: HERO_WIDTH, height: HERO_HEIGHT, image: 'assets/Hero3.jpeg' },
    ];

    const towns = [
        { id: 3, x: TOWN_X, y: TOWN_Y + 0*TOWN_HEIGHT, width: TOWN_WIDTH, height: TOWN_HEIGHT, image: 'assets/Town1.jpeg', callback: townClick },
        // { id: 4, x: TOWN_X, y: TOWN_Y + 1*TOWN_HEIGHT, width: TOWN_WIDTH, height: TOWN_HEIGHT, image: 'assets/Town1.jpeg' },
        // { id: 5, x: TOWN_X, y: TOWN_Y + 2*TOWN_HEIGHT, width: TOWN_WIDTH, height: TOWN_HEIGHT, image: 'assets/Town1.jpeg' },
    ];

    return (
        <div className="panel-right">
            {heroes.map(b =>
                <HButton
                    key={b.id}
                    id={b.id}
                    x={b.x}
                    y={b.y}
                    width={b.width}
                    height={b.height}
                    image={b.image}
                    callback={b.callback || handleClick}
                    isActive={b.id === activeButtonId}
                />
            )}
            {towns.map(b =>
                <HButton
                    key={b.id}
                    id={b.id}
                    x={b.x}
                    y={b.y}
                    width={b.width}
                    height={b.height}
                    image={b.image}
                    callback={b.callback || handleClick}
                    isActive={b.id === activeButtonId}
                />
            )}
        </div>
    );
};

export default RightPanel;

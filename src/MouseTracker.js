import { useEffect } from "react";

const MouseTracker = ({ onClick }) => {
    useEffect(() => {
        const handleMouseClick = (e) => {
            onClick({ x: e.clientX, y: e.clientY });
        };

        document.addEventListener('click', handleMouseClick);
    
        return () => {
          document.removeEventListener('click', handleMouseClick);
        };
    }, [onClick]);

    return null;
};

export default MouseTracker;
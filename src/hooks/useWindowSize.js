import { useEffect, useState } from 'react'; 

const useWindowSize = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize)
    }, [])

    return {
        windowWidth,
    }
};

export default useWindowSize;
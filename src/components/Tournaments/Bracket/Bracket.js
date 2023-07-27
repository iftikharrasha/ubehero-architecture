import React, { useLayoutEffect, useRef, useState } from 'react';
import { SingleEliminationBracket, Match, SVGViewer, createTheme } from '@g-loot/react-tournament-brackets';
import useWindowSize from '../../../hooks/useWindowSize';
import { matchesOf_8P_7M_3R } from '../../../lib/Data/matches';
import { Empty } from 'antd';
import useBracket from '../../../hooks/useBracket';

const Bracket = () => {
    const { windowWidth } = useWindowSize();
    const { loading, bracketData } = useBracket();

    const [widthOfTheDiv, setWidthOfTheDiv] = useState(windowWidth);

    const divRef = useRef(null);
    useLayoutEffect(() => {
      function handleResize() {
        if (divRef.current) {
          const width = divRef.current.offsetWidth;
          setWidthOfTheDiv(width);
        }
      }
  
      // Call the handleResize function when the tab becomes active
      // You might use the corresponding Ant Design Tab event to trigger this
      handleResize();
  
      // Add event listener to handle window resize
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [windowWidth]);

    const WhiteTheme = createTheme({
        textColor: { main: '#000000', highlighted: '#ffffff', dark: '#707582' },
        matchBackground: { wonColor: '#22293b', lostColor: '#22293b' },
        score: {
          background: { wonColor: '#f030c0', lostColor: '#000000' },
          text: { highlightedWonColor: '#7BF59D', highlightedLostColor: '#ffffff' },
        },
        border: {
          color: '#000000',
          highlightedColor: '#f030c0',
        },
        roundHeader: { backgroundColor: '#f030c0', fontColor: '#ffffff' },
        connectorColor: '#707582',
        connectorColorHighlight: '#f030c0',
        svgBackground: '#141414',
    });

    return (
        <section className='bracket' style={{ display: widthOfTheDiv > 0 ? 'block' : 'none' }} ref={divRef}>
            {loading ? <div>Loading...</div> : (
            bracketData.length === 0 ? <Empty/> : 
            <SingleEliminationBracket
                className="singleElimination"
                matches={bracketData}
                matchComponent={Match}
                theme={WhiteTheme}
                options={{
                  style: {
                    roundHeader: {
                      backgroundColor: WhiteTheme.roundHeader.backgroundColor,
                      fontColor: WhiteTheme.roundHeader.fontColor,
                    },
                    connectorColor: WhiteTheme.connectorColor,
                    connectorColorHighlight: WhiteTheme.connectorColorHighlight,
                  },
                }}
                svgWrapper={({ children, ...props }) => (
                <SVGViewer 
                    width={widthOfTheDiv} 
                    height={600} 
                    background={WhiteTheme.svgBackground}
                    SVGBackground={WhiteTheme.svgBackground}
                    {...props}
                >
                    {children}
                </SVGViewer>
                )}
            />)}
        </section>
    );
};

export default Bracket;
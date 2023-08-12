import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { SingleEliminationBracket, Match, SVGViewer, createTheme } from '@g-loot/react-tournament-brackets';
import useWindowSize from '../../../hooks/useWindowSize';
import { Button, Card, Col, Empty, Row, Tag, Typography } from 'antd';
import moment from 'moment';
// import { newARound } from '../../../lib/Data/matches';
// import useBracket from '../../../hooks/useBracket';

const { Paragraph } = Typography;

const Bracket = ({ matches }) => {  
    // Memoize the parsed matches array to avoid re-parsing on each render
    const matcheParsed = useMemo(() => JSON.parse(JSON.stringify(matches)), [matches]);
    const { windowWidth } = useWindowSize();
    const [clickedMatch, setClickedMatch] = useState({});
    console.log(clickedMatch);

    // const { loading, bracketData } = useBracket();

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
        textColor: { main: '#000000', highlighted: '#ffffff', dark: '#a3a3a3' },
        matchBackground: { wonColor: '#22293b', lostColor: '#22293b' },
        score: {
          background: { wonColor: '#f030c0', lostColor: '#2f3648' },
          text: { highlightedWonColor: '#7BF59D', highlightedLostColor: '#ffffff' },
        },
        border: {
          color: '#000000',
          highlightedColor: '#f030c0',
        },
        roundHeader: { backgroundColor: '#f030c0', fontColor: '#ffffff' },
        connectorColor: '#707582',
        connectorColorHighlight: '#49aa19',
        svgBackground: '#14141400',
    });

    const handleMatchClick = (match) => {
      setClickedMatch(match);
    };

    return (
        <section className='bracket' style={{ display: widthOfTheDiv > 0 ? 'block' : 'none', border: '1px solid #303030', padding: '0.5rem', overflow: 'hidden' }} ref={divRef}>
            {/* <Button type="primary" onClick={(e) => entry(e)}>Add Participant +</Button> */}
            { matcheParsed.length === 0 ? <Empty/> : 
            <SingleEliminationBracket
                className="singleElimination"
                matches={matcheParsed}
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
                      height={500} 
                      background={WhiteTheme.svgBackground}
                      SVGBackground={WhiteTheme.svgBackground}
                      {...props}
                  >
                      {children}
                </SVGViewer>
                )}
                // matchComponent={Match}
                matchComponent={({
                  match,
                  onMatchClick,
                  onPartyClick,
                  onMouseLeave,
                  onMouseEnter,
                  topParty,
                  bottomParty,
                  topWon,
                  bottomWon,
                  topHovered,
                  bottomHovered,
                  topText,
                  bottomText,
                  teamNameFallback,
                  resultFallback,
                  connectorColor,
                  computedStyles,
                }) => (
                  <div className='bracket'
                  >
                    <Paragraph><Tag color="cyan" bordered={false}>{moment(topText).format('lll')}</Tag></Paragraph>

                    <div
                      onClick={() => handleMatchClick(match)}
                      onMouseEnter={() => onMouseEnter(topParty.id)}
                      className='bracketTop'
                    >
                      <div className='item'>
                        <Card bordered style={{ width: 300 }} className={!topHovered ? null : topWon ? 'winHover' : null}>
                          <Row>
                            <Col span={20}>
                              <div className={topParty.name === 'TBD' ? 'participantEmpty' : 'participantName'}>{topParty.name || teamNameFallback}</div>
                            </Col>
                            <Col span={4}>
                              <div className="bracketResult">
                                {
                                  !topParty.resultText ? null : 
                                    topWon ? 
                                      <Tag color="success">{topParty.resultText}</Tag> : 
                                      <Tag color="warning">{topParty.resultText}</Tag>
                                }
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      </div>
                    </div>

                    <div style={{ height: '2px', width: '100%', background: '#ffffff25' }}/>
                    
                    <div
                      onMouseEnter={() => onMouseEnter(bottomParty.id)}
                      className='bracketBot'
                    >
                      <div className='item'>
                        <Card bordered style={{ width: 300 }} className={!bottomHovered ? null : bottomWon ? 'winHover' : null}>
                          <Row>
                            <Col span={20}>
                              <div className={bottomParty.name === 'TBD' ? 'participantEmpty' : 'participantName'}>{bottomParty.name || teamNameFallback}</div>
                            </Col>
                            <Col span={4}>
                              <div className="bracketResult">
                                {
                                  !bottomParty.resultText ? null : 
                                    bottomWon ? 
                                    <Tag color="success">{bottomParty.resultText}</Tag> : 
                                    <Tag color="warning">{bottomParty.resultText}</Tag>
                                }
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      </div>
                    </div>

                    <Paragraph><Tag color="volcano" bordered={false}>{bottomText}</Tag></Paragraph>
                  </div>
                )}
            />}
        </section>
    );
};

export default Bracket;
import { useEffect, useState } from "react";
import moment from "moment";

const useBracket = () => {
    const [loading, setLoading] = useState(true);
    const [bracketData, setBracketData] = useState([]);

    // const generateBracketFor8P = () => {
    //     const totalMatchOf_8P_7M_3R = [];
      
    //     // Round 1 - totalMatch 1 to 4
    //     for (let i = 1; i <= 4; i++) {
    //       const nextMatchId = i <= 2 ? 5 : 6; // Next match will be in the next round
    //       const match = {
    //         id: i,
    //         nextMatchId,
    //         name: `Round 1 - Match ${i}`,
    //         tournamentRoundText: '1',
    //         startTime: '2021-05-30', // Set the start time as needed
    //         state: 'SCHEDULED',
    //         participants: [],
    //       };
    //       totalMatchOf_8P_7M_3R.push(match);
    //     }
      
    //     // Round 2 - totalMatch 5 and 6
    //     for (let i = 5; i <= 6; i++) {
    //       const nextMatchId = 7; // Final match will be in the next round
    //       const match = {
    //         id: i,
    //         nextMatchId,
    //         name: `Round 1 - Match ${i}`,
    //         tournamentRoundText: '2',
    //         startTime: '2021-05-30', // Set the start time as needed
    //         state: 'SCHEDULED',
    //         participants: [],
    //       };
    //       totalMatchOf_8P_7M_3R.push(match);
    //     }
      
    //     // Final Match - Match 7
    //     const finalMatch = {
    //       id: 7,
    //       nextMatchId: null, // No next match, it's the final match
    //       name: 'Final Match',
    //       tournamentRoundText: '3',
    //       startTime: '2021-05-30', // Set the start time as needed
    //       state: 'SCHEDULED',
    //       participants: [],
    //     };
    //     totalMatchOf_8P_7M_3R.push(finalMatch);
      
    //     return totalMatchOf_8P_7M_3R;
    // };

    // const generateBracket16P = () => {
    //   const totalMatchOf_16P_15M_4R = [];
    
    //   // Round 1 - totalMatch 1 to 8
    //   for (let i = 1; i <= 8; i++) {
    //     const nextMatchId = i <= 4 ? 9 : 10; // Next match will be in the next round
    //     const match = {
    //       id: i,
    //       nextMatchId,
    //       name: `Round 1 - Match ${i}`,
    //       tournamentRoundText: '1',
    //       startTime: '2021-05-30', // Set the start time as needed
    //       state: 'SCHEDULED',
    //       participants: [],
    //     };
    //     totalMatchOf_16P_15M_4R.push(match);
    //   }
    
    //   // Round 2 - totalMatch 9 to 12
    //   for (let i = 9; i <= 12; i++) {
    //     const nextMatchId = i <= 10 ? 13 : 14; // Next match will be in the next round
    //     const match = {
    //       id: i,
    //       nextMatchId,
    //       name: `Round 2 - Match ${i}`,
    //       tournamentRoundText: '2',
    //       startTime: '2021-05-30', // Set the start time as needed
    //       state: 'SCHEDULED',
    //       participants: [],
    //     };
    //     totalMatchOf_16P_15M_4R.push(match);
    //   }
    
    //   // Round 3 - totalMatch 13 and 14
    //   for (let i = 13; i <= 14; i++) {
    //     const nextMatchId = 15; // Final match will be in the next round
    //     const match = {
    //       id: i,
    //       nextMatchId,
    //       name: `Round 3 - Match ${i}`,
    //       tournamentRoundText: '3',
    //       startTime: '2021-05-30', // Set the start time as needed
    //       state: 'SCHEDULED',
    //       participants: [],
    //     };
    //     totalMatchOf_16P_15M_4R.push(match);
    //   }
    
    //   // Final Match - Match 15
    //   const finalMatch = {
    //     id: 15,
    //     nextMatchId: null, // No next match, it's the final match
    //     name: 'Final Match',
    //     tournamentRoundText: '4',
    //     startTime: '2021-05-30', // Set the start time as needed
    //     state: 'SCHEDULED',
    //     participants: [],
    //   };
    //   totalMatchOf_16P_15M_4R.push(finalMatch);
    
    //   return totalMatchOf_16P_15M_4R;
    // };  
    
    // const generateBracket = (p) => {
    //   const bracket = [];

    //   switch (p) {
    //     case 2:
    //       // Final Match - Match 3
    //       const finalMatch = {
    //         id: 1,
    //         nextMatchId: null, // No next match, it's the final match
    //         name: 'Final Match',
    //         tournamentRoundText: '1',
    //         startTime: '2021-05-30', // Set the start time as needed
    //         state: 'SCHEDULED',
    //         participants: [],
    //       };
    //       bracket.push(finalMatch);
    //       break;
    //     case 4:
    //       // Round 1 - totalMatch 1 to 2
    //       for (let i = 1; i <= 2; i++) {
    //         const nextMatchId = 3; // Next match will be in the next round
    //         const match = {
    //           id: i,
    //           nextMatchId,
    //           name: `Round 1 - Match ${i}`,
    //           tournamentRoundText: '1',
    //           startTime: '2021-05-30', // Set the start time as needed
    //           state: 'SCHEDULED',
    //           participants: [],
    //         };
    //         bracket.push(match);
    //       }
        
    //       // Final Match - Match 3
    //       const finalMatch0 = {
    //         id: 3,
    //         nextMatchId: null, // No next match, it's the final match
    //         name: 'Final Match',
    //         tournamentRoundText: '2',
    //         startTime: '2021-05-30', // Set the start time as needed
    //         state: 'SCHEDULED',
    //         participants: [],
    //       };
    //       bracket.push(finalMatch0);
    //       break;
    //     case 8:
    //       // Round 1 - totalMatch 1 to 4
    //       for (let i = 1; i <= 4; i++) {
    //         const nextMatchId = i <= 2 ? 5 : 6; // Next match will be in the next round
    //         const match = {
    //           id: i,
    //           nextMatchId,
    //           name: `Round 1 - Match ${i}`,
    //           tournamentRoundText: '1',
    //           startTime: '2021-05-30', // Set the start time as needed
    //           state: 'SCHEDULED',
    //           participants: [],
    //         };
    //         bracket.push(match);
    //       }
        
    //       // Round 2 - totalMatch 5 and 6
    //       for (let i = 5; i <= 6; i++) {
    //         const nextMatchId = 7; // Final match will be in the next round
    //         const match = {
    //           id: i,
    //           nextMatchId,
    //           name: `Round 1 - Match ${i}`,
    //           tournamentRoundText: '2',
    //           startTime: '2021-05-30', // Set the start time as needed
    //           state: 'SCHEDULED',
    //           participants: [],
    //         };
    //         bracket.push(match);
    //       }
        
    //       // Final Match - Match 7
    //       const finalMatch1 = {
    //         id: 7,
    //         nextMatchId: null, // No next match, it's the final match
    //         name: 'Final Match',
    //         tournamentRoundText: '3',
    //         startTime: '2021-05-30', // Set the start time as needed
    //         state: 'SCHEDULED',
    //         participants: [],
    //       };
    //       bracket.push(finalMatch1);
    //       break;
    //     case 16:
    //       // Round 1 - totalMatch 1 to 8
    //       for (let i = 1; i <= 8; i++) {
    //         const nextMatchId = i <= 4 ? 9 : 10; // Next match will be in the next round
    //         const match = {
    //           id: i,
    //           nextMatchId,
    //           name: `Round 1 - Match ${i}`,
    //           tournamentRoundText: '1',
    //           startTime: '2021-05-30', // Set the start time as needed
    //           state: 'SCHEDULED',
    //           participants: [],
    //         };
    //         bracket.push(match);
    //       }
        
    //       // Round 2 - totalMatch 9 to 12
    //       for (let i = 9; i <= 12; i++) {
    //         const nextMatchId = i <= 10 ? 13 : 14; // Next match will be in the next round
    //         const match = {
    //           id: i,
    //           nextMatchId,
    //           name: `Round 2 - Match ${i}`,
    //           tournamentRoundText: '2',
    //           startTime: '2021-05-30', // Set the start time as needed
    //           state: 'SCHEDULED',
    //           participants: [],
    //         };
    //         bracket.push(match);
    //       }
        
    //       // Round 3 - totalMatch 13 and 14
    //       for (let i = 13; i <= 14; i++) {
    //         const nextMatchId = 15; // Final match will be in the next round
    //         const match = {
    //           id: i,
    //           nextMatchId,
    //           name: `Round 3 - Match ${i}`,
    //           tournamentRoundText: '3',
    //           startTime: '2021-05-30', // Set the start time as needed
    //           state: 'SCHEDULED',
    //           participants: [],
    //         };
    //         bracket.push(match);
    //       }
        
    //       // Final Match - Match 15
    //       const finalMatch2 = {
    //         id: 15,
    //         nextMatchId: null, // No next match, it's the final match
    //         name: 'Final Match',
    //         tournamentRoundText: '4',
    //         startTime: '2021-05-30', // Set the start time as needed
    //         state: 'SCHEDULED',
    //         participants: [],
    //       };
    //       bracket.push(finalMatch2);
    //       break;
    //     case 32:
    //       // Round 1 - totalMatch 1 to 16
    //       for (let i = 1; i <= 16; i++) {
    //         const nextMatchId = i <= 8 ? 17 : 18; // Next match will be in the next round
    //         const match = {
    //           id: i,
    //           nextMatchId,
    //           name: `Round 1 - Match ${i}`,
    //           tournamentRoundText: '1',
    //           startTime: '2021-05-30', // Set the start time as needed
    //           state: 'SCHEDULED',
    //           participants: [],
    //         };
    //         bracket.push(match);
    //       }
        
    //       // Round 2 - totalMatch 17 to 24
    //       for (let i = 17; i <= 24; i++) {
    //         const nextMatchId = i <= 20 ? 25 : 26; // Next match will be in the next round
    //         const match = {
    //           id: i,
    //           nextMatchId,
    //           name: `Round 2 - Match ${i - 16}`,
    //           tournamentRoundText: '2',
    //           startTime: '2021-05-30', // Set the start time as needed
    //           state: 'SCHEDULED',
    //           participants: [],
    //         };
    //         bracket.push(match);
    //       }
        
    //       // Round 3 - totalMatch 25 to 28
    //       for (let i = 25; i <= 28; i++) {
    //         const nextMatchId = 29; // Next match will be in the next round
    //         const match = {
    //           id: i,
    //           nextMatchId,
    //           name: `Round 3 - Match ${i - 24}`,
    //           tournamentRoundText: '3',
    //           startTime: '2021-05-30', // Set the start time as needed
    //           state: 'SCHEDULED',
    //           participants: [],
    //         };
    //         bracket.push(match);
    //       }
        
    //       // Round 4 - totalMatch 29 and 30
    //       for (let i = 29; i <= 30; i++) {
    //         const nextMatchId = 31; // Final match will be in the next round
    //         const match = {
    //           id: i,
    //           nextMatchId,
    //           name: `Round 4 - Match ${i - 28}`,
    //           tournamentRoundText: '4',
    //           startTime: '2021-05-30', // Set the start time as needed
    //           state: 'SCHEDULED',
    //           participants: [],
    //         };
    //         bracket.push(match);
    //       }
        
    //       // Final Match - Match 31
    //       const finalMatch3 = {
    //         id: 31,
    //         nextMatchId: null, // No next match, it's the final match
    //         name: 'Final Match',
    //         tournamentRoundText: '5',
    //         startTime: '2021-05-30', // Set the start time as needed
    //         state: 'SCHEDULED',
    //         participants: [],
    //       };
    //       bracket.push(finalMatch3);
    //       break;
    //     default:
    //       console.log('Invalid')
    //   }
    
    //   return bracket;
    // };


    const patternGernerate = (particaipants) => {
      const bracket = [];
      let rp = particaipants;
      const totalMatch = particaipants - 1;
      const rounds = Math.log2(particaipants);
      let matchId = 0;
      let totalObjects = particaipants/2;

      const date = new Date();
      const todayFull = moment(date);
    
      for(let j = 1; j <= rounds; j++) {
        for (let i = 1; i <= (rp/2); i++) {
          const nextMatchId = i > (rp/2) ? null :
                              i % 2 === 0 ?
                              (totalObjects) : (totalObjects+1);
                        
          
          matchId = matchId + 1;
          const match = {
            id: matchId,
            nextMatchId: rp === 2 || i === totalMatch ? null : nextMatchId,
            name: rp === 2 || i === totalMatch ? `Final Match` : `Round ${j} - Match ${i}`,
            tournamentRoundText: `${j}`,
            startTime: `${todayFull.add(2, 'hours').format('llll')}`, 
            state: 'SCHEDULED',
            participants: [],
          };
          totalObjects = nextMatchId;
          bracket.push(match);
        }
        rp = rp/2;
      }

      console.log("bracket", bracket);
    
      return bracket;
    };
    
    useEffect(() => {
        const fetchData = async () => {
          const bracket = patternGernerate(32);
          setBracketData(bracket);
          setLoading(false);
        };
    
        fetchData();
      }, []);

    return {
        loading,
        bracketData,
    }
}

export default useBracket;
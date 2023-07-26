import { useEffect, useState } from "react";

const useBracket = () => {
    const [loading, setLoading] = useState(true);
    const [bracketData, setBracketData] = useState([]);

    const generateBracket = () => {
        const matchesOf_8P_7M_3R = [];
      
        // Round 1 - Matches 1 to 4
        for (let i = 1; i <= 4; i++) {
          const nextMatchId = i <= 2 ? 5 : 6; // Next match will be in the next round
          const match = {
            id: i,
            nextMatchId,
            name: `Round 1 - Match ${i}`,
            tournamentRoundText: '1',
            startTime: new Date('2021-05-30'), // Set the start time as needed
            state: 'SCHEDULED',
            participants: [],
          };
          matchesOf_8P_7M_3R.push(match);
        }
      
        // Round 2 - Matches 5 and 6
        for (let i = 5; i <= 6; i++) {
          const nextMatchId = 7; // Final match will be in the next round
          const match = {
            id: i,
            nextMatchId,
            name: `Round 1 - Match ${i}`,
            tournamentRoundText: '2',
            startTime: '2021-05-30', // Set the start time as needed
            state: 'SCHEDULED',
            participants: [],
          };
          matchesOf_8P_7M_3R.push(match);
        }
      
        // Final Match - Match 7
        const finalMatch = {
          id: 7,
          nextMatchId: null, // No next match, it's the final match
          name: 'Final Match',
          tournamentRoundText: '3',
          startTime: '2021-05-30', // Set the start time as needed
          state: 'SCHEDULED',
          participants: [],
        };
        matchesOf_8P_7M_3R.push(finalMatch);
      
        return matchesOf_8P_7M_3R;
    };

    
    useEffect(() => {
        const fetchData = async () => {
          const bracket = generateBracket();
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
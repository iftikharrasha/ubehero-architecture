import { useEffect, useState } from "react";
import moment from "moment";

const useBracket = () => {
    const [loading, setLoading] = useState(true);
    const [bracketData, setBracketData] = useState([]);

    const patternGernerate = (particaipants) => {
      const bracket = [];
      let rp = particaipants;
      const totalMatch = particaipants - 1;
      const rounds = Math.log2(particaipants);
      let offset = particaipants/2;
      let matchId = 0;

      const date = new Date();
      const todayFull = moment(date);
    
      for(let j = 1; j <= rounds; j++) {
        for (let i = 1; i <= (rp/2); i++) {
          const nextMatchId = i > (rp/2) ? null :
                              i % 2 === 0 ?
                              (offset) : (offset+1);
                        
          
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
          offset = nextMatchId;
          bracket.push(match);
        }
        rp = rp/2;
      }

      console.log("bracket", bracket);
    
      return bracket;
    };

    const shuffledEntry = async (matches) => {
      // Get the matches of the first round
      const firstRoundMatches = matches.filter(
        (match) => match.tournamentRoundText === "1"
      );

      // Shuffle the array of matches to randomly select a match for the user
      const selectedMatch = getRandomMatchWithVacancy(firstRoundMatches);
    
      // // If a match is found, add the user to its participants array
      if (selectedMatch) {
        const user = {
          id: selectedMatch.id,
          resultText: null,
          isWinner: null,
          status: null,
          name: `Rasha${selectedMatch.id+1}`,
          picture: 'link'
        }

        selectedMatch.participants.push(user);
        console.log("selectedMatch", selectedMatch);
    
        return selectedMatch;
      }
    
      // If no match with available slots is found, return null to indicate failure
      return false;
    };
    
    const getRandomMatchWithVacancy = (array) => {
      const availableMatches = array.filter((match) => match.participants.length < 2);
      return availableMatches.length > 0 ? availableMatches[Math.floor(Math.random() * availableMatches.length)] : null;
    };
    
    useEffect(() => {
      const fetchData = async () => {
        const bracket = patternGernerate(4);
        setBracketData(bracket);
        setLoading(false);
      };
  
      fetchData();
    }, []);

    return {
        loading,
        bracketData,
        shuffledEntry
    }
}

export default useBracket;
import { useEffect, useState } from 'react'; 
import moment from 'moment';

const useTimer = (dates) => {
    const [buttonStatus, setButtonStatus] = useState('Join Now');
    const [timeLeftPercent, setTimeLeftPercent] = useState(0);
    const [step, setStep]  = useState(1);

    const now = moment();
    const currentDate = moment().format('YYYY-MM-DDTHH:mm:ss');

    useEffect(() => {
        const calculateStatus = () => {
          if (currentDate >= dates.registrationStart && currentDate < dates.registrationEnd) {
            const registrationStart = moment(dates.registrationStart);
            const registrationEnd = moment(dates.registrationEnd);
            const registrationDuration = moment.duration(registrationEnd.diff(registrationStart));
            const timeElapsed = moment.duration(now.diff(registrationStart));
            const percent = Math.round((timeElapsed / registrationDuration) * 100);

            setTimeLeftPercent(percent);
            setButtonStatus('Join Now');
            setStep(0);
          } else if (currentDate >= dates.registrationEnd && currentDate < dates.tournamentStart) {
              setButtonStatus('Lineup');
              setStep(1);
          } else if (currentDate >= dates.tournamentStart && currentDate < dates.tournamentEnd) {
              setButtonStatus('Started');
              setStep(2);
          } else if (currentDate >= dates.tournamentEnd) {
              setButtonStatus('Finished');
              setStep(3);
          } else {
              setButtonStatus('Upcoming');
              setStep(4);
          }
        };
    
        calculateStatus();
    }, []);

    return {
        step,
        buttonStatus,
        timeLeftPercent
    }
};

export default useTimer;



    // registrationStartDate 2023-05-1T15:59:34.353
    // registrationEndDate 2023-05-5T15:59:34.353
    // tournamentStartDate 2023-05-5T15:59:34.353
    // tournamentEndDate 2023-05-12T15:59:34.353
    
    // // Get the user's current time zone offset in minutes
    // const timeZoneOffset = new Date().getTimezoneOffset();

    // // Apply the time zone offset to the stored date from the database
    // const localDate = moment(tournamentDetails.dates?.tournamentEnd).utcOffset(timeZoneOffset);

    // // Format the date in the user's local time zone
    // const formattedDate = localDate.format('lll');

    // console.log('localDate', formattedDate);

    // console.log('moment', moment(tournamentDetails.dates?.tournamentEnd).format('lll'))


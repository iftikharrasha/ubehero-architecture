// import { useState } from "react";

// const useCommons = () => {
//   const [socketN, setSocketN] = useState(null);

  
//     const sendFriendRequestNotyf = () => {
//         const timeStamp = Date.now();
//         const date = moment(timeStamp);
//         const output = date.format('YYYY-MM-DDTHH:mm:ss.SSS');

//         const data = {
//           type: "tournament_registration",
//           subject: "You’ve joined the tournament",
//           subjectPhoto: tournamentThumbnail,
//           invokedByName: tournamentName,
//           invokedById: _id,
//           receivedByName: loggedInUser.name,
//           receivedById: loggedInUser.id,  //this user will receive notification
//           route: `tournament/details/${_id}`,
//           timeStamp: output,
//           read: false
//         }

//         // Send message to server
//         socketN.emit("send_notification", data);
//     };
//   return {
//     socketN,
//   };
// };

// export default useCommons;
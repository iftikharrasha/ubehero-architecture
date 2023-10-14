// import { message  } from "antd";

// const useXpMessage = () => {
//   const [messageApi, contextHolder] = message.useMessage();

//   const showXPMessage = (xPmessage) => {
    
//     if (messageApi) {
//         messageApi.open({
//             type: 'loading',
//             // content: xPmessage.message1,
//             content: `You've joined the tournament`,
//             duration: 2,
//             style: {
//               marginTop: '85vh',
//             },
//         })
//         .then(() => message.open({
//             type: 'loading',
//             // content: xPmessage.message2,
//             content: `XP points unlocking..`,
//             duration: 2.5,
//             style: {
//               marginTop: '85vh',
//             },
//           }
//         ))
//         .then(() => message.open({
//             type: 'success',
//             // content: xPmessage.message3,
//             content: `You've earned 600xp points`,
//             className: 'custom-class',
//             style: {
//               marginTop: '85vh',
//             },
//             duration: 3.5
//         }
//       ))
//     }else{
//       console.error('Message API is not available.');
//     }
//   }

//   return {
//     showXPMessage,
//     contextHolder
//   };
// };

// export default useXpMessage;




import { message  } from "antd";

const useXpMessage = () => {
  const [messageApi, xpContextHolder] = message.useMessage();

  const showXPMessage = (xPmessage, index, onFinish) => {
    
    if (index < xPmessage.length) {
      const currentMessage = xPmessage[index];
      messageApi.open({
        type: index === 0 ? 'info' : index === 1 ? 'loading' : 'success',
        content: currentMessage,
        duration: 2,
        className: 'custom-class',
        style: {
          marginTop: '85vh',
        },
      });
  
      // Call the next message after a 2-second delay
      setTimeout(() => {
        showXPMessage(xPmessage, index + 1, onFinish);
      }, 2000);
    }else{
      onFinish();
    }
  }

  return {
    showXPMessage,
    xpContextHolder
  };
};

export default useXpMessage;
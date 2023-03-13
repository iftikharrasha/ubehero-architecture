import io from "socket.io-client";

const chatSocket = io(`${process.env.REACT_APP_SERVER_URL}/chat`);
const notificationSocket = io(`${process.env.REACT_APP_SERVER_URL}/notifications`, {
  query: {
    userId: "12345", // Replace with the actual user ID
  },
});

chatSocket.on("connect", () => {
  console.log("Connected to chat socket");
});

notificationSocket.on("connect", () => {
  console.log("Connected to notification socket");
});

chatSocket.on("disconnect", () => {
  console.log("Disconnected from chat socket");
});

notificationSocket.on("disconnect", () => {
  console.log("Disconnected from notification socket");
});

// Join a chat room
chatSocket.emit("join_room", {
  roomId: "room1", // Replace with the actual room ID
  senderName: "John Doe", // Replace with the user's name
  senderPhoto: "https://example.com/avatar.jpg", // Replace with the user's avatar
});

// Send a notification
notificationSocket.emit("new_notification", {
  message: "New notification!",
});

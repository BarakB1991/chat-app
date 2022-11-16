function checkForUser(userID, chatRoomUsers) {
  return chatRoomUsers.some((user) => user.id === userID);
}

module.exports = checkForUser;

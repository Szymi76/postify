export const noti = {
  reveiveFriendRequest: {
    type: "receive-friend-request",
  },
  removeFriend: {
    type: "remove-friend",
  },
  acceptFriendRequest: {
    type: "accepted-friend-request",
  },
  rejectFriendRequest: {
    type: "reject-friend-request",
  },
  someoneTaggedYou: {
    type: "someone-tagged-you",
  },
};

export const createNotificationText = (type: string, name: string) => {
  switch (type) {
    case "receive-friend-request":
      return `${name} wysłał do ciebie zaproszenie do znajomych`;
    case "remove-friend":
      return `${name} usunął cię ze znajomcyh`;
    case "accepted-friend-request":
      return `${name} zaakceptował twoje zaproszenie do znajomcyh`;
    case "reject-friend-request":
      return `${name} odrzucił twoje zaproszenie do znajomcyh`;
    case "someone-tagged-you":
      return `${name} oznaczył się w najnowszym poście`;
  }
};

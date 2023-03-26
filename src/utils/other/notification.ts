export const noti = {
  reveiveFriendRequest: {
    type: "receive-friend-request",
    text: (name: string) => `Otrzymałeś zaproszenie do znajomych od ${name} `,
  },
  removeFriend: {
    type: "remove-friend",
    text: (name: string) => `${name} usunął się ze znajomych`,
  },
  acceptFriendRequest: {
    type: "accepted-friend-request",
    text: (name: string) => `${name} zaakceptował twoje zaproszenie do znajomcyh`,
  },
  rejectFriendRequest: {
    type: "reject-friend-request",
    text: (name: string) => `${name} odrzucił twoje zaproszenie do znajomcyh`,
  },
  someoneTaggedYou: {
    type: "someone-tagged-you",
    text: (name: string) => `${name} oznaczył cię pod postem`,
  },
};

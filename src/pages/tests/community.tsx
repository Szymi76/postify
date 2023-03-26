import { Community, Participant, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import { api } from "~/utils/api";

type ExpandedComm = Community & {
  participants: (Participant & {
    participant: User;
  })[];
};

const Page = () => {
  const { data: communities, refetch } = api.community.getAll.useQuery();
  const { data: userCommunities } = api.community.getAllThatUserIsIn.useQuery();
  const { data: allNotSeen } = api.community.getNotSeenPosts.useQuery({
    communityId: "clfpungfb000vv2howhni88rb",
  });
  const { mutateAsync: createCommunity } = api.community.add.useMutation();

  console.log(allNotSeen);

  const handleCreateCom = async () => {
    const rand = Math.random();

    await createCommunity({ name: `some-name${rand}`, type: "typ123" });
    await refetch();
  };

  return (
    <div>
      <button className="btn-info btn" onClick={() => void refetch()}>
        REFRESH
      </button>
      <button className="btn-success btn" onClick={() => void handleCreateCom()}>
        STWÓRZ NOWĄ SPOŁECZNOŚĆ
      </button>
      <h3>LISTA:</h3>
      {communities && communities.map((com) => <CommunityCard key={com.id} community={com} />)}
    </div>
  );
};

Page.requireAuth = true;

export default Page;

const CommunityCard = ({ community }: { community: ExpandedComm }) => {
  const currentUser = useSession().data!.user;
  const { mutateAsync: toggleParticipation } = api.community.toggleParticipation.useMutation();
  const { mutateAsync: deleteCommunity } = api.community.delete.useMutation();

  const isUserParticipant = community.participants.find(
    (val) => val.participantId == currentUser.id
  );

  const handleToogle = async () => {
    try {
      await toggleParticipation({ communityId: community.id });
    } catch (err) {
      console.warn("JOIN/LEAVE error");
    }
  };

  const handleDeleteCommunity = async () => {
    try {
      await deleteCommunity({ communityId: community.id });
    } catch (err) {
      console.warn("NIE UDAŁO SIE USUNA CPOC SKCKSD");
    }
  };

  return (
    <div className="m-2 border p-2">
      <h3>{community.name}</h3>
      <button
        onClick={() => void handleToogle()}
        className={`btn ${isUserParticipant ? "btn-error" : "btn-primary"}`}
      >
        {isUserParticipant ? "OPUŚĆ" : "DOŁĄCZ"}
      </button>
      <button className="btn-error btn" onClick={() => void handleDeleteCommunity()}>
        USUŃ
      </button>
    </div>
  );
};

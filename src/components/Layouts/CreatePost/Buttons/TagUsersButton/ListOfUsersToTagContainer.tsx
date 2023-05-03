import { type User } from "@prisma/client";
import { useCreatePostContext } from "../../CreatePostContext";
import { Flex, List, ListItem, Paragraph, UserCard } from "~/components/Shared";

export type ListOfUsersToTagContainerProps = { users?: Partial<User>[] };
const ListOfUsersToTagContainer = (props: ListOfUsersToTagContainerProps) => {
  const { values, updateValues } = useCreatePostContext();

  if (!props.users) return <></>;

  const isUserTagged = (userId: string) => values.taggedUsersIds.includes(userId);

  const toggleUserTag = (userId: string) => {
    const newTaggedUsersIds = isUserTagged(userId)
      ? values.taggedUsersIds.filter(id => id != userId)
      : [...values.taggedUsersIds, userId];
    updateValues({ taggedUsersIds: newTaggedUsersIds });
  };

  return (
    <List>
      {props.users.map(user => {
        return (
          <ListItem key={user.id} onClick={() => toggleUserTag(user.id!)}>
            <Flex justify="space-between" items="center" style={{ width: "100%" }}>
              <UserCard name={user.name} src={user.image} />
              <Paragraph>{isUserTagged(user.id!) ? "Oznaczony" : "Nie oznaczony"}</Paragraph>
            </Flex>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListOfUsersToTagContainer;

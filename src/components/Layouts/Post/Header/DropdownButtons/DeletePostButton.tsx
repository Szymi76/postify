import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { Flex, Paragraph } from "~/components/Shared";

const DeletePostButton = () => {
  return (
    <Flex items="center" gap="sm">
      <TrashIcon height={28} width={28} />
      <Paragraph style={{ whiteSpace: "nowrap" }}>Usuń post</Paragraph>
    </Flex>
  );
};

export default DeletePostButton;

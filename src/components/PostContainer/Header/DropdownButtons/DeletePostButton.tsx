import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

const DeletePostButton = () => {
  return (
    <div className="flex items-center gap-1 text-error">
      <TrashIcon className="h-6" />
      <p className="whitespace-nowrap text-sm font-medium">Usuń post</p>
    </div>
  );
};

export default DeletePostButton;

import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { api } from "../../utils/api";

const POST_ID = "clfputss00018v2hoyzrfnx3c";

const Page = () => {
  const { mutateAsync: createNewPost } = api.post.add.useMutation();
  const { mutateAsync: updatePost } = api.post.update.useMutation();
  const { data: users } = api.users.getAll.useQuery();
  const { mutateAsync: deletePost } = api.post.delete.useMutation();

  const { data: post } = api.post.getPostById.useQuery({ postId: "clfpb4hbs0004v2i02nljjscw" });

  const [taggedUsers, setTaggedUsers] = useState<User[]>([]);

  const handleDeletePost = async () => {
    const postId = POST_ID;
    await deletePost({ postId });
  };

  const handleCreateNewPost = async () => {
    const text = "Jakis tekst występujący w poście !!!?";
    const taggedUsersIds = taggedUsers.map((user) => user.id);

    const post = await createNewPost({
      text,
      images: [],
      taggedUsersIds,
      communityId: "clfpungfb000vv2howhni88rb",
    });
    console.log(post);
  };

  const handlePostUpdate = async () => {
    const postId = POST_ID;
    const text = "JAKIS NOT NCDNSKJCNDFKJVNEDFJK";
    const images = [
      "https://fastly.picsum.photos/id/289/200/300.jpg?hmac=TVh4H_Hra3e1VSDPJz-mhCgep32qIa7T6DGQvbrjMb4",
      "https://fastly.picsum.photos/id/193/200/300.jpg?hmac=b5ZG1TfdndbrnQ8UJbIu-ykB2PRWv0QpHwehH0pqMgE",
    ];
    const taggedUsersIds = ["clfpfkmuk0000v2o0afivq4ac"];

    try {
      await updatePost({ postId, text, images, taggedUsersIds });
    } catch (err) {
      console.warn("Nie udało się zaktualizować postu");
    }
  };

  return (
    <main>
      <div className="m-2 flex flex-col gap-3 border border-secondary p-2">
        {users &&
          users.map((user) => {
            const checked = taggedUsers.some((taggedUser) => taggedUser.id == user.id);
            const onChange = () => {
              let array: User[] = [];
              if (checked) array = taggedUsers.filter((taggedUser) => taggedUser.id != user.id);
              else array = [...taggedUsers, user];
              setTaggedUsers(array);
            };

            return (
              <label key={user.id} className="label cursor-pointer justify-start gap-3 border">
                <span className="label-text">ID: {user.id}</span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={onChange}
                  className="checkbox-primary checkbox"
                />
              </label>
            );
          })}
      </div>
      <button className="btn-primary btn" onClick={() => void handleCreateNewPost()}>
        UTWÓRZ PRZYKŁADOWY POST
      </button>
      <button className="btn-primary btn" onClick={() => void handlePostUpdate()}>
        AKTUALIZUJ POST
      </button>
      <button className="btn-error btn" onClick={() => void handleDeletePost()}>
        USUŃ POST
      </button>
      <PostCard id={POST_ID} />
    </main>
  );
};

Page.requireAuth = true;

export default Page;

const PostCard = ({ id }: { id: string }) => {
  const { data: post, refetch } = api.post.getPostById.useQuery({ postId: id });
  const { mutateAsync: togglePostLike } = api.post.toggleLike.useMutation();
  const { mutateAsync: togglePostBookmark } = api.post.toggleBookmarked.useMutation();
  const { mutateAsync: markPostAsSeen } = api.post.markAsSeen.useMutation();
  const { mutateAsync: addCommentToPost } = api.comment.add.useMutation();
  const currentUser = useSession().data!.user;

  const handleTogglePostLike = async () => {
    await togglePostLike({ postId: POST_ID });
    await refetch();
  };

  const handleTogglePostBookmark = async () => {
    await togglePostBookmark({ postId: POST_ID });
    await refetch();
  };

  const handleMarkPostAsSeen = async () => {
    await markPostAsSeen({ postId: POST_ID });
    await refetch();
  };

  const handleAddCommentToPost = async () => {
    const rdm = Math.random();
    await addCommentToPost({ postId: POST_ID, text: `JAkis komentzrz ${rdm}` });
    await refetch();
  };

  if (!post) return <h5>Nie znaleziono postu</h5>;

  const isLiking = post.likes.find((like) => like.user.id == currentUser.id);

  const isBookmarked = post.bookmarked.find((bookmarked) => bookmarked.user.id == currentUser.id);

  const isPostSeen = post.seenBy.find((seen) => seen.user.id == currentUser.id);

  return (
    <div className="m-2 border p-2">
      <p>{post.text}</p>
      <div className="flex gap-2 border">
        {post.images.map((image, index) => {
          return (
            <img
              key={`${index} -${image[0]!}`}
              src={image}
              alt="some photo"
              width={100}
              height={100}
            />
          );
        })}
      </div>
      <div className="flex flex-col gap-2 border">
        {post.taggedUsers.map((user) => {
          return <h6 key={user.id}>ID: {user.id}</h6>;
        })}
      </div>
      <button
        onClick={() => void handleTogglePostLike()}
        className={`btn ${isLiking ? "btn-error" : "btn-primary"}`}
      >
        {isLiking ? "Usuń polubienie" : "Polub post"}
      </button>
      <button
        onClick={() => void handleTogglePostBookmark()}
        className={`btn ${isBookmarked ? "btn-error" : "btn-primary"}`}
      >
        {isBookmarked ? "ODZNACZ" : "ZAZNACZ"}
      </button>
      {!isPostSeen && (
        <button className="btn-success  btn" onClick={() => void handleMarkPostAsSeen()}>
          Zaznacz jako zobaczone
        </button>
      )}
      <button className="btn-warning btn" onClick={() => void handleAddCommentToPost()}>
        DODAJ PRZYKŁADOWY KOMENTARZ
      </button>

      {post.comments.map((com) => {
        return (
          <p key={com.id} className="border p-2">
            {com.text}
          </p>
        );
      })}
    </div>
  );
};

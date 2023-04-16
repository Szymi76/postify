import { User } from "@prisma/client";
import Link from "next/link";
import { UserCard } from "~/components/Global";
import { PAGES } from "~/constants";

type ItemProps = { user: User; onClick: () => void };
export const Item = (props: ItemProps) => {
  return (
    <Link
      href={PAGES.PROFILE(props.user.id)}
      key={props.user.id}
      className="border-b border-slate-200 p-2 outline-none duration-100 last:border-b-0 hover:bg-gray-50 focus:bg-primary focus:text-white"
      onClick={props.onClick}
    >
      <UserCard
        name={props.user.name}
        avatarUrl={props.user.image}
        nameStyles={{ position: "start", size: "md" }}
      />
    </Link>
  );
};

type ListProps = { users: User[] | undefined; onEachClick: (userId: string) => void };
export const List = (props: ListProps) => {
  return (
    <div className="flex flex-col">
      {props.users && props.users.length > 0 ? (
        props.users.map((user, index) => (
          <Item
            key={`${user.id} + ${index}`}
            user={user}
            onClick={() => props.onEachClick(user.id)}
          />
        ))
      ) : (
        <ZeroResults />
      )}
    </div>
  );
};

export const ZeroResults = () => {
  return <p className="text-sm text-gray-500">Brak wyników</p>;
};

type FetchMoreUsersButtonProps = { onClick: () => void };
export const FetchMoreUsersButton = (props: FetchMoreUsersButtonProps) => {
  return (
    <p className="cursor-pointer text-center text-sm text-primary" onClick={props.onClick}>
      Pokaż więcej
    </p>
  );
};

type TitleProps = { children: React.ReactNode };
export const Title = (props: TitleProps) => {
  return (
    <h2 className="my-6 flex gap-5 border-slate-200 pb-2 text-xl font-semibold first:mt-0 ">
      {props.children}
    </h2>
  );
};

type LikesDetailTextProps = { likesCount: number };
const LikesDetailText = (props: LikesDetailTextProps) => {
  const { likesCount } = props;

  if (likesCount == 0)
    return (
      <p>
        <b>Bądz pierwszym</b>, który polubi ten post
      </p>
    );

  if (likesCount == 1)
    return (
      <p>
        Polubione przez <b>jedną osobę</b>
      </p>
    );

  if (likesCount < 5)
    return (
      <p>
        Polubione przez <b>{likesCount} osoby</b>
      </p>
    );

  return (
    <p>
      Polubione przez <b>{likesCount} osób</b>
    </p>
  );
};

export default LikesDetailText;

import { Paragraph } from "~/components/Shared";

type LikesTextInfoProps = { likesCount: number };
const LikesTextInfo = (props: LikesTextInfoProps) => {
  const { likesCount } = props;
  const { text, boldText, boldTextFirst } = getInfoText(likesCount);

  if (boldTextFirst)
    return (
      <Paragraph>
        <b>{boldText}</b> {text}
      </Paragraph>
    );
  else
    return (
      <Paragraph>
        {text} <b>{boldText}</b>
      </Paragraph>
    );
};

export default LikesTextInfo;

function getInfoText(count: number) {
  if (count == 0)
    return { boldText: "Bądz pierwszym", text: ", który polubi ten post", boldTextFirst: true };
  else if (count == 1)
    return { boldText: "jedną osobę", text: "Polubione przez", boldTextFirst: false };
  else if (count < 5)
    return { boldText: `${count} osoby`, text: "Polubione przez", boldTextFirst: false };
  else return { boldText: `${count} osób`, text: "Polubione przez", boldTextFirst: false };
}

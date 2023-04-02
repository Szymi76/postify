import { signIn } from "next-auth/react";
import { useState } from "react";

export type ProviderButtonProps = { src: string; provider: string };
export const ProviderButton = (props: ProviderButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await signIn(props.provider, { callbackUrl: "/" });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <button
      className={`btn-secondary btn-block btn-lg btn flex h-auto gap-5 py-2 text-sm ${
        loading ? "loading" : ""
      }`}
      onClick={() => void handleClick()}
    >
      <img src={props.src} height={40} width={40} alt={`${props.provider} icon`} />
      <p>Kontynuuj za pomocą {props.provider}</p>
    </button>
  );
};

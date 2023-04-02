import { signIn } from "next-auth/react";
import { useRef, useState } from "react";

export const EmailProvider = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailRef.current) return;

    const email = emailRef.current.value;
    setLoading(true);
    await signIn("email", { email });
    setLoading(false);
  };

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="flex w-full flex-col gap-2">
      <input
        ref={emailRef}
        type="email"
        className="input-secondary input input-lg w-full"
        placeholder="Wpisz swój adres email"
      />
      <button className={`btn-primary btn-block btn-lg btn ${loading ? "loading" : ""}`}>
        Zaloguj się za pomocą emailu
      </button>
    </form>
  );
};

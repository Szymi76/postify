import React, { useRef } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

import PostifyLogo from "../../../public/logo_512x512_primary.png";
import GoogleLogo from "../../../public/icon_google.png";
import GithubLogo from "../../../public/icon_github.png";
import DiscordLogo from "../../../public/icon_discord.png";
import QuestionMarkCircleIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import ArrowLongLeftIcon from "@heroicons/react/24/outline/ArrowLongLeftIcon";

const firstTooltipText = "Wróć do strony głównej";

const secondTooltipText =
  "Ze względów bezpieczeńswa nie przechowywujemy twoich haseł. Logowanie może odbywać się za pomocą pośrednika lub własnego adresu email";

const Page = () => {
  return (
    <div className="flex min-h-[100vh] w-full items-center justify-center bg-slate-100">
      <main className="relative my-8 flex min-h-[70vh] w-[475px] max-w-[90%] flex-col items-center gap-5 rounded-lg border border-slate-200 bg-white p-8">
        <img src={PostifyLogo.src} height={80} width={80} alt="Logo postify" />
        <h1 className="text-4xl font-semibold">Zaloguj się</h1>
        <div className="mt-8 flex w-full flex-col items-center gap-2">
          <ProviderButton provider="google" src={GoogleLogo.src} />
          <ProviderButton provider="github" src={GithubLogo.src} />
          <ProviderButton provider="discord" src={DiscordLogo.src} />
          <div className="divider my-8">LUB</div>
          <EmailProvider />
          <p className="text-sm text-gray-500">
            Kliknięcie przycisku powyżej spowoduje wysłanie do twojej skrzynki wiadomości z
            logowaniem.
          </p>
        </div>
        <div className="tooltip tooltip-bottom absolute top-3 left-3" data-tip={firstTooltipText}>
          <Link href="/">
            <ArrowLongLeftIcon className="h-8 cursor-pointer text-primary" />
          </Link>
        </div>
        <div className="tooltip tooltip-bottom absolute top-3 right-3" data-tip={secondTooltipText}>
          <QuestionMarkCircleIcon className="h-8 text-gray-500" />
        </div>
      </main>
    </div>
  );
};

export default Page;

type ProviderButtonProps = { src: string; provider: string };
const ProviderButton = (props: ProviderButtonProps) => {
  const handleClick = async () => await signIn(props.provider);

  return (
    <button
      className="btn-secondary btn-block btn-lg btn flex gap-5 text-sm"
      onClick={() => void handleClick()}
    >
      <img src={props.src} height={40} width={40} />
      <p>Kontynuuj za pomocą {props.provider}</p>
    </button>
  );
};

const EmailProvider = () => {
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailRef.current) return;

    const email = emailRef.current.value;
    await signIn("email", { email });
  };

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="flex w-full flex-col gap-2">
      <input
        ref={emailRef}
        type="email"
        className="input-secondary input input-lg w-full"
        placeholder="Wpisz swój adres email"
      />
      <button className="btn-primary btn-block btn-lg btn">Zaloguj się za pomocą emailu</button>
    </form>
  );
};

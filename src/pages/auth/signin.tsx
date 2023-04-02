import React from "react";
import Link from "next/link";

import PostifyLogo from "../../../public/logo_512x512_primary.png";
import GoogleLogo from "../../../public/icon_google.png";
import GithubLogo from "../../../public/icon_github.png";
import DiscordLogo from "../../../public/icon_discord.png";
import QuestionMarkCircleIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import ArrowLongLeftIcon from "@heroicons/react/24/outline/ArrowLongLeftIcon";

import { useRouter } from "next/router";
import { ErrorAlert } from "~/components/Auth/Info/ErrorAlert";
import { ProviderButton } from "~/components/Auth/Providers/ProviderButton";
import { EmailProvider } from "~/components/Auth/Providers/EmailProvider";

const Page = () => {
  const { query } = useRouter();
  const error = query.error as string | undefined;

  return (
    <div className="flex min-h-[100vh] w-full items-center justify-center bg-slate-100">
      <main className="relative my-8 flex min-h-[70vh] w-[475px] max-w-[90%] flex-col items-center gap-5 rounded-lg border border-slate-200 bg-white p-8">
        {/* LOGO */}
        <Link href="/">
          <img src={PostifyLogo.src} height={80} width={80} alt="Logo postify" />
        </Link>

        <h1 className="text-4xl font-semibold">Zaloguj się</h1>

        {/* PRZYCISKI PROVIDERÓW */}
        <div className="mt-8 flex w-full flex-col items-center gap-2">
          {error && <ErrorAlert error={error} />}
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

        {/* IKONY Z TOOLTIPAMI NA SAMEJ GÓRZE */}
        <div
          className="tooltip tooltip-right absolute top-3 left-3"
          data-tip="Wróć do strony głównej"
        >
          <Link href="/">
            <ArrowLongLeftIcon className="h-8 cursor-pointer text-primary" />
          </Link>
        </div>
        <div
          className="tooltip  tooltip-left absolute top-3 right-3"
          data-tip="Ze względów bezpieczeńswa nie przechowywujemy twoich haseł. Logowanie może odbywać się za pomocą pośrednika lub własnego adresu email"
        >
          <QuestionMarkCircleIcon className="h-8 text-gray-500" />
        </div>
      </main>
    </div>
  );
};

export default Page;

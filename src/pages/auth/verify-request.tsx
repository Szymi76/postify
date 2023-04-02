import ArrowLongLeftIcon from "@heroicons/react/24/outline/ArrowLongLeftIcon";
import QuestionMarkCircleIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import PostifyLogo from "../../../public/logo_512x512_primary.png";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-[100vh] w-full items-center justify-center bg-slate-100">
      <main className="relative my-8 flex w-[475px] max-w-[90%] flex-col items-center gap-8 rounded-lg border border-slate-200 bg-white p-8">
        <Link href="/">
          <img src={PostifyLogo.src} height={80} width={80} alt="Logo postify" />
        </Link>
        <h3 className="text-2xl font-semibold">Sprawdź swój email</h3>
        <p className="text-center text-gray-500">
          Link z logowaniem został wysłany na twoją skrzynkę pocztową.
        </p>
        <div className="tooltip tooltip-right absolute top-3 left-3" data-tip="Wróć do logowania">
          <ArrowLongLeftIcon
            onClick={() => router.back()}
            className="h-8 cursor-pointer text-primary"
          />
        </div>
        <div
          className="tooltip  tooltip-left absolute top-3 right-3"
          data-tip="Jeśli email nie dojedzie do ciebie w ciągu kilku minut, cofnij do strony logowania i spróbuj zalogować się ponownie."
        >
          <QuestionMarkCircleIcon className="h-8 text-gray-500" />
        </div>
      </main>
    </div>
  );
};

export default Page;

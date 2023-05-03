import type React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

type CompleteRequiredUserDataProps = {
  children: React.ReactElement;
};

export const CompleteRequiredUserData = ({ children }: CompleteRequiredUserDataProps) => {
  const router = useRouter();
  const { data: currentUser } = useSession();

  const isUserHaveNoName = currentUser && !Boolean(currentUser?.user.name);

  const isUserAlreadyOnConfPage = router.asPath.includes("complete-the-configurations");

  useEffect(() => {
    if (isUserHaveNoName && !isUserAlreadyOnConfPage) {
      void router.push({
        pathname: "/complete-the-configurations",
        query: { returnUrl: router.asPath },
      });
    }
  }, [router]);

  return children;
};

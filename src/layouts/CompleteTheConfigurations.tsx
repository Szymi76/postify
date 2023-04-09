import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
  children: React.ReactElement;
};

/*
  add the requireAuth property to the page component
  to protect the page from unauthenticated users
  e.g.:
  OrderDetail.requireAuth = true;
  export default OrderDetail;
 */

export const CompleteTheConfiguration = ({ children }: Props): JSX.Element => {
  const router = useRouter();
  const { status: sessionStatus, data: currentUser } = useSession();
  const authorized = sessionStatus === "authenticated";
  const unAuthorized = sessionStatus === "unauthenticated";
  const loading = sessionStatus === "loading";

  const isUserHaveNoName = !Boolean(currentUser?.user.name);

  const isUserAlreadyOnConfPage = router.asPath.includes("complete-the-configurations");

  useEffect(() => {
    // check if the session is loading or the router is not ready
    if (loading || !router.isReady || isUserAlreadyOnConfPage) return;

    if (authorized && isUserHaveNoName) {
      void router.push({
        pathname: "/complete-the-configurations",
        query: { returnUrl: router.asPath },
      });
    }
  }, [loading, unAuthorized, sessionStatus, router]);

  return <div>{children}</div>;
};

import * as React from "react";
import { useAppDispatch, } from "@/store/redux-state-hook";
// import { FirebaseHelper } from "@/helper/firebase.helper";
import { auth } from "@/config/firebase.config";
import { setUser } from "@/store/slice/auth-slice";
// import PayWall from "./pay-wall/pay-wall-main";
// import SocialLinkMain from "./buttons/social-links/social-link-main";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  // const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  // const [isSpaceLoaded, setIsSpaceLoaded] = React.useState(true)

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(setUser(!!user));

      return () => unsubscribe();
    });
  }, [dispatch]);

  return <>{children}</>;
}

export default PrivateRoute;

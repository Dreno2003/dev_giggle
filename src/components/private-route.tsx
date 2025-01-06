import * as React from "react";

// import { useInitState } from "@/hooks/useInitHook.hook";
import { useAppDispatch, useAppSelector } from "@/store/StateHook";
import { useParams } from "react-router";
import LoadingFalllBack from "./loader/loading-falll-back";
import { FirebaseHelper } from "@/helper/firebase.helper";
import { auth } from "@/config/firebase.config";
import {
  checkEmailVerification,
  setUser,
} from "@/store/slices/email-verification.slice";
// import PayWall from "./pay-wall/pay-wall-main";
// import SocialLinkMain from "./buttons/social-links/social-link-main";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

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

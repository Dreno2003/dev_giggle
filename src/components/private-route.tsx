import * as React from "react";
import { useAppDispatch } from "@/store/redux-state-hook";
import { useAppSelector } from "@/store/redux-state-hook";
import { auth } from "@/config/firebase.config";
import { setUser } from "@/store/slice/auth-slice";
import { useGetUser } from "@/hooks/useGetUser.hook";
import { setUserData } from "@/store/slice/user-slice";
import { UserModel } from "@/models/user.model";
// import PayWall from "./pay-wall/pay-wall-main";
// import SocialLinkMain from "./buttons/social-links/social-link-main";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { status, data } = useGetUser(user?.uid ?? "");

  React.useEffect(() => {
    if (status === 'success') {
      dispatch(setUserData(data as unknown as UserModel));
    }
  }, [status]);

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

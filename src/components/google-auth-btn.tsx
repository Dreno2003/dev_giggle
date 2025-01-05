// Dependencies: pnpm install @remixicon/react

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/redux-state-hook";
import { googleSignIn } from "@/store/slice/auth-slice";
import { FcGoogle } from "react-icons/fc";

export default function GoogleAuthButton() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const isAuthLoading = authState.status.state === "loading";

  function handleGoogleAuth() {
    dispatch(googleSignIn());
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        rounded={"full"}
        variant="outline"
        onClick={handleGoogleAuth}
        disabled={isAuthLoading}
      >
        <FcGoogle className="me-" size={16} aria-hidden="true" />
        Login with Google
      </Button>
    </div>
  );
}

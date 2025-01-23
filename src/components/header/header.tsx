// import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import * as React from "react";
import SignIn from "@/pages/auth/SignIn";
import { useAppDispatch, useAppSelector } from "@/store/redux-state-hook";
import UserDropdown from "./user-dropdown-memu";
import { useNavigate } from "react-router";

function Header() {
  const [isDialogOpen, setIsOpenDialog] = React.useState(false);
  const [isMemeDialogOpen, setIsMemeOpenDialog] = React.useState(false);
  const { isUser, status } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const isAuthenticated =
    status.state === "success" && status.type === "google";
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (isAuthenticated) {
      setIsOpenDialog(false);
    }
  }, [status]);

  return (
    <>
      <div>
        <div className="flex md:px-6 w-full text-white  items-center justify-between pt-4">
          <p>Logo</p>

          <div className="flex gap-x-2 md:gap-x-3">
            {!isUser && (
              <Button
                onClick={() => setIsOpenDialog(true)}
                variant={"link"}
                className="text-white"
              >
                Login
              </Button>
            )}
            {isUser && <UserDropdown />}
            <Button
              onClick={function () {
                if (!isUser) {
                  // open login
                  setIsOpenDialog(true);
                } else if (isUser) {
                  navigate("/upload");
                }
                // if not login open login dialog else upload dialog
              }}
              rounded={"full"}
              className=" relative !bg-transparent"
            >
              <div className=" absolute bg-background backdrop-blur-lg opacity-15 h-10 w-full rounded-full" />
              <span>Upload</span>
            </Button>
          </div>
        </div>
      </div>

      <Dialog
        onOpenChange={function (e) {
          setIsOpenDialog(e);
        }}
        open={isDialogOpen}
      >
        <DialogContent className="h-[20rem]  md:w-[20rem] !rounded-2xl">
          <div className="h-4 w-full bg-black relative border-b-4 border-gray-200  top-1" />
          <DialogHeader>
            <DialogTitle className="text-center">
              Join The Kings of Humor.
            </DialogTitle>
          </DialogHeader>
          <div className="">
            <SignIn />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        // ,
        onOpenChange={function (e) {
          setIsMemeOpenDialog(e);
        }}
        open={isMemeDialogOpen}
      >
        <DialogContent className="h-[20rem] !rounded-2xl">
          <DialogHeader>
            <DialogTitle>Upload Meme</DialogTitle>
          </DialogHeader>

          <SignIn />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Header;

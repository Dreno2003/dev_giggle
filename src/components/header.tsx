// import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import * as React from "react";
import SignIn from "@/pages/auth/SignIn";
import { firebaseConfig } from "@/config/firebase.config";
import { FirebaseHelper } from "@/helpers/firebase.helper";

function Header() {
  const [isDialogOpen, setIsOpenDialog] = React.useState(false);
  const m = FirebaseHelper.getuser()

  console.log(m, 'this is called user')

  return (
    <>
      <div>
        <div className="flex md:px-6 w-full text-white  items-center justify-between pt-4">
          <p>Logo</p>

          <div className="flex gap-x-2">
            <Button
              onClick={() => setIsOpenDialog(true)}
              variant={"link"}
              className="text-white"
            >
              Login
            </Button>
            <Button
              onClick={function () {
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
        <DialogContent className="h-[20rem] !rounded-2xl">
          <DialogHeader>
            <DialogTitle>Join and create humor for devs.</DialogTitle>
          </DialogHeader>

          <SignIn />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Header;

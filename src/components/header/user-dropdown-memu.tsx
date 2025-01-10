// import * as React from 'react'
// import { FaRegUser } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store/redux-state-hook";
import { resetAuthSlice, signOutuser } from "@/store/slice/auth-slice";
import * as Avatar from "../ui/avatar";
import { CommonUtils } from "@/utils/common.utils";

function UserDropdown() {
  const dispatch = useAppDispatch();
  const { status, user } = useAppSelector((state) => state.auth);
  const avatarImg = user?.photoURL;
  const displayName = user?.displayName;
  const isLogginOut = status.state === "loading" && status.type === "signout";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none !bg-transparent p-0 focus-visible:border-none !border-none focus:!ring-0">
          <Avatar.Avatar >
            <Avatar.AvatarImage src={avatarImg} alt="user" />
            <Avatar.AvatarFallback>
              {CommonUtils.getNameInitial(displayName ??  undefined)}
            </Avatar.AvatarFallback>
          </Avatar.Avatar>
          {/* <FaRegUser className="size-5 md:size-[22.8px] dark:text-white text-gray-700" /> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="!shadow-none border dark:border-dark-border py-2 px-1 mt-3 w-[10rem]">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
          <DropdownMenuItem className="">Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              dispatch(signOutuser());
              dispatch(resetAuthSlice());
            }}
            className="flex items-center cursor-pointer dark:bg-dark-primary-foreground text-gray-800"
          >
            <CiLogout className="size-8" />
            <span>{isLogginOut ? "Signing out..." : "Sign out"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default UserDropdown;

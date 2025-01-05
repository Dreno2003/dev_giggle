// import * as React from 'react'

import { Button } from "./ui/button";

function Header() {
  return (
    <div>
      <div className="flex w-full text-white  items-center justify-between pt-4">
        <p>Logo</p>

        <div className="flex gap-x-2">
          <Button variant={"link"} className="text-white">
            Login
          </Button>
          <Button rounded={"full"} className=" relative !bg-transparent">
            <div className=" absolute bg-background backdrop-blur-lg opacity-15 h-10 w-full rounded-full"/>
            <span>Upload</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;

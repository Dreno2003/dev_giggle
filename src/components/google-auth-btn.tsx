// Dependencies: pnpm install @remixicon/react

import { Button } from "@/components/ui/button";
// import { RiFacebookFill, RiGithubFill, RiGoogleFill, RiTwitterXFill } from "@remixicon/react";
import { FcGoogle } from "react-icons/fc";

export default function ButtonDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline">
        <FcGoogle className="me-" size={16} aria-hidden="true" />
        Login with Google
      </Button>
    </div>
  );
}

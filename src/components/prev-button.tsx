// import * as React from 'react'
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import clsx from "clsx";

interface PrevButtonProps {
  className?: string;
}
function PrevButton(props: PrevButtonProps) {
  return (
    <>
      <Button size={"sm"} variant={"ghost"} className={clsx(props.className)}>
        <ChevronLeft />
        back
      </Button>
    </>
  );
}

export default PrevButton;

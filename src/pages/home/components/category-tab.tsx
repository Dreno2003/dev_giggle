// import * as  React from 'react'

import { Button } from "@/components/ui/button";

function CategoryTab() {
  return (
    <>
      <div className="bg-muted rounded-full gap-x-2 md:gap-x-2 items-center flex w-full md:w-1/5 h-12 place-content-center px-2 ">
        <Button rounded={"full"} className="bg-background text-foreground w-1/2">Latest</Button>
        <Button rounded={"full"} className="w-1/2">Popular</Button>
      </div>
    </>
  );
}

export default CategoryTab;

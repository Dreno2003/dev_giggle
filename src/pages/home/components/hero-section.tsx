// import * as React from 'react'
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FileUtils } from "@/utils/file.utils";
import Header from "@/components/header";

function HeroSection() {
  return (
    <>
      <section className="  relative px-6 md:px-0  h-[435px] bg-gradient-to-r from-purple-950 to-black">
      <Header />
        <img
          src={FileUtils.absoluteUrl("/images/smile_emoji.png")}
          className="absolute hidden md:block md:size-32 left-4 top-16"
        />

        <img
          src={FileUtils.absoluteUrl("/images/smile_emoji.png")}
          className="absolute hidden md:block md:size-24 right-4 bottom-4"
        />
        {/* <div  className='bg-green-300 inset-0 top-0 absolute w-screen h-full'/> */}
        <div className="cosntainer flex flex-col items-center justify-center h-full space-y-6 text-center">
          <h1 className="text-4xl font-hanalei font-bold text-white sm:text-5xl md:text-6xl">
            Developer & Designer Memes
          </h1>
          <p className="max-w-2xl text-lg text-white/90">
            Find and share the best memes for developers and designers
          </p>
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search memes..."
              className="w-full pl-10 bg-background/95 h-12"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {["JavaScript", "CSS", "React", "UI/UX", "Git", "Python"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-white/10 rounded-full text-white hover:bg-white/20 cursor-pointer"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;

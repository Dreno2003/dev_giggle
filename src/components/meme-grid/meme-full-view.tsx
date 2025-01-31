import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Download, X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Meme } from "@/models/meme.model";
interface MemeFullViewProps {
  selectedMeme: Meme | null;
  setSelectedMeme: React.Dispatch<React.SetStateAction<Meme | null>>;
}
function MemeFullView(props: MemeFullViewProps) {
  // const copyImage = async (url: string) => {
  //   try {
  //     const response = await fetch(url);
  //     const blob = await response.blob();
  //     await navigator.clipboard.write([
  //       new ClipboardItem({
  //         [blob.type]: blob,
  //       }),
  //     ]);
  //   } catch (err) {
  //     console.error("Failed to copy image:", err);
  //   }
  // };

  const downloadImage = async (url: string, title: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Failed to download image:", err);
    }
  };

  return (
    <div>
      <Dialog
        open={!!props.selectedMeme}
        onOpenChange={() => props.setSelectedMeme(null)}
      >
        <DialogContent className="max-w-3xl md:max-w-xl h-auto md:max-h-[40rem]  ">
          {props.selectedMeme && (
            <div className="relative b">
              <Button
                size="icon"
                variant="destructive"
                rounded={"full"}
                className="absolute -right-6 -top-20 z-10"
                onClick={() => props.setSelectedMeme(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="space-y-3">
                <div>
                  <Carousel>
                    <CarouselContent>
                      {props.selectedMeme.imageUrls.map((imgUrl, index) => (
                        <CarouselItem key={index} className="relative">
                          <img
                            src={imgUrl}
                            alt={`${props.selectedMeme?.title}_Image ${index}`}
                            width={300}
                            height={200}
                            className="rounded-lg bg-gray-50/60 h-[20rem] relative maxm-h-[33rem] object-contain w-full"
                          />

                          {props.selectedMeme &&
                            props.selectedMeme.imageUrls.length > 1 && (
                              <div className="right-4 flex gap-x-2  ml-2 absolute bottom-4 ">

                                <Download
                                  onClick={() =>
                                    downloadImage(imgUrl, `${imgUrl}_title`)
                                  }
                                  className="h-4 w-4  cursor-pointer "
                                />

                                {/* <Copy className="h-4 w-4 mr-2" /> */}
                              </div>
                            )}
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    {props.selectedMeme.imageUrls.length > 1 && (
                      <>
                        <CarouselPrevious className="left-8" />
                        <CarouselNext className="right-8" />
                      </>
                    )}
                  </Carousel>
                </div>
                {/* <img
                  // src={""}
                  src={props.selectedMeme.imageUrls[0]}
                  alt={props.selectedMeme.title}
                  width={300}
                  height={200}
                  className="rounded-lg h-[20rem] relative maxm-h-[33rem] object-contain w-full"
                /> */}
                <div className="flex   justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {props.selectedMeme.title}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {props.selectedMeme.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-sm bg-secondary rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {/* <Button
                      // onClick={() => copyImage(selectedMeme.imageUrl)}
                      variant="outline"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button> */}
                    <Button
                    // onClick={() =>
                    //   // downloadImage(selectedMeme.imageUrl, selectedMeme.title)
                    // }
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download{" "}
                      {props.selectedMeme.imageUrls.length > 1 && "All"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MemeFullView;

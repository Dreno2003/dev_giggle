import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Download, Copy , X } from "lucide-react";

import { Meme } from "@/models/meme.model";
interface MemeFullViewProps {
  selectedMeme: Meme | null;
  setSelectedMeme: React.Dispatch<React.SetStateAction<Meme | null>>;

}
function MemeFullView(props: MemeFullViewProps) {


    const copyImage = async (url: string) => {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          await navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob,
            }),
          ]);
        } catch (err) {
          console.error("Failed to copy image:", err);
        }
      };
    
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
      <Dialog open={!!props.selectedMeme} onOpenChange={() => props.setSelectedMeme(null)}>
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
                <img
                  src={""}
                  // src={selectedMeme.imageUrl}
                  alt={props.selectedMeme.title}
                  width={800}
                  height={700}
                  className="rounded-lg relative max-h-[33rem] object-contain w-full"
                />
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
                    <Button
                      // onClick={() => copyImage(selectedMeme.imageUrl)}
                      variant="outline"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                    // onClick={() =>
                    //   // downloadImage(selectedMeme.imageUrl, selectedMeme.title)
                    // }
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
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

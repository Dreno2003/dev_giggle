import { useState } from "react";
import { Download, Copy,Share } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Meme } from "@/models/meme.model";
import { SyncLoader } from "react-spinners";
import MemeFullView from "./meme-full-view";
import { FileUtils } from "@/utils/file.utils";

interface MemeGridProps {
  Memes: Meme[];
  isLoading: boolean;
  onLoadMoreMemes: () => void;
  hasNextPage: boolean;
  isFetchingNext: boolean;
}
export default function MemeGrid(props: MemeGridProps) {
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [hoverselectedMeme, setHoverSelectedMeme] = useState<Meme | null>(null);
  // const [heights, setHeights] = useState<number[]>([]);

  // const handleImageLoad = (event:HTMLImageElement, index:number) => {
  //   const { naturalHeight, naturalWidth } = event.target;
  //   const calculatedHeight = Math.round((naturalHeight / naturalWidth) * 100); // Example: scale height
  //   setHeights((prevHeights) => {
  //     const newHeights = [...prevHeights];
  //     newHeights[index] = calculatedHeight;
  //     return newHeights;
  //   });
  // };

  if (props.isLoading) {
    return "loading";
  }

  return (
    <>
      <div className="columns-2 md:columns-4 gap-4 space-y-4">
        {/* <div className="hidden  flex-wrap"> */}
        {/* <div className=" grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> */}
        {props?.Memes.map((meme) => (
          <div
            onMouseEnter={() => {
              setHoverSelectedMeme(meme);
              // setSelectedMeme(meme);
            }}
            onMouseLeave={() => {
              setHoverSelectedMeme(null);
              // setSelectedMeme(null);
            }}
            onClick={() => {
              // isOpenDialog, setIsOpenDialog
              setSelectedMeme(meme);
            }}
            key={meme.id}
            className=" group overflow-hidden  h-auto cursor-pointer rousnded-lg bordser bg-card"
          >
            <div
              className="cursor-pointer lg:row-span-2 relative h-auto bg-gray-500 "
              onClick={() => {
                setSelectedMeme(meme);
              }}
            >
              <img
                // src=""
                src={meme?.imageUrls[0]}
                alt={meme.title}
                width={400}
                // height={400}
                className="object-cover w-full h-auto aspect-jsquare transition-transform group-hover:scale-105"
              />

              <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-transparent p-4">
                {/* <p className="absolute top-10">
                  {hoverselectedMeme &&
                    hoverselectedMeme?.imageUrls.length > 1 && (
                      <span className="text-white">
                        {" "}
                        {hoverselectedMeme?.imageUrls.length}
                      </span>
                    )}
                </p> */}
                {hoverselectedMeme &&
                  hoverselectedMeme?.imageUrls.length > 1 && (
                    <Copy className="h-4 w-4 absolute top-4 text-gray-300 " />
                  )}
                <div className="w-full relative flex justify-between items-center">
                  <h3 className="text-white font-medium truncate">
                    {meme.title}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO implement share
                        // copyImage(meme.imageUrl);
                      }}
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8"
                      onClick={function (e) {
                        e.stopPropagation();
                        // const images = props.Memes.flatMap(
                        //   (meme) => meme.imageUrls
                        // );
                        if (hoverselectedMeme) {
                          if (hoverselectedMeme.imageUrls.length > 1) {
                            FileUtils.downloadImagesAsZip(
                              hoverselectedMeme.imageUrls,
                              hoverselectedMeme.title
                            );
                          } else {
                            FileUtils.downloadImage(
                              hoverselectedMeme.imageUrls[0],
                              hoverselectedMeme.title
                            );
                          }
                        }
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 w-max mx-auto">
        {props.hasNextPage && (
          <div>
            {/* loadmore btutto */}
            <Button
              disabled={props.isFetchingNext || !props.hasNextPage}
              onClick={props.onLoadMoreMemes}
            >
              Load more humor
            </Button>
          </div>
        )}
        {props.isFetchingNext && (
          <SyncLoader className="text-gray-800 mt-4 text-center" size={11} />
        )}
      </div>
      <MemeFullView
        selectedMeme={selectedMeme}
        setSelectedMeme={setSelectedMeme}
      />
    </>
  );
}

// import { useState } from "react";
// import { Download, Copy, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent } from "@/components/ui/dialog";

// interface Meme {
//   id: number;
//   title: string;
//   imageUrl: string;
//   tags: string[];
//   category: string;
// }

// const MOCK_MEMES: Meme[] = [
//   {
//     id: 1,
//     title: "CSS Pain",
//     imageUrl: "/placeholder.svg?height=400&width=400",
//     tags: ["CSS", "Frontend"],
//     category: "Frontend",
//   },
//   // Add more mock memes here
// ];

// export default function MemeGrid() {
//   const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);

//   const copyImage = async (url: string) => {
//     try {
//       const response = await fetch(url);
//       const blob = await response.blob();
//       await navigator.clipboard.write([
//         new ClipboardItem({
//           [blob.type]: blob,
//         }),
//       ]);
//     } catch (err) {
//       console.error("Failed to copy image:", err);
//     }
//   };

//   const downloadImage = async (url: string, title: string) => {
//     try {
//       const response = await fetch(url);
//       const blob = await response.blob();
//       const blobUrl = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = blobUrl;
//       link.download = `${title}.png`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(blobUrl);
//     } catch (err) {
//       console.error("Failed to download image:", err);
//     }
//   };

//   return (
//     <>
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {MOCK_MEMES.map((meme) => (
//           <div
//             key={meme.id}
//             className="relative group overflow-hidden rounded-lg border bg-card"
//           >
//             <div
//               className="cursor-pointer"
//               onClick={() => setSelectedMeme(meme)}
//             >
//               <img
//                 src={meme.imageUrl}
//                 alt={meme.title}
//                 width={400}
//                 height={400}
//                 className="object-cover w-full aspect-square transition-transform group-hover:scale-105"
//               />
//             </div>
//             <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-transparent p-4">
//               <div className="w-full flex justify-between items-center">
//                 <h3 className="text-white font-medium truncate">
//                   {meme.title}
//                 </h3>
//                 <div className="flex gap-2">
//                   <Button
//                     size="icon"
//                     variant="secondary"
//                     className="h-8 w-8"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       copyImage(meme.imageUrl);
//                     }}
//                   >
//                     <Copy className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     size="icon"
//                     variant="secondary"
//                     className="h-8 w-8"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       downloadImage(meme.imageUrl, meme.title);
//                     }}
//                   >
//                     <Download className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Dialog open={!!selectedMeme} onOpenChange={() => setSelectedMeme(null)}>
//         <DialogContent className="max-w-3xl">
//           {selectedMeme && (
//             <div className="relative">
//               <Button
//                 size="icon"
//                 variant="ghost"
//                 className="absolute right-0 top-0 z-10"
//                 onClick={() => setSelectedMeme(null)}
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//               <div className="space-y-4">
//                 <img
//                   src={selectedMeme.imageUrl}
//                   alt={selectedMeme.title}
//                   width={800}
//                   height={800}
//                   className="rounded-lg w-full"
//                 />
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h2 className="text-xl font-semibold mb-2">
//                       {selectedMeme.title}
//                     </h2>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedMeme.tags.map((tag) => (
//                         <span
//                           key={tag}
//                           className="px-2 py-1 text-sm bg-secondary rounded-md"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button
//                       onClick={() => copyImage(selectedMeme.imageUrl)}
//                       variant="outline"
//                     >
//                       <Copy className="h-4 w-4 mr-2" />
//                       Copy
//                     </Button>
//                     <Button
//                       onClick={() =>
//                         downloadImage(selectedMeme.imageUrl, selectedMeme.title)
//                       }
//                     >
//                       <Download className="h-4 w-4 mr-2" />
//                       Download
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

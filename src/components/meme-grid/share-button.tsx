import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Share2 } from "lucide-react";

const socialLinks = [
  {
    name: "WhatsApp",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="#25D366"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    bgColor: "bg-[#25D366]/10 hover:bg-[#25D366]/20",
  },

  {
    name: "Facebook",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="#1877F2"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    bgColor: "bg-[#1877F2]/10 hover:bg-[#1877F2]/20",
  },
  {
    name: "X",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
      </svg>
    ),
    bgColor: "bg-gray-100 hover:bg-gray-200",
  },
];

function ShareButton({ imageUrls }: { imageUrls: string[] }) {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const formattedImageLinks = imageUrls
    .map((url) => `Check out this photo: ${url}`)
    .join("\n");

  return (
    <>
      <div onClick={() => setDialogOpen(true)}>
        <Share2 className="!size-[.93rem] mt-1" />
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={setDialogOpen}

        // onOpenChange={() => props.setSelectedMeme(null)}
      >
        <DialogContent>
          {/* className="max-w-md mds:max-w-xl h-auto md:max-h-[40rem]  " */}
          <div className="w-full max-w-sm rounded-xl bg-white">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Share </h2>

              <div className="flex gap-2 md:gap-4 w-full ">
                {socialLinks.map((social) => (
                  <a
                    href={
                      social.name === "WhatsApp"
                        ? `https://wa.me/?text=Check+this+photo:+${encodeURIComponent(
                            formattedImageLinks
                          )}`
                        : social.name === "X"
                        ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                            formattedImageLinks
                          )}&text=Check+this+out!`
                        : `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            formattedImageLinks
                          )}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      key={social.name}
                      className={`rounded-full hover:outline-none !outline-none !ring-0 p-3 transition-colors ${social.bgColor}`}
                      aria-label={`Share on ${social.name}`}
                    >
                      {social.icon}
                    </button>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ShareButton;

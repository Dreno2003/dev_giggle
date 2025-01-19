import { Meme } from "@/models/meme.model";
import { CloudStorageService } from "@/services/cloud-storage.service";
import { MemeService } from "@/services/meme.service";
import { CommonUtils } from "@/utils/common.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";

interface UseUploadMemeProps {
  meme: Meme;
  files: File[];
  user: User;
}

export default function useUploadMeme({
  meme,
  files,
  user,
}: UseUploadMemeProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      meme.id ??= CommonUtils.generateId();

      // memeId = CommonUtils.generateId()
      meme.imageUrls = meme.imageUrls || [];

      //  const img:string[] = [];

      for (const [index, file] of files.entries()) {
        let splitted = file.name.split(".");
        let fileExtention = splitted[splitted.length - 1];
        const filename = `${user.uid}_${meme.id}_${index}.${fileExtention}`;
        const storagePath = `memes/${user.uid}/${filename}`;

        try {
          const images = await CloudStorageService.store({
            file,
            storagePath,
          });
          meme.imageUrls.push(images);
        } catch (error:any) {
          throw new Error(error)
          // console.log("this is called error from uploding image", error);
        }
      }

      await MemeService.uploadMeme({ meme, user });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memes"] });
    },
  });
}

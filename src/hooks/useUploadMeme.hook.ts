import { MemeService } from "@/services/meme.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUploadMeme(meme) {
  const queryClient = useQueryClient();
  return useMutation({
mutationFn:async () => {
await MemeService.uploadMeme()
},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memes"] });
    },
  });
}

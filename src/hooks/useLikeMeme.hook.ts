import { MemeService } from "@/services/meme.service";
import { useMutation } from "@tanstack/react-query";

export function useLikeMeme(id: string, uid: string) {
//   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await MemeService.like(id, uid);
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["meme/like"] });
    // },
  });
}

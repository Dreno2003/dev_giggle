import { UserService } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export  function useUpdateUserAgreement(uid: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await UserService.updateUserAgreement(uid);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

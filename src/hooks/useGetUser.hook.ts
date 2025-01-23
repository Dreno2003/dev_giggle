import { UserService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export function useGetUser(uid: string) {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await UserService.getUser(uid);
      return res ?? null;
    },
  });
}

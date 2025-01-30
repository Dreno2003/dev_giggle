import { useInfiniteQuery } from "@tanstack/react-query";
import { MemeService } from "@/services/meme.service";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

export const usePaginatedCollection = () => {
  return useInfiniteQuery({
    queryKey: ["paginated_memes"], // Query key
    queryFn: ({
      pageParam,
    }: {
      pageParam?: QueryDocumentSnapshot<DocumentData>;
    }) => {
      return MemeService.get({ pageParam });
    }, // Fetch function
    initialPageParam: undefined, // Initial page parameter
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.lastVisible : undefined,

    // getNextPageParam: (lastPage) => lastPage.lastVisible || undefined, // Set the next page's starting point
    // getPreviousPageParam: (firstPage) => firstPage.firstVisible || undefined, // Set the previous page's starting point
  });
};

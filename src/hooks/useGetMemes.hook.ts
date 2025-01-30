import { useInfiniteQuery } from '@tanstack/react-query';
import { MemeService } from '@/services/meme.service';

export const usePaginatedCollection = () => {
  return useInfiniteQuery({
    queryKey: ["paginated_memes"], // Query key
    queryFn: ({ pageParam  }) => MemeService.get({ pageParam }), // Fetch function
    initialPageParam: 1, // Initial page parameter
    getNextPageParam: (lastPage) => lastPage.lastVisible || undefined, // Set the next page's starting point
    getPreviousPageParam: (firstPage) => firstPage.firstVisible || undefined, // Set the previous page's starting point
  });
};

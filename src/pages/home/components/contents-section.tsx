import MemeGrid from "@/components/meme-grid/meme-grid";
import CategoryTab from "./category-tab";
import { usePaginatedCollection } from "@/hooks/useGetMemes.hook";
import { Meme } from "@/models/meme.model";

function ContentSection() {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = usePaginatedCollection();
  const mainData = data?.pages.map((page: any) => page as { data: Meme[] });

  return (
    <>
      {/* Main Content */}
      {/* {JSON.stringify(data.pages)} */}
      <section className=" px-4 md:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <CategoryTab />
        </div>
        <MemeGrid
          isLoading={isLoading}
          Memes={mainData ? mainData.flatMap((page) => page.data) : []}
        />
      </section>
    </>
  );
}

export default ContentSection;

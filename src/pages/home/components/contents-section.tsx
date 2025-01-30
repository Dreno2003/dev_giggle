import MemeGrid from "@/components/meme-grid";
import CategoryTab from "./category-tab";
import { usePaginatedCollection } from "@/hooks/useGetMemes.hook";
import { Meme } from "@/models/meme.model";

function ContentSection() {
  const { data, isLoading } = usePaginatedCollection();
  const mainData = data?.pages.map((page: any) => page as { data: Meme[] });
 
  // console.log("this is called data", data.pages.map((page) => page.data));
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
          Memes={mainData?.flatMap((page) => page.data)}
        />
      </section>
    </>
  );
}

export default ContentSection;

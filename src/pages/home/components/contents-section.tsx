import MemeGrid from "@/components/meme-grid";
import CategoryTab from "./category-tab";

function ContentSection() {
  return (
    <>
      {/* Main Content */}
      <section className=" px-4 md:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
           <CategoryTab /> 
           <div className="space-x-2">
            <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md">
              Latest
            </button>
            <button className="px-4 py-2 text-sm font-medium text-muted-foreground">
              Popular
            </button>
          </div> 
        </div>
        <MemeGrid />
      </section>
    </>
  );
}

export default ContentSection;

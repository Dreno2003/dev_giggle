import MemeGrid from "@/components/meme-grid";
import CategoryTab from "./category-tab";

function ContentSection() {
  return (
    <>
      {/* Main Content */}
      <section className=" px-4 md:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
           <CategoryTab /> 
          
        </div>
        <MemeGrid />
      </section>
    </>
  );
}

export default ContentSection;

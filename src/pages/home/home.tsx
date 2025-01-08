import ContentSection from "./components/contents-section";
import HeroSection from "./components/hero-section";

export default function Home() {
  return (
    <main className="min-h-screen  bg-background">
      {/* Hero Section */}
      <HeroSection />
      <ContentSection />
    </main>
  );
}

import Hero from "@/components/Hero";
import CulturalShowcase from "@/components/CulturalShowcase";
import AboutKolo from "@/components/AboutKolo";
import JoinUs from "@/components/JoinUs";
import VideoGallery from "@/components/VideoGallery";
import PhotoGallery from "@/components/PhotoGallery";
import Footer from "@/components/Footer";
import LanguageToggle from "@/components/LanguageToggle";
import Header from "@/components/Header";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <LanguageToggle />
      <Hero />
      <div id="cultural-showcase">
        <CulturalShowcase />
      </div>
      <AboutKolo />
      <JoinUs />
      <VideoGallery />
      <PhotoGallery />
      <Footer />
    </main>
  );
};

export default Index;

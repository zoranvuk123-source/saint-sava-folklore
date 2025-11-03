import Hero from "@/components/Hero";
import CulturalShowcase from "@/components/CulturalShowcase";
import AboutKolo from "@/components/AboutKolo";
import JoinUs from "@/components/JoinUs";
import VideoGallery from "@/components/VideoGallery";
import PhotoGallery from "@/components/PhotoGallery";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
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

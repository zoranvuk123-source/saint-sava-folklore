import Hero from "@/components/Hero";
import VideoGallery from "@/components/VideoGallery";
import PhotoGallery from "@/components/PhotoGallery";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <VideoGallery />
      <PhotoGallery />
      <Footer />
    </main>
  );
};

export default Index;

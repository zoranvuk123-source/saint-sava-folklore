import { ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToGallery = () => {
    document.getElementById("videos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://svetisavaoplenac.ca/wp-content/uploads/2024/10/IMG_3983-scaled-600x400.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up">
          Celebrate
          <span className="block text-gradient">Serbian Culture</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-95 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Explore the vibrant traditions of Sv Sava Oplenac Folklorna Grupa through dance, music, and community
        </p>
        
        <button
          onClick={scrollToGallery}
          className="mt-8 animate-bounce"
          aria-label="Scroll to gallery"
        >
          <ChevronDown className="w-12 h-12 mx-auto opacity-80 hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path 
            fill="hsl(var(--background))" 
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;

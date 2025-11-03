import { ChevronDown } from "lucide-react";
import illustrationFrontPage from "@/assets/illustration-front-page.png";

const Hero = () => {
  const scrollToGallery = () => {
    document.getElementById("cultural-showcase")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image - Black & White with Transparency */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://svetisavaoplenac.ca/wp-content/uploads/2024/10/IMG_3983-scaled-600x400.jpg')",
            filter: "grayscale(100%)",
            opacity: 0.15
          }}
        />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      </div>

      {/* Decorative Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
              Celebrate
              <span className="block text-primary">Serbian Culture</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-foreground/80 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Explore the vibrant traditions of Sv Sava Oplenac Folklorna Grupa through dance, music, and community
            </p>
            <div className="flex gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <button
                onClick={scrollToGallery}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-elegant transition-all hover:scale-105"
              >
                Explore Gallery
              </button>
              <a
                href="#photos"
                className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:shadow-elegant transition-all hover:scale-105"
              >
                View Photos
              </a>
            </div>
          </div>

          {/* Illustration */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <img
              src={illustrationFrontPage}
              alt="Serbian Folk Dancers"
              className="w-full max-w-2xl mx-auto drop-shadow-2xl"
            />
          </div>
        </div>
        
        <button
          onClick={scrollToGallery}
          className="mt-12 animate-bounce mx-auto lg:mx-0 flex items-center justify-center lg:justify-start"
          aria-label="Scroll to gallery"
        >
          <ChevronDown className="w-12 h-12 text-primary opacity-80 hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </section>
  );
};

export default Hero;

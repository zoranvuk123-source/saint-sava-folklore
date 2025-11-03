import { ChevronDown } from "lucide-react";
import illustrationFrontPage from "@/assets/illustration-front-page.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

const Hero = () => {
  const { t } = useLanguage();
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = document.getElementById('homepage-hero-video') as HTMLVideoElement;
    if (video) {
      video.play().catch(() => {
        // Video autoplay failed, that's ok
      });
    }
  }, []);

  const scrollToGallery = () => {
    document.getElementById("cultural-showcase")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        id="homepage-hero-video"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "grayscale(100%) blur(3px)" }}
        onLoadedData={() => setVideoLoaded(true)}
        poster="/hero-fallback.png"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Fallback Image */}
      {!videoLoaded && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/hero-fallback.png')",
            filter: "grayscale(100%) blur(3px)"
          }}
        />
      )}

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />


      {/* Decorative Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Text Content */}
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
              {t("hero.celebrate")}
              <span className="block text-primary">{t("hero.serbian.culture")}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-foreground/80 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <button
                onClick={scrollToGallery}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-elegant transition-all hover:scale-105"
              >
                {t("hero.explore")}
              </button>
              <a
                href="#photos"
                className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:shadow-elegant transition-all hover:scale-105"
              >
                {t("hero.photos")}
              </a>
              <a
                href="/history"
                className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-elegant transition-all hover:scale-105"
              >
                {t("history.title")}
              </a>
            </div>
          </div>

        </div>
        
        <button
          onClick={scrollToGallery}
          className="mt-12 animate-bounce mx-auto flex items-center justify-center"
          aria-label="Scroll to gallery"
        >
          <ChevronDown className="w-12 h-12 text-primary opacity-80 hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </section>
  );
};

export default Hero;

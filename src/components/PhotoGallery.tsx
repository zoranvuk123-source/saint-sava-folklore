import { useState, useMemo } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Photo {
  url: string;
  alt: string;
}

// Curated bright and happy photos for the homepage gallery
const brightPhotos: Photo[] = [
  { url: "/gallery/2025/2025-05-27_1.jpg", alt: "Carassauga Festival 2025" },
  { url: "/gallery/2025/2025-06-01_1.jpg", alt: "Summer Performance 2025" },
  { url: "/gallery/2025/2025-05-13_1.jpg", alt: "Spring Celebration 2025" },
  { url: "/gallery/2024/2024-05-26_1.jpg", alt: "Carassauga 2024" },
  { url: "/gallery/2024/2024-06-02_1.jpg", alt: "Summer Festival 2024" },
  { url: "/gallery/2023/2023-05-28_1.jpg", alt: "Carassauga 2023" },
  { url: "/gallery/2023/2023-06-04_1.jpg", alt: "Summer Performance 2023" },
  { url: "/gallery/2022/2022-05-30_1.jpg", alt: "Festival Performance 2022" },
  { url: "/gallery/2019/2019-05-17_1.jpg", alt: "Spring Performance 2019" },
  { url: "/gallery/2025/2025-05-27_2.jpg", alt: "Festival Joy 2025" },
  { url: "/gallery/2025/2025-06-01_2.jpg", alt: "Dance Celebration 2025" },
  { url: "/gallery/2025/2025-04-27_1.jpg", alt: "Community Event 2025" },
];

// Fisher-Yates shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const PhotoGallery = () => {
  const { t } = useLanguage();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Randomize and pick 8 photos for 2 rows of 4
  const displayPhotos = useMemo(() => {
    return shuffleArray(brightPhotos).slice(0, 8);
  }, []);

  return (
    <section id="photos" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("photos.title")} <span className="text-primary">{t("photos.gallery")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("photos.subtitle")}
          </p>
        </div>

        {/* Photo Grid - 2 rows of 4 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {displayPhotos.map((photo, index) => (
            <div
              key={index}
              className="gallery-item aspect-[4/3] cursor-pointer"
              onClick={() => setLightboxImage(photo.url)}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = "/hero-fallback.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white text-sm font-medium">{photo.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link 
            to="/gallery" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors group"
          >
            {t("photos.viewAll")}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxImage}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] object-contain animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;

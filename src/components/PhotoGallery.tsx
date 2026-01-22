import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface Photo {
  url: string;
  alt: string;
  category: string;
}

const photos: Photo[] = [
  // 2025 Photos
  { url: "/gallery/2025/2025-08-24_1.jpg", alt: "Performance 2025", category: "Performance" },
  { url: "/gallery/2025/2025-08-24_2.jpg", alt: "Group Dance 2025", category: "Performance" },
  { url: "/gallery/2025/2025-06-01_1.jpg", alt: "Festival 2025", category: "Festival" },
  { url: "/gallery/2025/2025-06-01_2.jpg", alt: "Community Event 2025", category: "Community" },
  { url: "/gallery/2025/2025-05-27_1.jpg", alt: "Traditional Dance 2025", category: "Performance" },
  { url: "/gallery/2025/2025-05-27_2.jpg", alt: "Costumes 2025", category: "Costumes" },
  { url: "/gallery/2025/2025-05-27_3.jpg", alt: "Stage Performance 2025", category: "Performance" },
  { url: "/gallery/2025/2025-05-13_1.jpg", alt: "Rehearsal 2025", category: "Behind the Scenes" },
  { url: "/gallery/2025/2025-04-27_1.jpg", alt: "Group Photo 2025", category: "Community" },
  { url: "/gallery/2025/2025-03-15_1.jpg", alt: "Cultural Event 2025", category: "Festival" },
  // 2024 Photos
  { url: "/gallery/2024/2024-06-02_1.jpg", alt: "Performance 2024", category: "Performance" },
  { url: "/gallery/2024/2024-05-26_1.jpg", alt: "Festival 2024", category: "Festival" },
  { url: "/gallery/2024/2024-02-12_1.jpg", alt: "Community Gathering 2024", category: "Community" },
  { url: "/gallery/2024/2024-02-04_1.jpg", alt: "Celebration 2024", category: "Festival" },
  // 2023 Photos
  { url: "/gallery/2023/2023-06-04_1.jpg", alt: "Summer Performance 2023", category: "Performance" },
  { url: "/gallery/2023/2023-05-28_1.jpg", alt: "Carassauga 2023", category: "Festival" },
];

const PhotoGallery = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const categories = [
    { key: "All", label: t("photos.all") },
    { key: "Performance", label: t("photos.performance") },
    { key: "Festival", label: "Festival" },
    { key: "Costumes", label: t("photos.costumes") },
    { key: "Community", label: t("photos.community") },
    { key: "Behind the Scenes", label: t("photos.behind") }
  ];

  const filteredPhotos = selectedCategory === "All" 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  return (
    <section id="photos" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("photos.title")} <span className="text-primary">{t("photos.gallery")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("photos.subtitle")}
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Badge
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
                onClick={() => setSelectedCategory(category.key)}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, index) => (
            <div
              key={index}
              className="gallery-item aspect-[4/3]"
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

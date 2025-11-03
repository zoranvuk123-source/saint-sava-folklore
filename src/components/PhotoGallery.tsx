import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Photo {
  url: string;
  alt: string;
  category: string;
}

const photos: Photo[] = [
  { url: "https://svetisavaoplenac.ca/wp-content/uploads/2024/10/IMG_3983-scaled-600x400.jpg", alt: "Carassauga Festival 2024", category: "Festival" },
  { url: "https://svetisavaoplenac.ca/wp-content/uploads/2024/10/IMG_3986-scaled-600x400.jpg", alt: "Group Performance", category: "Performance" },
  { url: "https://svetisavaoplenac.ca/wp-content/uploads/2024/10/IMG_3982-scaled-600x400.jpg", alt: "Traditional Costumes", category: "Costumes" },
  { url: "https://svetisavaoplenac.ca/wp-content/uploads/2024/10/IMG_3993-scaled-600x400.jpg", alt: "Dance Performance", category: "Performance" },
  { url: "https://svetisavaoplenac.ca/wp-content/uploads/2024/06/IMG_2338-600x400.jpg", alt: "Community Event", category: "Community" },
  { url: "https://svetisavaoplenac.ca/wp-content/uploads/2024/06/IMG_2447-1-600x400.jpg", alt: "Cultural Celebration", category: "Festival" },
  { url: "https://svetisavaoplenac.ca/wp-content/uploads/2024/06/IMG_2332-600x400.jpg", alt: "Folk Dance", category: "Performance" },
  { url: "https://svetisavaoplenac.ca/wp-content/uploads/2024/06/IMG_2449-1-600x400.jpg", alt: "Traditional Dance", category: "Performance" },
  { url: "https://svetisavaoplenac.ca/wp-content/uploads/2024/02/WaterlooMacvaFeb2024-600x400.jpg", alt: "Waterloo Performance", category: "Performance" },
  { url: "https://svetisavaoplenac.ca/wp-content/uploads/2023/10/Hamilton-Oct-28-2023-e1698632577301-600x400.jpg", alt: "Hamilton Event", category: "Community" },
  { url: "https://svetisavaoplenac.ca/wp-content/uploads/2023/11/Starting-Season-2023-scaled-e1699570305498-600x400.jpg", alt: "Season Opening 2023", category: "Community" },
  { url: "https://svetisavaoplenac.ca/wp-content/uploads/2023/11/20231005_203108-scaled-600x400.jpg", alt: "Rehearsal", category: "Behind the Scenes" },
  { url: "https://svetisavaoplenac.ca/wp-content/uploads/2023/10/IMG_0645-1-scaled-600x400.jpg", alt: "Food Festival", category: "Festival" },
  { url: "https://svetisavaoplenac.ca/wp-content/uploads/2023/12/Sop1-600x400.jpg", alt: "Group Photo", category: "Community" },
  { url: "https://svetisavaoplenac.ca/wp-content/uploads/2023/11/Carassauga-May-2023-600x400.jpg", alt: "Carassauga 2023", category: "Festival" },
  { url: "https://svetisavaoplenac.ca/wp-content/uploads/2023/11/Carassauga-Fashion-Show-May-2023-e1699551868515-600x400.jpg", alt: "Fashion Show", category: "Costumes" },
];

const categories = ["All", "Performance", "Festival", "Costumes", "Community", "Behind the Scenes"];

const PhotoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredPhotos = selectedCategory === "All" 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  return (
    <section id="photos" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Photo <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Capturing moments from our performances, festivals, and community gatherings
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
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

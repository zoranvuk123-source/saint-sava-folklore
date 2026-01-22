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
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("photos.title")} <span className="text-primary">{t("photos.gallery")}</span>
          </h2>
          <div className="py-16">
            <p className="text-xl text-muted-foreground italic">
              🔄 Currently being updated...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;

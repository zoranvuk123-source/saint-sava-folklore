import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface Photo {
  url: string;
  alt: string;
  category: string;
}

const galleryFiles = [
  "2016/2016-12-25_1.jpg",
  "2016/2016-12-25_2.jpg",
  "2016/2016-12-27_1.jpg",
  "2016/2016-12-30_1.jpg",
  "2017/2017-02-23_1.jpg",
  "2017/2017-04-08_1.jpg",
  "2017/2017-05-28_1.jpg",
  "2017/2017-05-29_1.jpg",
  "2017/2017-05-29_2.jpg",
  "2017/2017-05-30_1.jpg",
  "2017/2017-05-30_2.jpg",
  "2017/2017-05-30_3.jpg",
  "2017/2017-05-30_4.jpg",
  "2017/2017-05-30_5.jpg",
  "2017/2017-05-30_6.jpg",
  "2017/2017-06-01_1.jpg",
  "2017/2017-06-16_1.jpg",
  "2017/2017-08-11_1.jpg",
  "2017/2017-10-01_1.jpg",
  "2017/2017-11-05_1.jpg",
  "2018/2018-02-04_1.jpg",
  "2018/2018-02-06_1.jpg",
  "2018/2018-02-06_2.jpg",
  "2018/2018-02-06_3.jpg",
  "2018/2018-04-14_1.jpg",
  "2018/2018-05-14_1.jpg",
  "2018/2018-05-14_2.jpg",
  "2018/2018-05-22_1.jpg",
  "2018/2018-05-28_1.jpg",
  "2018/2018-05-28_2.jpg",
  "2018/2018-05-28_3.jpg",
  "2018/2018-06-05_1.jpg",
  "2018/2018-11-16_1.jpg",
  "2019/2019-02-05_1.jpg",
  "2019/2019-02-27_1.jpg",
  "2019/2019-03-04_1.jpg",
  "2019/2019-04-14_1.jpg",
  "2019/2019-05-17_1.jpg",
  "2019/2019-05-28_1.jpg",
  "2019/2019-05-30_1.jpg",
  "2019/2019-05-30_1.jpg",
  "2019/2019-06-03_1.jpg",
  "2019/2019-10-30_1.jpg",
  "2019/2019-11-03_1.jpg",
  "2020/2020-01-26_1.jpg",
  "2020/2020-01-26_2.jpg",
  "2020/2020-02-11_1.jpg",
  "2021/2021-06-01_1.jpg",
  "2022/2022-02-13_1.jpg",
  "2022/2022-05-22_1.jpg",
  "2022/2022-05-30_1.jpg",
  "2023/2023-02-04_2.jpg",
  "2023/2023-02-04_3.jpg",
  "2023/2023-02-04_4.jpg",
  "2023/2023-02-04_5.jpg",
  "2023/2023-02-05_1.jpg",
  "2023/2023-05-28_1.jpg",
  "2023/2023-05-31_1.jpg",
  "2023/2023-06-04_1.jpg",
  "2023/2023-11-14_1.jpg",
  "2023/2023-11-14_2.jpg",
  "2023/2023-11-14_3.jpg",
  "2024/2024-02-04_1.jpg",
  "2024/2024-02-04_2.jpg",
  "2024/2024-02-12_1.jpg",
  "2024/2024-02-12_2.jpg",
  "2024/2024-02-12_3.jpg",
  "2024/2024-05-26_1.jpg",
  "2024/2024-06-02_1.jpg",
  "2024/2024-11-25_1.jpg",
  "2025/2025-02-02_1.jpg",
  "2025/2025-02-24_1.jpg",
  "2025/2025-02-24_2.jpg",
  "2025/2025-03-15_1.jpg",
  "2025/2025-03-15_2.jpg",
  "2025/2025-03-15_3.jpg",
  "2025/2025-03-15_4.jpg",
  "2025/2025-04-27_1.jpg",
  "2025/2025-04-27_2.jpg",
  "2025/2025-04-27_3.jpg",
  "2025/2025-05-13_1.jpg",
  "2025/2025-05-13_2.jpg",
  "2025/2025-05-13_3.jpg",
  "2025/2025-05-27_1.jpg",
  "2025/2025-05-27_2.jpg",
  "2025/2025-05-27_3.jpg",
  "2025/2025-05-27_4.jpg",
  "2025/2025-05-27_5.jpg",
  "2025/2025-05-27_6.jpg",
  "2025/2025-05-27_7.jpg",
  "2025/2025-05-27_8.jpg",
  "2025/2025-05-27_9.jpg",
  "2025/2025-05-27_10.jpg",
  "2025/2025-05-27_11.jpg",
  "2025/2025-05-27_12.jpg",
  "2025/2025-05-27_13.jpg",
  "2025/2025-06-01_1.jpg",
  "2025/2025-06-01_2.jpg",
  "2025/2025-06-01_3.jpg",
  "2025/2025-06-01_4.jpg",
  "2025/2025-06-01_5.jpg",
  "2025/2025-06-16_1.jpg",
  "2025/2025-08-24_1.jpg",
  "2025/2025-08-24_2.jpg",
  "2025/2025-08-24_3.jpg",
];

const photos: Photo[] = galleryFiles.map((file) => {
  const [year] = file.split("/");

  return {
    url: `/gallery/${file}`,
    alt: `Gallery photo ${file.replace("/", " ").replace(/_/g, " ")}`,
    category: year,
  };
});

const PhotoGallery = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const years = Array.from(new Set(photos.map((p) => p.category))).sort().reverse();

  const categories = [
    { key: "All", label: t("photos.all") },
    ...years.map((year) => ({ key: year, label: year })),
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

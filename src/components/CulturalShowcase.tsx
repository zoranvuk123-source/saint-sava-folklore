import row1Badge from "@/assets/row1-badge.png";
import row1Photo1 from "@/assets/row1-photo1.png";
import row1Photo2 from "@/assets/row1-photo2.png";
import row2Badge from "@/assets/row2-badge.png";
import row2Photo1 from "@/assets/row2-photo1.png";
import row2Photo2 from "@/assets/row2-photo2.png";
import row3Badge from "@/assets/row3-badge-new.png";
import row3Photo1 from "@/assets/row3-photo1.png";
import row3Photo2 from "@/assets/row3-photo2.png";
import { useLanguage } from "@/contexts/LanguageContext";

const CulturalShowcase = () => {
  const { t } = useLanguage();

  const showcaseRows = [
    {
      badge: row1Badge,
      title: t("showcase.tradition"),
      photos: [row1Photo1, row1Photo2],
      isBadge: true
    },
    {
      badge: row2Badge,
      title: t("showcase.dance.together"),
      photos: [row2Photo1, row2Photo2],
      isBadge: true
    },
    {
      badge: row3Badge,
      title: t("showcase.strength"),
      photos: [row3Photo1, row3Photo2],
      isBadge: true
    }
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t("showcase.title")} <span className="text-primary">{t("showcase.cultural")}</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            {t("showcase.subtitle")}
          </p>
        </div>

        <div className="space-y-8">
          {showcaseRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center animate-fade-in"
              style={{ animationDelay: `${rowIndex * 0.2}s` }}
            >
              {/* Badge on the left */}
              <div className="flex justify-center md:justify-end">
                <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-transparent">
                  <img
                    src={row.badge}
                    alt={`${row.title} - Serbian folklore cultural value badge`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Two photos on the right */}
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                {row.photos.map((photo, photoIndex) => (
                  <div
                    key={photoIndex}
                    className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-elegant hover:-translate-y-1"
                  >
                    <div className="w-full h-full overflow-hidden">
                      <img
                        src={photo}
                        alt={`${row.title} - Serbian folklore dancers Toronto performance ${photoIndex + 1}`}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CulturalShowcase;

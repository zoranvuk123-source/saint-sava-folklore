import badgeTradicija from "@/assets/badge-tradicija.jpg";
import badgeZajedno from "@/assets/badge-zajedno.jpg";
import snaznoIgra from "@/assets/snazno-igra.png";
import photoTradicija1 from "@/assets/photo-tradicija-1.jpg";
import photoTradicija2 from "@/assets/photo-tradicija-2.jpg";
import photoZajedno1 from "@/assets/photo-zajedno-1.jpg";
import photoZajedno2 from "@/assets/photo-zajedno-2.jpg";
import photoSnazno1 from "@/assets/photo-snazno-1.jpg";
import photoSnazno2 from "@/assets/photo-snazno-2.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const CulturalShowcase = () => {
  const { t } = useLanguage();

  const showcaseRows = [
    {
      badge: badgeTradicija,
      title: t("showcase.tradition"),
      photos: [photoTradicija1, photoZajedno1],
      isBadge: true
    },
    {
      badge: badgeZajedno,
      title: t("showcase.dance.together"),
      photos: [photoTradicija2, photoZajedno2],
      isBadge: true
    },
    {
      badge: snaznoIgra,
      title: t("showcase.strength"),
      photos: [photoSnazno1, photoSnazno2],
      isBadge: false
    }
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-3">
            <span className="text-primary">Sveti Sava</span> OPLENAC
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
                <div className="w-48 h-48 rounded-full overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
                  <img
                    src={row.badge}
                    alt={row.title}
                    className={`w-full h-full ${row.isBadge ? 'object-cover' : 'object-contain bg-gradient-to-br from-primary/10 to-accent/10 p-4'}`}
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
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={photo}
                        alt={`${row.title} ${photoIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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

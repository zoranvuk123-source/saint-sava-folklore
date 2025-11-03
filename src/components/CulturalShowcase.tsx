import zaigramoVeselo from "@/assets/zaigramo-veselo.png";
import tradicija from "@/assets/tradicija.png";
import snaznoIgra from "@/assets/snazno-igra.png";
import koloDancers from "@/assets/kolo-dancers.png";
import { useLanguage } from "@/contexts/LanguageContext";

const CulturalShowcase = () => {
  const { t, language } = useLanguage();

  const showcaseItems = [
    {
      image: zaigramoVeselo,
      title: t("showcase.dance.together"),
      subtitle: (language === "sr-latin" || language === "sr-cyrillic") ? t("showcase.dance.together.en") : t("showcase.dance.together"),
      isIllustration: true
    },
    {
      image: "https://svetisavaoplenac.ca/wp-content/uploads/2024/10/IMG_3993-scaled-600x400.jpg",
      title: t("showcase.tradition"),
      subtitle: (language === "sr-latin" || language === "sr-cyrillic") ? t("showcase.tradition.en") : t("showcase.tradition"),
      isIllustration: false
    },
    {
      image: snaznoIgra,
      title: t("showcase.strength"),
      subtitle: (language === "sr-latin" || language === "sr-cyrillic") ? t("showcase.strength.en") : t("showcase.strength"),
      isIllustration: true
    },
    {
      image: "https://svetisavaoplenac.ca/wp-content/uploads/2024/10/IMG_3982-scaled-600x400.jpg",
      title: t("showcase.kolo"),
      subtitle: (language === "sr-latin" || language === "sr-cyrillic") ? t("showcase.kolo.en") : t("showcase.kolo"),
      isIllustration: false
    },
    {
      image: tradicija,
      title: t("showcase.tradition"),
      subtitle: (language === "sr-latin" || language === "sr-cyrillic") ? t("showcase.tradition.en") : t("showcase.tradition"),
      isIllustration: true
    },
    {
      image: "https://svetisavaoplenac.ca/wp-content/uploads/2023/11/Carassauga-May-2023-Dj-1-e1699570872787-600x400.jpg",
      title: t("showcase.dance.together"),
      subtitle: (language === "sr-latin" || language === "sr-cyrillic") ? t("showcase.dance.together.en") : t("showcase.dance.together"),
      isIllustration: false
    }
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t("showcase.title")} <span className="text-primary">{t("showcase.cultural")}</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            {t("showcase.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {showcaseItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full transition-transform duration-500 group-hover:scale-110 ${
                    item.isIllustration ? 'object-contain bg-gradient-to-br from-primary/10 to-accent/10 p-4' : 'object-cover'
                  }`}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <h3 className="text-sm font-bold text-white leading-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-white/90 italic leading-tight">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CulturalShowcase;

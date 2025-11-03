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
      bgColor: "bg-gradient-to-br from-primary/10 to-accent/10"
    },
    {
      image: tradicija,
      title: t("showcase.tradition"),
      subtitle: (language === "sr-latin" || language === "sr-cyrillic") ? t("showcase.tradition.en") : t("showcase.tradition"),
      bgColor: "bg-gradient-to-br from-secondary/10 to-primary/10"
    },
    {
      image: snaznoIgra,
      title: t("showcase.strength"),
      subtitle: (language === "sr-latin" || language === "sr-cyrillic") ? t("showcase.strength.en") : t("showcase.strength"),
      bgColor: "bg-gradient-to-br from-accent/10 to-secondary/10"
    },
    {
      image: koloDancers,
      title: t("showcase.kolo"),
      subtitle: (language === "sr-latin" || language === "sr-cyrillic") ? t("showcase.kolo.en") : t("showcase.kolo"),
      bgColor: "bg-gradient-to-br from-primary/5 to-muted"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("showcase.title")} <span className="text-primary">{t("showcase.cultural")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("showcase.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {showcaseItems.map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} rounded-2xl p-8 transition-all duration-300 hover:shadow-elegant hover:-translate-y-2 animate-fade-in`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center font-serif">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-center italic">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CulturalShowcase;

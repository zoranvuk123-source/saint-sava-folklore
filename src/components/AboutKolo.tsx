import serbianPattern from "@/assets/serbian-pattern.png";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutKolo = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://svetisavaoplenac.ca/wp-content/uploads/2023/11/Carassauga-May-2023-600x400.jpg"
          alt="Serbian kolo dance background - traditional folk dance performance"
          className="w-full h-full object-cover opacity-5"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-muted/80 via-background/95 to-background" />
      </div>

      {/* Decorative Patterns */}
      <div className="absolute top-10 right-10 opacity-5 w-64 h-64 animate-spin" style={{ animationDuration: "60s" }}>
        <img src={serbianPattern} alt="" className="w-full h-full" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-5 w-48 h-48 animate-spin" style={{ animationDuration: "45s", animationDirection: "reverse" }}>
        <img src={serbianPattern} alt="" className="w-full h-full" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("kolo.title")} <span className="text-primary">{t("kolo.kolo")}</span>
          </h2>
          <p className="text-lg text-muted-foreground italic">
            {t("kolo.unesco")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Icon */}
          <div className="flex justify-center animate-fade-in">
            <div className="relative">
              <img 
                src={serbianPattern} 
                alt="Serbian Traditional Pattern - decorative folk art motif" 
                className="w-80 h-80 drop-shadow-2xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed">
                <strong className="text-primary">Коло</strong> {t("kolo.intro")}
              </p>
              
              <p className="text-lg leading-relaxed">
                {t("kolo.connected")}
              </p>

              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">
                {t("kolo.quote")}
                <footer className="text-sm mt-2">{t("kolo.quote.author")}</footer>
              </blockquote>

              <p className="text-lg leading-relaxed">
                {t("kolo.balkans")}
              </p>

              <div className="bg-secondary/10 rounded-lg p-6 mt-6">
                <h3 className="font-bold text-xl mb-3 text-secondary">{t("kolo.characteristics")}</h3>
                <ul className="space-y-2 text-base">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{t("kolo.rhythms")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{t("kolo.instruments")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{t("kolo.movement")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{t("kolo.simple")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutKolo;

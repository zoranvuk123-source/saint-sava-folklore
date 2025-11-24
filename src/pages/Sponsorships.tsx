import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Users, Sparkles, Calendar, Shirt, Award } from "lucide-react";
import koloDancers from "@/assets/kolo-dancers.png";
import snaznoIgra from "@/assets/snazno-igra.png";
import tradicija from "@/assets/tradicija.png";
import zaigrajmoVeselo from "@/assets/zaigramo-veselo.png";
import silverShirtMockup from "@/assets/silver-sponsor-shirt-mockup.png";

const Sponsorships = () => {
  const { t } = useLanguage();

  const sponsorshipTiers = [
    {
      id: "supporter",
      level: "01",
      name: t("sponsorships.bronze.title"),
      amount: "$100",
      spots: 25,
      placement: t("sponsorships.bronze.placement"),
      visual: "donor-wall",
      color: "border-amber-700/20 bg-amber-50/5",
      accentColor: "text-amber-600",
      backgroundImage: zaigrajmoVeselo,
    },
    {
      id: "silver",
      level: "02",
      name: t("sponsorships.silver.title"),
      amount: "$500",
      spots: 6,
      placement: t("sponsorships.silver.placement"),
      visual: "tshirt-back",
      color: "border-gray-500/20 bg-gray-50/5",
      accentColor: "text-gray-600",
      backgroundImage: tradicija,
    },
    {
      id: "gold",
      level: "03",
      name: t("sponsorships.gold.title"),
      amount: "$1,000",
      spots: 2,
      placement: t("sponsorships.gold.placement"),
      visual: "tshirt-sleeve",
      color: "border-yellow-600/20 bg-yellow-50/5",
      accentColor: "text-yellow-600",
      backgroundImage: snaznoIgra,
    },
    {
      id: "title",
      level: "04",
      name: t("sponsorships.platinum.title"),
      amount: "$5,000",
      spots: 1,
      placement: t("sponsorships.platinum.placement"),
      visual: "everything",
      color: "border-purple-600/20 bg-purple-50/5",
      accentColor: "text-purple-600",
      backgroundImage: koloDancers,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section - Magazine Style */}
        <div className="container mx-auto px-6 md:px-8 max-w-6xl mb-20">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-block">
              <span className="text-sm uppercase tracking-widest text-muted-foreground font-light">
                {t("sponsorships.support")}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              {t("sponsorships.title")}
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              {t("sponsorships.subtitle")}
            </p>
          </div>
        </div>

        {/* Thank You Message - Editorial Style */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 py-16 mb-20">
          <div className="container mx-auto px-6 md:px-8 max-w-4xl">
            <div className="flex items-center justify-center mb-8">
              <Heart className="w-12 h-12 text-primary fill-primary/20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              {t("sponsorships.thankyou.title")}
            </h2>
            <div className="prose prose-lg mx-auto text-center">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                {t("sponsorships.thankyou.message1")}
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t("sponsorships.thankyou.message2")}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          {/* Sponsorship Tiers - Magazine Layout */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {t("sponsorships.levels.title")}
            </h2>
            <p className="text-center text-muted-foreground mb-16 text-lg">
              {t("sponsorships.levels.subtitle")}
            </p>

            <div className="space-y-12">
              {sponsorshipTiers.map((tier, index) => (
                <div
                  key={tier.id}
                  className={`relative border-2 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0">
                    <img 
                      src={tier.backgroundImage} 
                      alt="Dancers" 
                      className="w-full h-full object-cover opacity-5"
                    />
                    <div className={`absolute inset-0 ${tier.color}`}></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-8 md:p-12">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                      {/* Left: Tier Info */}
                      <div className="space-y-4">
                        <span className={`text-sm font-mono ${tier.accentColor} opacity-60`}>
                          LEVEL {tier.level}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold">
                          {tier.name}
                        </h3>
                        <div className={`text-5xl md:text-6xl font-bold ${tier.accentColor}`}>
                          {tier.amount}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{tier.spots} {t("sponsorships.spots.available")}</span>
                        </div>
                      </div>

                      {/* Middle: Visual Representation */}
                      <div className="md:col-span-1">
                        <div className="relative aspect-square bg-gradient-to-br from-background/90 to-muted/90 backdrop-blur-sm rounded-lg p-6 flex items-center justify-center border-2 border-border">
                          {tier.visual === "donor-wall" && (
                            <div className="text-center space-y-2">
                              <Award className={`w-16 h-16 mx-auto ${tier.accentColor}`} />
                              <div className="text-xs font-mono opacity-60">DONOR WALL</div>
                              <div className="text-sm font-semibold">Your Name Here</div>
                            </div>
                          )}
                          {tier.visual === "tshirt-back" && (
                            <div className="relative w-full">
                              <img 
                                src={silverShirtMockup} 
                                alt="Silver sponsor shirt mockup showing logo placement on upper back"
                                className="w-full h-full object-cover rounded"
                              />
                              <div className="text-xs font-mono text-center mt-2 opacity-60">T-SHIRT BACK</div>
                            </div>
                          )}
                          {tier.visual === "tshirt-sleeve" && (
                            <div className="relative">
                              <Shirt className={`w-24 h-24 ${tier.accentColor}`} />
                              <div className="absolute top-2 right-0">
                                <div className="text-[8px] font-bold bg-background/90 px-1.5 py-0.5 rounded">LOGO</div>
                              </div>
                              <div className="text-xs font-mono text-center mt-2 opacity-60">T-SHIRT SLEEVE</div>
                            </div>
                          )}
                          {tier.visual === "everything" && (
                            <div className="text-center space-y-3">
                              <Sparkles className={`w-20 h-20 mx-auto ${tier.accentColor}`} />
                              <div className="space-y-1">
                                <div className="text-[10px] font-mono opacity-60">CALENDARS</div>
                                <div className="text-[10px] font-mono opacity-60">WEBSITE</div>
                                <div className="text-[10px] font-mono opacity-60">EVENTS</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Placement Details */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Calendar className={`w-5 h-5 mt-1 ${tier.accentColor}`} />
                          <p className="text-sm leading-relaxed">
                            {tier.placement}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action - Editorial Style */}
          <div className="bg-primary text-primary-foreground rounded-lg p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("sponsorships.cta.title")}
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                {t("sponsorships.cta.description")}
              </p>
              <a
                href="mailto:saintsavaoplenac@gmail.com?subject=Sponsorship Inquiry"
                className="inline-flex items-center justify-center px-10 py-4 bg-background text-foreground font-semibold rounded-md hover:bg-background/90 transition-colors text-lg"
              >
                {t("sponsorships.cta.button")}
              </a>
            </div>
          </div>

          {/* Tax Info */}
          <div className="mt-12 text-center text-sm text-muted-foreground italic">
            <p>{t("sponsorships.tax.info")}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sponsorships;

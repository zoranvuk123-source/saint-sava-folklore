import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Award, Star, Crown } from "lucide-react";

const Sponsorships = () => {
  const { t } = useLanguage();

  const sponsorshipTiers = [
    {
      id: "bronze",
      name: t("sponsorships.bronze.title"),
      amount: "$100",
      spots: 25,
      icon: CheckCircle2,
      benefits: [
        t("sponsorships.bronze.benefit1"),
      ],
      color: "from-amber-700 to-amber-900",
      iconColor: "text-amber-600",
    },
    {
      id: "silver",
      name: t("sponsorships.silver.title"),
      amount: "$500",
      spots: 6,
      icon: Award,
      benefits: [
        t("sponsorships.silver.benefit1"),
      ],
      color: "from-gray-400 to-gray-600",
      iconColor: "text-gray-500",
    },
    {
      id: "gold",
      name: t("sponsorships.gold.title"),
      amount: "$1,000",
      spots: 2,
      icon: Star,
      benefits: [
        t("sponsorships.gold.benefit1"),
      ],
      color: "from-yellow-400 to-yellow-600",
      iconColor: "text-yellow-500",
    },
    {
      id: "platinum",
      name: t("sponsorships.platinum.title"),
      amount: "$5,000",
      spots: 1,
      icon: Crown,
      benefits: [
        t("sponsorships.platinum.benefit1"),
        t("sponsorships.platinum.benefit2"),
        t("sponsorships.platinum.benefit3"),
      ],
      color: "from-purple-500 to-purple-700",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("sponsorships.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("sponsorships.subtitle")}
            </p>
          </div>

          {/* Sponsorship Tiers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {sponsorshipTiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.id}
                  className="relative bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-br ${tier.color} p-6 text-white`}>
                    <Icon className={`w-12 h-12 mb-3 ${tier.iconColor} bg-white/20 p-2 rounded-full`} />
                    <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
                    <p className="text-3xl font-extrabold mb-2">{tier.amount}</p>
                    <p className="text-sm opacity-90">
                      {tier.spots} {t("sponsorships.spots.available")}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="p-6">
                    <ul className="space-y-3">
                      {tier.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="bg-primary/5 rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t("sponsorships.cta.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t("sponsorships.cta.description")}
            </p>
            <a
              href="mailto:saintsavaoplenac@gmail.com?subject=Sponsorship Inquiry"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors"
            >
              {t("sponsorships.cta.button")}
            </a>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>{t("sponsorships.tax.info")}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sponsorships;

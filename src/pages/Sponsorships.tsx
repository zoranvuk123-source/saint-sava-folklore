import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Download, Calendar } from "lucide-react";

const Sponsorships = () => {
  const { t } = useLanguage();

  const tiers = [
    {
      name: t("sponsorships.platinum.title"),
      amount: "$2,500",
      marketing: t("sponsorships.platinum.marketing"),
      experience: t("sponsorships.platinum.experience"),
      highlight: true,
    },
    {
      name: t("sponsorships.gold.title"),
      amount: "$1,500",
      marketing: t("sponsorships.gold.marketing"),
      experience: t("sponsorships.gold.experience"),
    },
    {
      name: t("sponsorships.silver.title"),
      amount: "$1,000",
      marketing: t("sponsorships.silver.marketing"),
      experience: t("sponsorships.silver.experience"),
    },
    {
      name: t("sponsorships.bronze.title"),
      amount: "$500",
      marketing: t("sponsorships.bronze.marketing"),
      experience: t("sponsorships.bronze.experience"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-6 md:px-8 max-w-6xl mb-20">
          <div className="text-center space-y-6 animate-fade-in">
            <span className="text-sm uppercase tracking-widest text-muted-foreground font-light">
              {t("sponsorships.support")}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              {t("sponsorships.title")}
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              {t("sponsorships.subtitle")}
            </p>
          </div>
        </div>

        {/* Event Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-10 mb-16">
          <div className="container mx-auto px-6 md:px-8 max-w-4xl text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                {t("sponsorships.event.date")}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {t("sponsorships.event.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("sponsorships.event.description")}
            </p>
          </div>
        </div>

        {/* Thank You Section */}
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
          {/* Partnership Table */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {t("sponsorships.levels.title")}
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              {t("sponsorships.levels.subtitle")}
            </p>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-hidden rounded-lg border-2 border-border">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="text-left px-6 py-4 font-semibold">{t("sponsorships.col.level")}</th>
                    <th className="text-left px-6 py-4 font-semibold">{t("sponsorships.col.investment")}</th>
                    <th className="text-left px-6 py-4 font-semibold">{t("sponsorships.col.marketing")}</th>
                    <th className="text-left px-6 py-4 font-semibold">{t("sponsorships.col.experience")}</th>
                  </tr>
                </thead>
                <tbody>
                  {tiers.map((tier, index) => (
                    <tr
                      key={index}
                      className={`border-t border-border transition-colors hover:bg-muted/50 ${
                        tier.highlight ? "bg-primary/5" : ""
                      }`}
                    >
                      <td className="px-6 py-5 font-bold text-lg">{tier.name}</td>
                      <td className="px-6 py-5 text-xl font-bold text-primary">{tier.amount}</td>
                      <td className="px-6 py-5 text-sm text-muted-foreground leading-relaxed">{tier.marketing}</td>
                      <td className="px-6 py-5 text-sm text-muted-foreground">{tier.experience}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-6">
              {tiers.map((tier, index) => (
                <div
                  key={index}
                  className={`rounded-lg border-2 p-6 space-y-3 ${
                    tier.highlight ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{tier.name}</h3>
                    <span className="text-2xl font-bold text-primary">{tier.amount}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      {t("sponsorships.col.marketing")}
                    </p>
                    <p className="text-sm text-muted-foreground">{tier.marketing}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      {t("sponsorships.col.experience")}
                    </p>
                    <p className="text-sm text-muted-foreground">{tier.experience}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Download Letter Button */}
          <div className="text-center mb-16">
            <a
              href="/sponsorship-letter.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-primary text-primary font-semibold rounded-md hover:bg-primary hover:text-primary-foreground transition-colors text-lg"
            >
              <Download className="w-5 h-5" />
              {t("sponsorships.download.letter")}
            </a>
          </div>

          {/* Call to Action */}
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

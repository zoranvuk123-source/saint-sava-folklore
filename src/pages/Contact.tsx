import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import LanguageToggle from "@/components/LanguageToggle";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Calendar, Phone } from "lucide-react";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <LanguageToggle />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          {t("nav.contact")}
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12">
          {t("contact.subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="border-0 shadow-card hover:shadow-elegant transition-all">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t("contact.email.title")}</h3>
                  <a 
                    href="mailto:saintsavaoplenac@gmail.com"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    saintsavaoplenac@gmail.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card hover:shadow-elegant transition-all">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t("contact.location.title")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("join.location.church")}<br />
                    Mississauga, ON
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card hover:shadow-elegant transition-all">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t("contact.schedule.title")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("footer.thursday")}<br />
                    {t("footer.time")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card hover:shadow-elegant transition-all">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t("contact.phone.title")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("contact.phone.coming")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-card bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">{t("contact.cta.title")}</h3>
            <p className="opacity-90 mb-6 max-w-2xl mx-auto">{t("contact.cta.description")}</p>
            <a 
              href="mailto:saintsavaoplenac@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              {t("join.contact")}
            </a>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </main>
  );
};

export default Contact;

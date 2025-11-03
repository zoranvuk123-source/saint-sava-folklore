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
                    1375 Blundell Rd<br />
                    Mississauga, ON L4Y 1M6
                  </p>
                  <a 
                    href="https://maps.google.com/?q=1375+Blundell+Rd,+Mississauga,+ON+L4Y+1M6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline mt-2 inline-block"
                  >
                    {t("contact.location.directions")}
                  </a>
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

        {/* Map Section */}
        <Card className="border-0 shadow-card mb-12 overflow-hidden">
          <CardContent className="p-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.8147982668!2d-79.64534!3d43.58635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b47db8e2a87bd%3A0x5b3c7c3c7c3c7c3c!2s1375%20Blundell%20Rd%2C%20Mississauga%2C%20ON%20L4Y%201M6!5e0!3m2!1sen!2sca!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="St. Sava Serbian Orthodox Church Location"
            />
          </CardContent>
        </Card>

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

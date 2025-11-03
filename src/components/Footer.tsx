import { Mail, MapPin, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import illustrationFrontPage from "@/assets/illustration-front-page.png";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* Illustration Banner */}
      <div className="w-full bg-background/5 py-8">
        <div className="container mx-auto px-4">
          <img
            src={illustrationFrontPage}
            alt="Serbian Folk Dancers"
            className="w-full max-w-5xl mx-auto"
          />
        </div>
      </div>

      <footer className="relative bg-secondary text-secondary-foreground overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
        <img 
          src="https://svetisavaoplenac.ca/wp-content/uploads/2023/11/ChurchHallAllGrps-600x400.jpg"
          alt="Folklorna Grupa Group Photo"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/95 to-secondary/80" />
      </div>

      <div className="relative z-10 container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Свети Сава Опленац</h3>
            <p className="text-sm opacity-90 mb-4">Фолклорни Ансамбл</p>
            <p className="text-sm opacity-75 mb-4">
              {t("footer.about")}
            </p>
            <Link 
              to="/history" 
              className="inline-flex items-center text-sm font-semibold opacity-90 hover:opacity-100 transition-opacity underline"
            >
              {t("history.title")} →
            </Link>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-lg">{t("footer.contact")}</h4>
            <div className="space-y-3">
              <a 
                href="mailto:saintsavaoplenac@gmail.com" 
                className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 transition-opacity"
              >
                <Mail className="w-4 h-4" />
                saintsavaoplenac@gmail.com
              </a>
              <div className="flex items-start gap-2 text-sm opacity-90">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>
                  {t("join.location.church")}<br />
                  2520 Dixie Rd<br />
                  Mississauga, ON
                </span>
              </div>
            </div>
          </div>

          {/* Practice Times */}
          <div>
            <h4 className="font-bold mb-4 text-lg">{t("footer.schedule")}</h4>
            <div className="flex items-start gap-2 text-sm opacity-90">
              <Calendar className="w-4 h-4 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">{t("footer.thursday")}</p>
                <p className="opacity-75">5:45 - 9:30 p.m.</p>
                <p className="opacity-75 mt-2">{t("footer.new.dancers")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-sm opacity-75">
            {t("footer.rights")}
          </p>
        </div>
      </div>
      </footer>
    </>
  );
};

export default Footer;

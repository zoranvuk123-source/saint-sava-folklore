import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const content = {
    en: {
      title: "Page Not Found",
      subtitle: "Sorry, the page you're looking for doesn't exist or has been moved.",
      home: "Back to Home",
      schedule: "View Schedule",
      back: "Go Back"
    },
    sr: {
      title: "Страница није пронађена",
      subtitle: "Жао нам је, страница коју тражите не постоји или је премештена.",
      home: "Назад на почетну",
      schedule: "Погледај распоред",
      back: "Назад"
    },
    "sr-Latn": {
      title: "Stranica nije pronađena",
      subtitle: "Žao nam je, stranica koju tražite ne postoji ili je premeštena.",
      home: "Nazad na početnu",
      schedule: "Pogledaj raspored",
      back: "Nazad"
    }
  };

  const t = content[language] || content.en;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          {/* 404 Number */}
          <h1 className="text-8xl md:text-9xl font-bold text-primary/20 mb-4">404</h1>
          
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {t.title}
          </h2>
          
          {/* Subtitle */}
          <p className="text-muted-foreground mb-8">
            {t.subtitle}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/">
                <Home className="w-4 h-4" />
                {t.home}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/calendar">
                <Calendar className="w-4 h-4" />
                {t.schedule}
              </Link>
            </Button>
          </div>
          
          {/* Go Back Link */}
          <button
            onClick={() => window.history.back()}
            className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;

import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const History = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-8 hover:bg-accent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("history.back")}
          </Button>
        </Link>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">
            {t("history.title")}
          </h1>

          <div className="space-y-6 text-foreground">
            <p className="text-lg leading-relaxed">
              {t("history.intro.p1")}
            </p>

            <p className="text-lg leading-relaxed">
              {t("history.intro.p2")}
            </p>

            <p className="text-lg leading-relaxed">
              {t("history.intro.p3")}
            </p>

            <div className="my-8 rounded-xl overflow-hidden shadow-elegant max-w-[25%] mx-auto">
              <img 
                src="/gallery/2017/2017-06-01_1.jpg" 
                alt="Saint Sava Oplenac historical photo"
                className="w-full"
              />
            </div>

            <p className="text-lg leading-relaxed">
              {t("history.groups.intro")}
            </p>

            <ul className="space-y-3 ml-6">
              <li className="text-lg">{t("history.groups.choir")}</li>
              <li className="text-lg">{t("history.groups.tamburica")}</li>
              <li className="text-lg">{t("history.groups.folklore")}</li>
            </ul>

            <p className="text-lg leading-relaxed">
              {t("history.strazilovo.p1")}
            </p>

            <p className="text-lg leading-relaxed">
              {t("history.strazilovo.p2")}
            </p>

            <div className="my-8 rounded-xl overflow-hidden shadow-elegant">
              <img 
                src="/gallery/2019/2019-05-30_1.jpg" 
                alt="Historical performance photo"
                className="w-full"
              />
            </div>

            <p className="text-lg leading-relaxed">
              {t("history.caravan.p1")}
            </p>

            <div className="my-8 rounded-xl overflow-hidden shadow-elegant">
              <img 
                src="/gallery/2023/2023-05-28_1.jpg" 
                alt="Caravan festival photo"
                className="w-full"
              />
            </div>

            <p className="text-lg leading-relaxed">
              {t("history.caravan.p2")}
            </p>

            <p className="text-lg leading-relaxed">
              {t("history.mississauga")}
            </p>

            <p className="text-lg leading-relaxed">
              {t("history.performances")}
            </p>

            <p className="text-lg leading-relaxed">
              {t("history.nameChange")}
            </p>

            <p className="text-lg leading-relaxed font-semibold">
              {t("history.conclusion")}
            </p>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
};

export default History;

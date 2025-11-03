import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Calendar, Award } from "lucide-react";

const Community = () => {
  const { t } = useLanguage();

  const communityEvents = [
    {
      icon: Calendar,
      title: t("community.carassauga.title"),
      description: t("community.carassauga.description"),
      image: "https://svetisavaoplenac.ca/wp-content/uploads/2023/11/Carassauga-May-2023-Dj-1-e1699570872787-600x400.jpg"
    },
    {
      icon: Award,
      title: t("community.festivals.title"),
      description: t("community.festivals.description"),
      image: "https://svetisavaoplenac.ca/wp-content/uploads/2024/10/IMG_3993-scaled-600x400.jpg"
    },
    {
      icon: Users,
      title: t("community.church.title"),
      description: t("community.church.description"),
      image: "https://svetisavaoplenac.ca/wp-content/uploads/2023/11/ChurchHallAllGrps-600x400.jpg"
    },
    {
      icon: Heart,
      title: t("community.charity.title"),
      description: t("community.charity.description"),
      image: "https://svetisavaoplenac.ca/wp-content/uploads/2024/10/IMG_3982-scaled-600x400.jpg"
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          {t("nav.community")}
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          {t("community.subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {communityEvents.map((event, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-card hover:shadow-elegant transition-all group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white">
                    <event.icon className="w-6 h-6" />
                    <h3 className="text-xl font-bold">{event.title}</h3>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 border-0 shadow-card bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <Heart className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">{t("community.join.title")}</h3>
            <p className="opacity-90 mb-6 max-w-2xl mx-auto">{t("community.join.description")}</p>
            <a 
              href="mailto:saintsavaoplenac@gmail.com"
              className="inline-flex items-center px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
            >
              {t("join.contact")}
            </a>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </main>
  );
};

export default Community;

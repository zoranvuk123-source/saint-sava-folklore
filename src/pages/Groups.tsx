import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, Music } from "lucide-react";
import opankeIcon from "@/assets/icons/opanke-icon.png";
import sajkacaIcon from "@/assets/icons/sajkaca-icon.png";
import serbianFlagIcon from "@/assets/icons/serbian-flag-icon.png";
import koloCircleIcon from "@/assets/icons/kolo-circle-icon.png";

const Groups = () => {
  const { t } = useLanguage();

  const folkIcons = [opankeIcon, sajkacaIcon, serbianFlagIcon, koloCircleIcon];

  const groups = [
    {
      name: t("join.group3"),
      icon: folkIcons[0],
      ageRange: t("join.ages.3to7"),
      time: t("join.group3.time"),
      choreographer: "TBA",
      description: t("join.group3.note"),
      color: "from-primary/20 to-accent/20"
    },
    {
      name: t("join.group2"),
      icon: folkIcons[1],
      ageRange: t("join.ages.8to12"),
      time: t("join.group2.time"),
      choreographer: "TBA",
      description: t("join.group2.note"),
      color: "from-secondary/20 to-primary/20"
    },
    {
      name: t("join.group1"),
      icon: folkIcons[2],
      ageRange: t("join.ages.13plus"),
      time: t("join.group1.time"),
      choreographer: "TBA",
      description: t("join.group1.note"),
      color: "from-accent/20 to-secondary/20"
    },
    {
      name: t("join.recreational"),
      icon: folkIcons[3],
      ageRange: t("join.ages.all"),
      time: t("join.recreational.time"),
      choreographer: "TBA",
      description: t("join.recreational.note"),
      color: "from-primary/10 to-muted"
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          {t("nav.groups")}
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          {t("groups.subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {groups.map((group, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-card hover:shadow-elegant transition-all">
              <div className={`h-3 bg-gradient-to-r ${group.color}`} />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center bg-gradient-to-br ${group.color}`}>
                    <img src={group.icon} alt={group.name} className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{group.name}</CardTitle>
                    <p className="text-sm text-muted-foreground font-semibold">{group.ageRange}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">{t("groups.practice")}</p>
                    <p className="text-sm text-muted-foreground">{group.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Music className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">{t("groups.choreographer")}</p>
                    <p className="text-sm text-muted-foreground">{group.choreographer}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">{group.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 border-0 shadow-card bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">{t("groups.interested")}</h3>
            <p className="text-muted-foreground mb-6">{t("groups.contact")}</p>
            <a 
              href="mailto:saintsavaoplenac@gmail.com"
              className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-elegant transition-all hover:scale-105"
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

export default Groups;

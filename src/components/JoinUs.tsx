import { Clock, Users, MapPin, Heart, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import opankeIcon from "@/assets/icons/opanke-icon.png";
import sajkacaIcon from "@/assets/icons/sajkaca-icon.png";
import serbianFlagIcon from "@/assets/icons/serbian-flag-icon.png";
import koloCircleIcon from "@/assets/icons/kolo-circle-icon.png";
import { useLanguage } from "@/contexts/LanguageContext";

const JoinUs = () => {
  const { t } = useLanguage();
  
  const groupImages = [
    "https://svetisavaoplenac.ca/wp-content/uploads/2024/10/IMG_3993-scaled-600x400.jpg",
    "https://svetisavaoplenac.ca/wp-content/uploads/2024/10/IMG_3982-scaled-600x400.jpg",
    "https://svetisavaoplenac.ca/wp-content/uploads/2023/11/Carassauga-May-2023-Dj-1-e1699570872787-600x400.jpg",
    "https://svetisavaoplenac.ca/wp-content/uploads/2023/10/IMG_0645-1-scaled-600x400.jpg"
  ];

  const folkIcons = [opankeIcon, sajkacaIcon, serbianFlagIcon, koloCircleIcon];

  const groups = [
    {
      name: t("join.group3"),
      iconLabel: "Opanke",
      ageRange: t("join.ages.3to7"),
      time: t("join.group3.time"),
      note: t("join.group3.note"),
      color: "from-primary/20 to-accent/20"
    },
    {
      name: t("join.group2"),
      iconLabel: "Šajkača",
      ageRange: t("join.ages.8to12"),
      time: t("join.group2.time"),
      note: t("join.group2.note"),
      color: "from-secondary/20 to-primary/20"
    },
    {
      name: t("join.group1"),
      iconLabel: "Serbian Flag",
      ageRange: t("join.ages.13plus"),
      time: t("join.group1.time"),
      note: t("join.group1.note"),
      color: "from-accent/20 to-secondary/20"
    },
    {
      name: t("join.recreational"),
      iconLabel: "Kolo Circle",
      ageRange: t("join.ages.all"),
      time: t("join.recreational.time"),
      note: t("join.recreational.note"),
      color: "from-primary/10 to-muted"
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("join.title")} <span className="text-primary">{t("join.group")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            {t("join.subtitle")}
          </p>
          <div className="flex items-center justify-center gap-2 text-lg">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span className="font-semibold text-primary">{t("join.all.welcome")}</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <MapPin className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold">{t("join.location.title")}</h3>
          </div>
          <p className="text-lg mb-2">{t("join.location.church")}</p>
          <p className="text-muted-foreground">{t("join.location.description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {groups.map((group, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 group/card">
              <div className="relative h-48 overflow-hidden">
                <img src={groupImages[index]} alt={`${group.name} dancers`} className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110" />
                <div className={`absolute inset-0 bg-gradient-to-b ${group.color} opacity-90`} />
                <div className="absolute top-4 right-4 bg-white/95 rounded-xl p-3 shadow-lg">
                  <img src={folkIcons[index]} alt={group.iconLabel} className="w-12 h-12 object-contain" />
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold">{group.name}</CardTitle>
                <p className="text-sm text-muted-foreground font-semibold">{group.ageRange}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="font-semibold">{group.time}</p>
                </div>
                <p className="text-sm text-muted-foreground pl-7">{group.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-2xl">
          <div className="absolute inset-0">
            <img src="https://svetisavaoplenac.ca/wp-content/uploads/2024/10/IMG_3983-scaled-600x400.jpg" alt="Serbian Folklore Dancers" className="w-full h-full object-cover opacity-20" />
          </div>
          <div className="relative z-10 p-8 md:p-12 text-center">
            <Users className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">{t("join.ready.title")}</h3>
            <p className="text-lg mb-6 opacity-95 max-w-2xl mx-auto">{t("join.ready.subtitle")}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="mailto:saintsavaoplenac@gmail.com" className="px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105 shadow-lg inline-flex items-center gap-2">
                <Mail className="w-5 h-5" />
                {t("join.contact")}
              </a>
              <a href="#videos" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/50 rounded-lg font-semibold hover:bg-white/20 transition-all hover:scale-105">
                {t("join.watch")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;

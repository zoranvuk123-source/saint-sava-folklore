import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import LanguageToggle from "@/components/LanguageToggle";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";

const Calendar = () => {
  const { t } = useLanguage();

  const practiceSchedule = [
    {
      group: t("join.group3"),
      time: t("join.group3.time"),
      ages: t("join.ages.3to7"),
      note: t("join.group3.note")
    },
    {
      group: t("join.group2"),
      time: t("join.group2.time"),
      ages: t("join.ages.8to12"),
      note: t("join.group2.note")
    },
    {
      group: t("join.group1"),
      time: t("join.group1.time"),
      ages: t("join.ages.13plus"),
      note: t("join.group1.note")
    },
    {
      group: t("join.recreational"),
      time: t("join.recreational.time"),
      ages: t("join.ages.all"),
      note: t("join.recreational.note")
    }
  ];

  const upcomingEvents = [
    {
      name: "Carassauga Festival",
      date: t("calendar.carassauga.date"),
      location: t("calendar.carassauga.location"),
      description: t("calendar.carassauga.description")
    },
    {
      name: t("calendar.folkorama.name"),
      date: t("calendar.folkorama.date"),
      location: t("calendar.folkorama.location"),
      description: t("calendar.folkorama.description")
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <LanguageToggle />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          {t("nav.calendar")}
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12">
          {t("calendar.subtitle")}
        </p>

        {/* Practice Schedule */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">{t("calendar.practice.title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practiceSchedule.map((practice, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{practice.group}</span>
                    <span className="text-sm font-normal text-muted-foreground">{practice.ages}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-semibold">{practice.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{practice.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="mt-6 border-0 shadow-card bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">{t("join.location.church")}</p>
                  <p className="text-sm text-muted-foreground">{t("join.location.description")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Upcoming Events */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <CalendarIcon className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">{t("calendar.events.title")}</h2>
          </div>
          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl">{event.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    <span className="font-semibold">{event.date}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="mt-6 border-0 shadow-card">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t("calendar.more")}
              </p>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default Calendar;

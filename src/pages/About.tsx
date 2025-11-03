import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Music, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

const About = () => {
  const { t } = useLanguage();
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      video.play().catch(() => {
        // Video autoplay failed, that's ok
      });
    }
  }, []);

  const teamMembers = [
    { role: t("about.president"), name: "TBA" },
    { role: t("about.vicePresident"), name: "TBA" },
    { role: t("about.treasurer"), name: "TBA" },
    { role: t("about.secretary"), name: "TBA" },
  ];

  const choreographers = [
    { 
      name: "TBA", 
      background: t("about.choreographer.tba"),
      groups: t("about.choreographer.groups")
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Immersive Video Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          id="hero-video"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(100%)" }}
          onLoadedData={() => setVideoLoaded(true)}
          poster="/hero-fallback.png"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Fallback Image */}
        {!videoLoaded && (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: "url('/hero-fallback.png')",
              filter: "grayscale(100%)"
            }}
          />
        )}

        {/* Dark Overlay (40-50% opacity) */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Centered Text Content */}
        <div className="relative z-10 text-center px-4 animate-fade-in" style={{ animationDuration: "2s" }}>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white font-serif">
            Свети Сава Опленац
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl text-white/95 font-serif tracking-wide">
            Храм – Наслеђе – Вера – Уметност
          </p>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Mission Statement */}
        <Card className="mb-12 border-0 shadow-card">
          <CardContent className="p-8">
            <p className="text-lg leading-relaxed text-center">
              {t("about.mission")}
            </p>
          </CardContent>
        </Card>

        {/* Current Team */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">{t("about.team.title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-all">
                <CardHeader>
                  <CardTitle className="text-lg">{member.role}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            {t("about.volunteers")}
          </p>
        </section>

        {/* Choreographers */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Music className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">{t("about.choreographers.title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {choreographers.map((choreo, index) => (
              <Card key={index} className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle>{choreo.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">{choreo.background}</p>
                  <p className="text-sm text-muted-foreground">{choreo.groups}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Practice Schedule */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">{t("about.practice.title")}</h2>
          </div>
          <Card className="border-0 shadow-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("join.location.church")}</h3>
                  <p className="text-muted-foreground mb-4">{t("join.location.description")}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">{t("join.group3")} ({t("join.ages.3to7")})</h4>
                    <p className="text-sm text-muted-foreground">{t("join.group3.time")}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">{t("join.group2")} ({t("join.ages.8to12")})</h4>
                    <p className="text-sm text-muted-foreground">{t("join.group2.time")}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">{t("join.group1")} ({t("join.ages.13plus")})</h4>
                    <p className="text-sm text-muted-foreground">{t("join.group1.time")}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">{t("join.recreational")} ({t("join.ages.all")})</h4>
                    <p className="text-sm text-muted-foreground">{t("join.recreational.time")}</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="font-semibold text-center">{t("about.signup")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default About;

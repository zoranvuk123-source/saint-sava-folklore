import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Music, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import vanjaImg from "@/assets/team/vanja.jpg";
import julieImg from "@/assets/team/julie.jpg";
import marijaImg from "@/assets/team/marija.jpg";
import angelinaLaraImg from "@/assets/team/angelina-lara-combined.jpg";
import boardGroupImg from "@/assets/team/board-group-2025.jpg";

import ivanStanisicImg from "@/assets/team/ivan-stanisic.jpg";
import angelikaJanicImg from "@/assets/team/angelika-janic-jakopovic.jpg";
import teodoraVojovicImg from "@/assets/team/teodora-vojovic.jpg";
import acoDosenImg from "@/assets/team/aco-dosen.jpg";

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
    { role: t("about.president"), name: "Vanja Luboje", image: vanjaImg },
    { role: t("about.vicePresident"), name: "Julie Vukasovic", image: julieImg },
    { role: t("about.treasurer"), name: "Marija Banakos", image: marijaImg },
    { role: t("about.secretary"), name: "Angelina Racic I Lara Marinkovic", image: angelinaLaraImg },
    { role: t("about.recruitmentCoordinator"), name: "Aco Dosen", image: acoDosenImg },
  ];

  const choreographers = [
    { 
      name: "Ivan Stanisic", 
      background: t("about.choreographer.ivan"),
      groups: t("join.group1"),
      image: ivanStanisicImg
    },
    { 
      name: "Teodora Vojovic", 
      background: t("about.choreographer.teodora"),
      groups: t("join.group3"),
      image: teodoraVojovicImg
    },
    { 
      name: "Angelika Janic Jakopovic", 
      background: t("about.choreographer.angelika"),
      groups: t("join.group2"),
      image: angelikaJanicImg
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
        
        {/* Church Affiliation Introduction */}
        <Card className="mb-8 border-0 shadow-card bg-primary/5">
          <CardContent className="p-8">
            <p className="text-lg leading-relaxed text-center">
              {t("about.church.intro")}
            </p>
          </CardContent>
        </Card>

        {/* Mission Statement */}
        <Card className="mb-12 border-0 shadow-card">
          <CardContent className="p-8">
            <p className="text-lg leading-relaxed text-center">
              {t("about.mission")}
            </p>
          </CardContent>
        </Card>

        {/* Current Team */}
        <section className="mb-12 p-8 bg-muted/30 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">{t("about.team.title")}</h2>
          </div>
          
          {/* Group Photo */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-3xl rounded-xl overflow-hidden shadow-elegant">
              <img 
                src={boardGroupImg} 
                alt="Sveti Sava Folklorna Grupa Board 2025" 
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center gap-6">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className={`rounded-lg object-cover flex-shrink-0 transition-transform hover:scale-105 ${
                        member.name.includes('I') ? 'w-48 h-32' : 'w-32 h-32 rounded-full'
                      }`}
                      style={{ 
                        imageRendering: 'auto',
                        filter: 'contrast(1.02) brightness(1.01)',
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                        objectPosition: member.name.includes('Marija') ? 'top' : 'center'
                      }}
                      loading="eager"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold mb-2">{member.role}</h3>
                      <p className="text-muted-foreground text-base">{member.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            {t("about.volunteers")}
          </p>
        </section>

        {/* Choreographers */}
        <section className="mb-12 p-8 bg-muted/30 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Music className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">{t("about.choreographers.title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {choreographers.map((choreo, index) => (
              <Card key={index} className="border-0 shadow-card">
                <CardContent className="p-6">
                  {choreo.image && (
                    <div className="flex justify-center mb-4">
                      <div className="w-40 h-40 rounded-full bg-white p-2 flex items-center justify-center border-2 border-primary/30">
                        <img 
                          src={choreo.image} 
                          alt={choreo.name} 
                          className="w-full h-full object-cover rounded-full"
                          style={{ imageRendering: 'auto' }}
                        />
                      </div>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-3 text-center">{choreo.name}</h3>
                  <p className="text-sm mb-2">{choreo.background}</p>
                  <p className="text-sm text-muted-foreground">{choreo.groups}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Practice Schedule */}
        <section className="p-8 bg-muted/30 rounded-xl">
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

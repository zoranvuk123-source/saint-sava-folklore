import { useState } from "react";
import Header from "@/components/Header";
import LanguageToggle from "@/components/LanguageToggle";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Heart } from "lucide-react";

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState("all");

  const years = ["2024", "2023", "2022", "2021", "2020"];

  // Placeholder structure - will be populated with actual photos
  const galleryItems = {
    "2024": [],
    "2023": [],
    "2022": [],
    "2021": [],
    "2020": [],
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <LanguageToggle />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t("photos.title")} <span className="text-primary">{t("photos.gallery")}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t("photos.subtitle")}
            </p>
          </div>

          {/* Tabs for Videos and Photos */}
          <Tabs defaultValue="photos" className="mb-12">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="photos">{t("photos.title")}</TabsTrigger>
              <TabsTrigger value="videos">{t("videos.title")}</TabsTrigger>
            </TabsList>

            {/* Photos Section */}
            <TabsContent value="photos" className="space-y-8">
              {/* Year Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <button
                  onClick={() => setSelectedYear("all")}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedYear === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {t("photos.all")}
                </button>
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all ${
                      selectedYear === year
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>

              {/* Photo Grid - Placeholder */}
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Photo gallery will be populated with images organized by year
                </p>
              </div>
            </TabsContent>

            {/* Videos Section */}
            <TabsContent value="videos" className="space-y-8">
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Video gallery will be populated with performance videos
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Invite Section */}
          <Card className="p-8 md:p-12 bg-gradient-to-r from-primary/10 to-secondary/10 border-0">
            <div className="text-center max-w-3xl mx-auto">
              <Heart className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-4">
                Share Your Memories
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We invite all former and current members to contribute their photos and videos to our ongoing memorial collection. Help us preserve the rich history of Sv. Sava Oplenac through the years!
              </p>
              <a 
                href="mailto:saintsavaoplenac@gmail.com?subject=Gallery Photo Submission"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
              >
                <Mail className="w-5 h-5" />
                Submit Your Photos
              </a>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Gallery;

import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import LanguageToggle from "@/components/LanguageToggle";
import Header from "@/components/Header";
import JoinUs from "@/components/JoinUs";

const Join = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <LanguageToggle />
      <div className="pt-8">
        <JoinUs />
      </div>
      <Footer />
    </main>
  );
};

export default Join;

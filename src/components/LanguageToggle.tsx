import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setLanguage(language === "sr" ? "en" : "sr")}
        className="bg-background/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
      >
        <Languages className="w-4 h-4 mr-2" />
        <span className="font-semibold">{language === "sr" ? "EN" : "СР"}</span>
      </Button>
    </div>
  );
};

export default LanguageToggle;

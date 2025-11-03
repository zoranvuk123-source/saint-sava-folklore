import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const getLanguageLabel = () => {
    switch (language) {
      case "sr-latin":
        return "SR";
      case "sr-cyrillic":
        return "СР";
      case "en":
        return "EN";
      default:
        return "SR";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-background/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
          >
            <Languages className="w-4 h-4 mr-2" />
            <span className="font-semibold">{getLanguageLabel()}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm">
          <DropdownMenuItem 
            onClick={() => setLanguage("sr-latin")}
            className="cursor-pointer"
          >
            <span className="font-semibold">SR (Latin)</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setLanguage("en")}
            className="cursor-pointer"
          >
            <span className="font-semibold">EN (English)</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setLanguage("sr-cyrillic")}
            className="cursor-pointer"
          >
            <span className="font-semibold">СР (Ћирилица)</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageToggle;
